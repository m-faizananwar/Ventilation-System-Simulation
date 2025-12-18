#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// --- 1. CONFIGURATION ---
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// MQTT Broker (The "Bridge" to your 3D Simulation)
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;

// MQTT Topics
const char* TOPIC_MONITOR = "smart-corridor/monitor";       // We publish status here
const char* TOPIC_SENSORS = "smart-corridor/sensors";       // We receive from simulation
const char* TOPIC_COMMANDS = "smart-corridor/commands";     // We publish commands here

WiFiClient espClient;
PubSubClient client(espClient);

// --- 2. PIN DEFINITIONS ---
#define PIN_PM25   0   // Analog Potentiometer (Left)
#define PIN_CO2    1   // Analog Potentiometer (Right)
#define PIN_SMOKE  3   // Slide Switch (Digital)

#define LED_RED    8   // Alert LED
#define LED_BLUE   9   // Fan LED (and Servo Motor)
#define LED_GREEN  10  // Safe LED

// --- 3. THRESHOLDS ---
const int THRESH_SMOKE = 30;    // Smoke level %
const int THRESH_PM25 = 80;     // PM2.5 limit (µg/m³)
const int THRESH_CO2 = 800;     // CO2 limit (ppm)
const int THRESH_TEMP = 35;     // Temperature limit (°C)

// --- 4. STATE VARIABLES ---
// Data from 3D Simulation
int sim_smoke = 0;
int sim_co2 = 400;
int sim_pm25 = 15;
int sim_temp = 22;
bool sim_data_received = false;
unsigned long last_sim_data = 0;

// Combined state
bool ventilation_active = false;
String current_status = "SAFE";

// --- MQTT Callback for receiving sensor data from 3D simulation ---
void mqttCallback(char* topic, byte* payload, unsigned int length) {
    Serial.print("📨 Received on ");
    Serial.print(topic);
    Serial.print(": ");
    
    // Convert payload to string
    char message[length + 1];
    memcpy(message, payload, length);
    message[length] = '\0';
    Serial.println(message);
    
    // Parse JSON from 3D simulation
    if (strcmp(topic, TOPIC_SENSORS) == 0) {
        StaticJsonDocument<256> doc;
        DeserializationError error = deserializeJson(doc, message);
        
        if (!error) {
            sim_smoke = doc["smoke"] | 0;
            sim_co2 = doc["co2"] | 400;
            sim_pm25 = doc["pm25"] | 15;
            sim_temp = doc["temp"] | 22;
            sim_data_received = true;
            last_sim_data = millis();
            
            Serial.println("✅ Parsed simulation data:");
            Serial.print("  Smoke: "); Serial.println(sim_smoke);
            Serial.print("  CO2: "); Serial.println(sim_co2);
            Serial.print("  PM2.5: "); Serial.println(sim_pm25);
            Serial.print("  Temp: "); Serial.println(sim_temp);
        } else {
            Serial.print("❌ JSON parse error: ");
            Serial.println(error.c_str());
        }
    }
}

void setup() {
    Serial.begin(115200);
    Serial.println("\n🚀 Smart Corridor RISC-V Controller Starting...");

    // Configure Pins
    pinMode(PIN_SMOKE, INPUT);
    pinMode(LED_GREEN, OUTPUT);
    pinMode(LED_RED, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);
    
    // Initial state - all off
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_BLUE, LOW);

    // Connect to WiFi
    Serial.print("📶 Connecting to WiFi");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
        digitalWrite(LED_RED, !digitalRead(LED_RED)); // Blink red while connecting
    }
    Serial.println(" Connected!");
    digitalWrite(LED_RED, LOW);

    // Setup MQTT with callback
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(mqttCallback);
    client.setBufferSize(512);
}

void reconnect() {
    while (!client.connected()) {
        Serial.print("🔗 Attempting MQTT connection...");
        String clientId = "RISCV-Controller-";
        clientId += String(random(0xffff), HEX);
        
        if (client.connect(clientId.c_str())) {
            Serial.println("connected!");
            
            // Subscribe to sensor data from 3D simulation
            client.subscribe(TOPIC_SENSORS);
            Serial.print("📡 Subscribed to: ");
            Serial.println(TOPIC_SENSORS);
            
            // Show green LED briefly on connect
            digitalWrite(LED_GREEN, HIGH);
            delay(200);
            digitalWrite(LED_GREEN, LOW);
        } else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" retry in 3s");
            digitalWrite(LED_RED, HIGH);
            delay(3000);
            digitalWrite(LED_RED, LOW);
        }
    }
}

void publishCommand(const char* action, const char* room, const char* level, bool alarm) {
    StaticJsonDocument<256> doc;
    doc["action"] = action;
    doc["room"] = room;
    doc["level"] = level;
    doc["alarm"] = alarm;
    doc["timestamp"] = millis();
    
    char buffer[256];
    serializeJson(doc, buffer);
    
    client.publish(TOPIC_COMMANDS, buffer);
    Serial.print("📤 Command sent: ");
    Serial.println(buffer);
}

void loop() {
    if (!client.connected()) {
        reconnect();
    }
    client.loop();

    // --- READ LOCAL SENSORS (Physical potentiometers on Wokwi) ---
    int raw_pm25 = analogRead(PIN_PM25);
    int local_pm25 = map(raw_pm25, 0, 4095, 0, 200);
    
    int raw_co2 = analogRead(PIN_CO2);
    int local_co2 = map(raw_co2, 0, 4095, 400, 2000);
    
    int local_smoke = digitalRead(PIN_SMOKE);

    // --- COMBINE DATA: Use MAX of local and simulation values ---
    int effective_smoke = max(local_smoke * 100, sim_smoke);  // Local smoke is 0 or 100
    int effective_co2 = max(local_co2, sim_co2);
    int effective_pm25 = max(local_pm25, sim_pm25);
    int effective_temp = sim_temp;  // Only from simulation

    // --- RISC-V STYLE DECISION LOGIC ---
    bool need_ventilation = false;
    String status_msg = "SAFE";
    String alert_level = "normal";

    // Priority 1: Smoke Detection (CRITICAL)
    if (effective_smoke > THRESH_SMOKE) {
        need_ventilation = true;
        status_msg = "CRITICAL: SMOKE DETECTED";
        alert_level = "critical";
    }
    // Priority 2: High Temperature (DANGER)
    else if (effective_temp > THRESH_TEMP) {
        need_ventilation = true;
        status_msg = "DANGER: HIGH TEMPERATURE";
        alert_level = "danger";
    }
    // Priority 3: High PM2.5 (WARNING)
    else if (effective_pm25 > THRESH_PM25) {
        need_ventilation = true;
        status_msg = "WARNING: HIGH PM2.5";
        alert_level = "warning";
    }
    // Priority 4: High CO2 (WARNING)
    else if (effective_co2 > THRESH_CO2) {
        need_ventilation = true;
        status_msg = "WARNING: HIGH CO2";
        alert_level = "warning";
    }

    // --- ACTUATE LOCAL HARDWARE ---
    if (need_ventilation) {
        digitalWrite(LED_GREEN, LOW);
        digitalWrite(LED_RED, HIGH);
        digitalWrite(LED_BLUE, HIGH);  // Fan ON
    } else {
        digitalWrite(LED_GREEN, HIGH);
        digitalWrite(LED_RED, LOW);
        digitalWrite(LED_BLUE, LOW);   // Fan OFF
    }

    // --- SEND COMMANDS TO 3D SIMULATION ---
    // Only send if state changed
    static bool prev_ventilation = false;
    static String prev_status = "";
    
    if (need_ventilation != prev_ventilation || status_msg != prev_status) {
        if (need_ventilation) {
            // Activate ventilation in kitchen (most common source)
            publishCommand("ACTIVATE_VENT", "kitchen", "HIGH", true);
            publishCommand("SET_ALERT", "kitchen", alert_level.c_str(), true);
            
            // If critical, activate all rooms
            if (alert_level == "critical") {
                publishCommand("GLOBAL_ALARM", "", "critical", true);
            }
        } else {
            publishCommand("DEACTIVATE_VENT", "kitchen", "OFF", false);
            publishCommand("SET_ALERT", "kitchen", "normal", false);
        }
        
        prev_ventilation = need_ventilation;
        prev_status = status_msg;
    }

    // --- PUBLISH STATUS TO MONITOR TOPIC ---
    String jsonPayload = "{\"pm25\": " + String(effective_pm25) + 
                         ", \"co2\": " + String(effective_co2) + 
                         ", \"smoke\": " + String(effective_smoke) +
                         ", \"temp\": " + String(effective_temp) +
                         ", \"ventilation\": " + String(need_ventilation ? "true" : "false") +
                         ", \"status\": \"" + status_msg + 
                         "\", \"source\": \"" + (sim_data_received ? "combined" : "local") + "\"}";
    
    client.publish(TOPIC_MONITOR, jsonPayload.c_str());
    
    // Debug Print
    Serial.println(jsonPayload);

    delay(1000);
}