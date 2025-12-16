.text
# -----------------------------------------------------------------------
# SMART CORRIDOR SYSTEM - ADDRESS FIX
# -----------------------------------------------------------------------

# --- UPDATED MEMORY MAP (Based on your latest IO Header) ---
.equ SW0_BASE,      0xf0000000   # Switches 0 (Smoke & PM2.5)
.equ SW1_BASE,      0xf0000004   # Switches 1 (CO2)
.equ LED_BASE,      0xf0000008   # LED Matrix Base Address

# --- PIXEL COUNT FIX ---
# Your new matrix is 35x25 (Width 0x23, Height 0x19)
# 35 * 25 = 875 pixels.
.equ PIXEL_COUNT,   875          

# --- COLORS ---
.equ GREEN,         0x0000FF00   # Safe
.equ RED,           0x00FF0000   # Danger
.equ BLUE,          0x000000FF   # Fan Active

# --- THRESHOLDS ---
.equ THRESH_PM25,   100          # PM2.5 Limit
.equ THRESH_CO2,    100          # CO2 Limit

_start:
    li sp, 0x7FFFFFFF            # Init Stack

main_loop:
    # -------------------------------------------------------
    # 1. READ SENSORS
    # -------------------------------------------------------
    # Load Bank 0 (Smoke + PM2.5) from 0xf0000000
    li t0, SW0_BASE
    lw s0, 0(t0)                 
    
    # Load Bank 1 (CO2) from 0xf0000004
    li t0, SW1_BASE
    lw s1, 0(t0)                 

    # -------------------------------------------------------
    # 2. CHECK SMOKE (Bank 0, Switch 0)
    # -------------------------------------------------------
    li t1, 1
    and a0, s0, t1               # Isolate Bit 0
    bnez a0, unsafe_mode         # If 1, ALARM!

    # -------------------------------------------------------
    # 3. CHECK PM2.5 (Bank 0, Switches 1-7)
    # -------------------------------------------------------
    srli a1, s0, 1               # Shift right to ignore Smoke bit
    li t1, 0x7F                  # Mask to keep 7 bits
    and a1, a1, t1               
    li t2, THRESH_PM25
    bgt a1, t2, unsafe_mode      # If > 100, ALARM!

    # -------------------------------------------------------
    # 4. CHECK CO2 (Bank 1, All Switches)
    # -------------------------------------------------------
    li t1, 0xFF                  # Mask to keep 8 bits
    and a2, s1, t1
    li t2, THRESH_CO2
    bgt a2, t2, unsafe_mode      # If > 100, ALARM!

    # -------------------------------------------------------
    # 5. SAFE MODE
    # -------------------------------------------------------
    jal ra, draw_green
    j main_loop

unsafe_mode:
    # 6. ALARM MODE
    jal ra, draw_alarm
    j main_loop

# --- DRAWING FUNCTIONS ---
draw_green:
    li t0, LED_BASE
    li t1, GREEN
    li t2, PIXEL_COUNT           # Loop 875 times
g_loop:
    sw t1, 0(t0)
    addi t0, t0, 4
    addi t2, t2, -1
    bnez t2, g_loop
    ret

draw_alarm:
    li t0, LED_BASE
    li t1, RED
    li t2, PIXEL_COUNT           # Loop 875 times
r_loop:
    sw t1, 0(t0)
    addi t0, t0, 4
    addi t2, t2, -1
    bnez t2, r_loop
    
    # Draw Blue Fan (Adjusted for new width of 35 pixels)
    li t0, LED_BASE
    li t1, BLUE
    sw t1, 0(t0)                 # Pixel (0,0)
    sw t1, 4(t0)                 # Pixel (0,1)
    # Row 2 is 35 pixels away (35 * 4 bytes = 140 bytes)
    sw t1, 140(t0)               # Pixel (1,0)
    sw t1, 144(t0)               # Pixel (1,1)
    ret