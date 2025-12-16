#include <WiFi.h>
#include <PubSubClient.h>

// --- 1. CONFIGURATION ---
const char* ssid = "Wokwi-GUEST";
const char* password = "";

// MQTT Broker (The "Bridge" to your 3D Simulation)
const char* mqtt_server = "broker.hivemq.com";
const char* mqtt_topic = "smart-corridor/monitor";

WiFiClient espClient;
PubSubClient client(espClient);

// --- 2. PIN DEFINITIONS (Must match diagram.json) ---
#define PIN_PM25   0   // Analog Potentiometer (Left)
#define PIN_CO2    1   // Analog Potentiometer (Right)
#define PIN_SMOKE  3   // Slide Switch (Digital)

#define LED_RED    8   // Alert LED
#define LED_BLUE   9   // Fan LED (and Servo Motor)
#define LED_GREEN  10  // Safe LED

// --- 3. THRESHOLDS ---
const int THRESH_PM25 = 100;   // Dust limit
const int THRESH_CO2 = 1000;   // CO2 limit (ppm)

void setup() {
  Serial.begin(115200);

  // Configure Pins
  pinMode(PIN_SMOKE, INPUT); // Digital Input
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_RED, OUTPUT);
  pinMode(LED_BLUE, OUTPUT);

  // Connect to WiFi
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" Connected!");

  // Setup MQTT
  client.setServer(mqtt_server, 1883);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "RISCV-Client-";
    clientId += String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  // --- 4. READ SENSORS ---
  
  // 1. PM2.5 (Pin 0): Map 0-4095 (Raw) to 0-200 (ug/m3)
  int raw_pm25 = analogRead(PIN_PM25);
  int val_pm25 = map(raw_pm25, 0, 4095, 0, 200);

  // 2. CO2 (Pin 1): Map 0-4095 (Raw) to 400-2000 (ppm)
  int raw_co2 = analogRead(PIN_CO2);
  int val_co2 = map(raw_co2, 0, 4095, 400, 2000);

  // 3. SMOKE (Pin 3): Digital Read (0 or 1)
  int val_smoke = digitalRead(PIN_SMOKE);

  // --- 5. LOGIC & CONTROL ---
  bool unsafe = false;
  String status_msg = "SAFE";

  // Check Smoke First (Highest Priority)
  if (val_smoke == HIGH) {
    unsafe = true;
    status_msg = "CRITICAL: SMOKE DETECTED";
  } 
  // Check Dust
  else if (val_pm25 > THRESH_PM25) {
    unsafe = true;
    status_msg = "WARNING: HIGH DUST";
  } 
  // Check CO2
  else if (val_co2 > THRESH_CO2) {
    unsafe = true;
    status_msg = "WARNING: HIGH CO2";
  }

  // --- 6. ACTUATE HARDWARE ---
  if (unsafe) {
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_RED, HIGH);  // Red Light ON
    digitalWrite(LED_BLUE, HIGH); // Fan/Servo ON
  } else {
    digitalWrite(LED_GREEN, HIGH); // Green Light ON
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_BLUE, LOW);
  }

  // --- 7. SEND DATA TO 3D TWIN ---
  // Create JSON: {"pm25": 120, "co2": 800, "smoke": 1, "status": "CRITICAL..."}
  String jsonPayload = "{\"pm25\": " + String(val_pm25) + 
                       ", \"co2\": " + String(val_co2) + 
                       ", \"smoke\": " + String(val_smoke) + 
                       ", \"status\": \"" + status_msg + "\"}";
  
  // Publish to Internet
  client.publish(mqtt_topic, jsonPayload.c_str());
  
  // Debug Print
  Serial.println(jsonPayload);

  delay(1000); // Update every second
}