This is a **Technical Design Document** specifically structured for a **React Three Fiber (R3F)** developer.

This document organizes the house spatially, defining where "joints" (structural connections), entrances, and appliances go relative to the world origin (0,0,0).

---

# 🏗️ Project: "The Open World Villa" – Design Specification

**Engine:** React Three Fiber / Three.js
**Scale:** 1 Unit = 1 Meter
**World Origin (0,0,0):** The center of the Ground Floor Foyer.

---

## 1. 🌍 The Plot & Exterior (Outer Shell)

**Plot Size:** 40m \times 40m
**Joint Connections:** The boundary walls connect to the main terrain mesh.

* **Main Gate (The Entry Point):**
* **Position:** Front Center (z = +15m relative to house).
* **Mechanism:** Sliding automated gate.
* **Joint:** Rails embedded in the driveway mesh.


* **Driveway:**
* **Texture:** Pavers/Concrete.
* **Path:** Curves from the Main Gate to the Garage Ramp (Side Left).


* **Front Lawn:**
* **Position:** Right of the driveway.
* **Assets:** Procedural grass, 2 large Oak trees (corners), path lights (every 2m).


* **Backyard (Rear):**
* **Access:** Through Living Room sliding glass doors (z = -10m).
* **Zone A (Patio):** Concrete slab. Contains BBQ Grill (corner) and 4-chair outdoor set.
* **Zone B (Garden):** Shed (Far left corner).



---

## 2. 🏠 Ground Floor (Social & Utility)

**Floor Level:** y = 0
**Ceiling Height:** 3.5m

### A. Entrance / Foyer (The Spawn Point)

* **Main Door:** Double wooden door at (0,0,5). Opens inward.
* **Furniture Layout:**
* **Right Wall:** Shoe Rack (Low poly wood) + Coat Hanger above it.
* **Left Wall:** Large ornate mirror + Console table (Key bowl, vase).
* **Floor:** Welcome mat directly inside the threshold.



### B. Living Room (Central Hub)

* **Position:** Center of the house (Open plan connected to Foyer).
* **Architecture:** Large sliding glass doors on the North wall (facing backyard).
* **Furniture Layout:**
* **Center:** Large rug.
* **Seating:** L-Shaped Sofa facing the East Wall. 2 Single Armchairs facing the sofa.
* **Centerpiece:** Coffee table (glass top) with magazines/remotes.
* **East Wall (Entertainment):**
* Wall-mounted Smart TV (1.5m height).
* TV Console below (holds Game Console, Sound System).
* Bookshelves flanking the TV.





### C. Dining Area

* **Position:** West of Living Room (Open plan).
* **Furniture:**
* Dining Table (Center of zone).
* 8 Chairs (tucked in).
* **Lighting:** Chandelier hanging directly above table center (y = 2.5m).
* **Storage:** Crockery Cabinet against the West wall.



### D. Kitchen (The "Work Triangle")

* **Position:** Adjacent to Dining (North-West Corner).
* **Layout (U-Shape):**
* **North Wall (Window view):** Sink with mixer tap. Dish rack to the right.
* **West Wall (Cooking):** Gas Stove + Oven unit. Chimney/Hood mounted on wall above.
* **South Wall (Storage/Cooling):** Refrigerator (tall, double door). Pantry unit (tall).
* **Countertop:** Microwave, Toaster, and Coffee Machine clustered in the corner.
* **Center:** Kitchen Island (optional) or open floor space for movement.



### E. Guest Bedroom

* **Position:** East Wing (Front facing).
* **Layout:**
* **Bed:** Queen bed against East wall. Two side tables with lamps.
* **Storage:** Wardrobe built into the South wall.
* **Work:** Study desk + Chair facing the front window.



### F. Guest Bathroom

* **Position:** Accessible from Hallway (near Guest Bed).
* **Fittings:**
* Toilet (South wall).
* Vanity/Sink (East wall).
* Shower Cubicle (Glass enclosure, corner).



---

## 3. 🪜 First Floor (Private Quarters)

**Floor Level:** y = 3.8m (Account for slab thickness)
**Access:** Stairs (Spiral or U-turn) located in the Foyer area.

### A. Master Bedroom (Luxury)

* **Position:** Directly above Living Room (Backyard view).
* **Architecture:** Balcony connected via sliding doors.
* **Layout:**
* **Bed:** King-size, centered on East wall.
* **Entertainment:** TV mounted on West wall (opposite bed).
* **Lounge:** Small sofa/reading chair near the balcony door.
* **Walk-in Closet:** Small sub-room connecting Bedroom to Bathroom.



### B. Master Bathroom (Spa Style)

* **Position:** Connected to Master Closet.
* **Fittings:**
* **Center:** Freestanding Bathtub.
* **Left:** Double Vanity (Two sinks, large LED mirror).
* **Right:** Walk-in Shower (Rainfall head) + Toilet (partitioned).



### C. Children’s Bedroom

* **Position:** Front facing (Above Guest Room).
* **Layout:**
* **Sleeping:** Bunk Bed (or Twin beds) against side wall.
* **Study:** Long desk with shelves above for books.
* **Decor:** Posters on walls, toy chest at foot of bed.



### D. Home Office / Study

* **Position:** Small room near the landing.
* **Layout:**
* **Desk:** L-shaped desk facing the door.
* **Tech:** PC Monitor, Keyboard, Mouse, Printer on side table.
* **Storage:** Tall Filing cabinet and Bookshelf covering one entire wall.



---

## 4. 🧺 Basement (Utility & Storage)

**Floor Level:** y = -3.5m
**Access:** Staircase downward from Kitchen/Hallway.

### A. Garage (Internal View)

* **Joint:** Ramp connects to exterior driveway.
* **Contents:**
* Space for 2 cars.
* Wall Rack: Bicycle hanging, garden tools.
* Corner: Car Charger unit.



### B. Laundry Room

* **Layout:**
* Washing Machine and Dryer (side-by-side).
* Ironing board (folded against wall).
* Utility Sink (deep basin).
* Shelves: Detergents and baskets.



---

## 5. 🔌 Systems & Logic (R3F Implementation)

To make this a "simulation" and not just a model, structure your code components like this:

**1. The `HouseShell` Component:**

* Contains the geometry for Walls, Floors, Ceilings, and Roof.
* **Material:** Concrete/Plaster textures.
* **Physics:** RigidBody (Fixed) so the player doesn't fall through.

**2. The `Interactables` System:**

* **Doors:** Use a hinge constraint.
* *Logic:* `onClick={() => setOpen(!isOpen)}`


* **Lights:**
* Place `pointLight` or `spotLight` inside every lamp mesh.
* *Logic:* Bind intensity to a global `isNight` state or local switch.



**3. Asset Instancing (Optimization):**

* Do not create 50 separate meshes for sockets.
* Create **one** `Socket` mesh and use `<InstancedMesh>` to place them at the defined (x,y,z) coordinates in every room.

---

## 6. Next Step for You

Would you like me to generate the **JSON Data Structure** for this house?
*(I can create a JSON file that lists every object with its `{ x, y, z }` coordinates and rotation, which you can load directly into React Three Fiber to spawn the house automatically.)*