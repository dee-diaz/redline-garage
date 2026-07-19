require("dotenv").config();
const pool = require("./pool");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function daysAgo(n) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

const categories = [
  { name: "Engine Parts", description: "Engine and related components" },
  { name: "Suspension & Brakes", description: "Suspension and brake system" },
  { name: "Body Kits & Aero", description: "Body kits and aerodynamics" },
  { name: "Wheels & Tires", description: "Wheels and tires" },
  { name: "Interior & Audio", description: "Interior and audio system" },
  { name: "Exhaust Systems", description: "Exhaust systems and components" },
  { name: "Intake & Forced Induction", description: "Intake systems, turbochargers, and forced induction components" },
  { name: "Drivetrain & Transmission", description: "Transmission, clutch, and drivetrain components" },
  { name: "Electrical & Lighting", description: "Electrical components, gauges, and lighting" },
  { name: "Fuel System & Cooling", description: "Fuel delivery and cooling system components" },
];

const brands = [
  { name: "Nissan", country: "Japan" },
  { name: "Toyota", country: "Japan" },
  { name: "Mishimoto", country: "USA" },
  { name: "RAYS", country: "Japan" },
  { name: "Bride", country: "Japan" },
  { name: "HKS", country: "Japan" },
  { name: "Nismo", country: "Japan" },
  { name: "Greddy", country: "Japan" },
  { name: "Tomei", country: "Japan" },
  { name: "BC Racing", country: "Taiwan" },
  { name: "Recaro", country: "Germany" },
  { name: "Enkei", country: "Japan" },
  { name: "Cusco", country: "Japan" },
  { name: "Blitz", country: "Japan" },
  { name: "Apexi", country: "Japan" },
  { name: "Voltex", country: "Japan" },
  { name: "Varis", country: "Japan" },
  { name: "Tein", country: "Japan" },
  { name: "Endless", country: "Japan" },
  { name: "Defi", country: "Japan" },
  { name: "Sparco", country: "Italy" },
  { name: "Whiteline", country: "Australia" },
  { name: "K&N", country: "USA" },
  { name: "Walbro", country: "USA" },
  { name: "AEM", country: "USA" },
];

const items = [
  // Engine Parts
  { name: "RB26DETT Turbocharger", category: "Engine Parts", brand: "Nissan", part_number: "RB26-TURBO-01", price: 2450.0, stock: 5, description: "Original turbocharger from Skyline GT-R", daysAgo: 220 },
  { name: "HKS GT2530 Turbo Kit", category: "Engine Parts", brand: "HKS", part_number: "HKS-GT2530", price: 3200.0, stock: 4, description: "Bolt-on turbo upgrade kit for RB/SR engines", daysAgo: 12 },
  { name: "Tomei Poncam Camshafts", category: "Engine Parts", brand: "Tomei", part_number: "TOMEI-PONCAM", price: 480.0, stock: 10, description: "Performance camshaft set for improved high-rpm power", daysAgo: 45 },
  { name: "Greddy Type-S Blow Off Valve", category: "Engine Parts", brand: "Greddy", part_number: "GREDDY-TS-BOV", price: 210.0, stock: 15, description: "Recirculating blow off valve for turbocharged engines", daysAgo: 3 },
  { name: "Mishimoto Aluminum Radiator", category: "Engine Parts", brand: "Mishimoto", part_number: "MISH-RAD-01", price: 340.0, stock: 8, description: "High-flow aluminum radiator for improved cooling", daysAgo: 60 },
  { name: "Nismo Reinforced Head Gasket", category: "Engine Parts", brand: "Nismo", part_number: "NISMO-HG-RB", price: 150.0, stock: 0, description: "Metal head gasket rated for high boost applications", daysAgo: 150 },
  { name: "Apexi Power FC ECU", category: "Engine Parts", brand: "Apexi", part_number: "APEXI-PFC", price: 890.0, stock: 3, description: "Standalone piggyback ECU with datalogging", daysAgo: 5 },
  { name: "Cusco Oil Cooler Kit", category: "Engine Parts", brand: "Cusco", part_number: "CUSCO-OIL-01", price: 520.0, stock: 6, description: "Front-mount oil cooler kit with braided lines", daysAgo: 90 },
  { name: "Toyota 2JZ-GTE Short Block", category: "Engine Parts", brand: "Toyota", part_number: "2JZ-SB-STOCK", price: 3800.0, stock: 2, description: "OEM short block from Supra RZ", daysAgo: 30 },
  { name: "HKS Camshaft Set 264 Spec", category: "Engine Parts", brand: "HKS", part_number: "HKS-CAM-264", price: 620.0, stock: 6, description: "High-lift performance camshaft set", daysAgo: 55 },
  { name: "Tomei Expreme Head Studs", category: "Engine Parts", brand: "Tomei", part_number: "TOMEI-HEADSTUD", price: 260.0, stock: 14, description: "ARP-grade head stud kit for high boost builds", daysAgo: 88 },
  { name: "Nissan OEM VR38DETT Long Block", category: "Engine Parts", brand: "Nissan", part_number: "VR38-LB-OEM", price: 8200.0, stock: 1, description: "Complete GT-R engine long block assembly", daysAgo: 300 },
  { name: "Apexi AVC-R Boost Controller", category: "Engine Parts", brand: "Apexi", part_number: "APEXI-AVCR", price: 320.0, stock: 9, description: "Electronic boost controller with digital display", daysAgo: 26 },
  { name: "Greddy Oil Catch Can", category: "Engine Parts", brand: "Greddy", part_number: "GREDDY-OCC", price: 140.0, stock: 22, description: "Baffled oil catch can kit", daysAgo: 11 },
  { name: "Cusco Lightweight Flywheel", category: "Engine Parts", brand: "Cusco", part_number: "CUSCO-FLYWHEEL", price: 480.0, stock: 5, description: "Chromoly lightweight flywheel for faster revs", daysAgo: 62 },

  // Suspension & Brakes
  { name: "Tein Coilovers Type Flex Z", category: "Suspension & Brakes", brand: "Tein", part_number: "TEIN-FLEXZ", price: 980.0, stock: 8, description: "Adjustable coilover suspension", daysAgo: 220 },
  { name: "BC Racing BR Series Coilovers", category: "Suspension & Brakes", brand: "BC Racing", part_number: "BC-BR-KIT", price: 750.0, stock: 12, description: "Fully adjustable damping coilover kit", daysAgo: 18 },
  { name: "Cusco Adjustable Rear Sway Bar", category: "Suspension & Brakes", brand: "Cusco", part_number: "CUSCO-SWAY-R", price: 220.0, stock: 9, description: "Rear sway bar with adjustable stiffness settings", daysAgo: 75 },
  { name: "Nismo S-Tune Suspension Kit", category: "Suspension & Brakes", brand: "Nismo", part_number: "NISMO-STUNE", price: 1100.0, stock: 4, description: "Street tuned suspension kit for daily/track use", daysAgo: 40 },
  { name: "HKS Hipermax IV GT Coilovers", category: "Suspension & Brakes", brand: "HKS", part_number: "HKS-HIPERMAX4", price: 1450.0, stock: 0, description: "High performance coilover system with remote reservoir", daysAgo: 130 },
  { name: "Blitz Damper ZZ-R Coilovers", category: "Suspension & Brakes", brand: "Blitz", part_number: "BLITZ-ZZR", price: 1020.0, stock: 7, description: "Dampening coilovers with 16-way adjustability", daysAgo: 2 },
  { name: "Cusco Strut Tower Bar Front", category: "Suspension & Brakes", brand: "Cusco", part_number: "CUSCO-STB-F", price: 180.0, stock: 14, description: "Front strut tower bar for added chassis rigidity", daysAgo: 100 },
  { name: "Nismo Big Brake Kit", category: "Suspension & Brakes", brand: "Nismo", part_number: "NISMO-BBK", price: 1650.0, stock: 3, description: "6-piston front brake kit with slotted rotors", daysAgo: 8 },
  { name: "Mishimoto Brake Cooling Duct Kit", category: "Suspension & Brakes", brand: "Mishimoto", part_number: "MISH-BRK-DUCT", price: 95.0, stock: 20, description: "Brake cooling ducts for track day reliability", daysAgo: 55 },
  { name: "Endless MX72 Brake Pads Front", category: "Suspension & Brakes", brand: "Endless", part_number: "ENDLESS-MX72-F", price: 180.0, stock: 24, description: "Street/track brake pad compound", daysAgo: 7 },
  { name: "Whiteline Adjustable Front Sway Bar", category: "Suspension & Brakes", brand: "Whiteline", part_number: "WHITELINE-SB-F", price: 240.0, stock: 13, description: "Adjustable front anti-roll bar", daysAgo: 33 },
  { name: "Tein Flex Z Rear Camber Arms", category: "Suspension & Brakes", brand: "Tein", part_number: "TEIN-CAMBER-R", price: 210.0, stock: 17, description: "Adjustable rear camber arm kit", daysAgo: 19 },
  { name: "Endless Stainless Brake Lines", category: "Suspension & Brakes", brand: "Endless", part_number: "ENDLESS-SSLINE", price: 130.0, stock: 20, description: "Braided stainless steel brake line kit", daysAgo: 44 },
  { name: "Whiteline Control Arm Bushing Kit", category: "Suspension & Brakes", brand: "Whiteline", part_number: "WHITELINE-CA-BUSH", price: 95.0, stock: 27, description: "Polyurethane control arm bushing set", daysAgo: 71 },
  { name: "Nismo GT Coilover Sports Kit", category: "Suspension & Brakes", brand: "Nismo", part_number: "NISMO-GT-COIL", price: 1350.0, stock: 2, description: "Track-tuned coilover kit with pillow ball mounts", daysAgo: 3 },

  // Body Kits & Aero
  { name: "Rocket Bunny Widebody Kit", category: "Body Kits & Aero", brand: "Toyota", part_number: "RB-86-WBK", price: 1850.0, stock: 3, description: "Widebody kit for Toyota 86/BRZ", daysAgo: 220 },
  { name: "Voltex Type 7 GT Wing", category: "Body Kits & Aero", brand: "Voltex", part_number: "VOLTEX-T7-WING", price: 980.0, stock: 5, description: "Adjustable carbon GT wing for track aero", daysAgo: 25 },
  { name: "Varis Carbon Front Bumper", category: "Body Kits & Aero", brand: "Varis", part_number: "VARIS-FB-CF", price: 2100.0, stock: 2, description: "Full carbon front bumper with integrated canards", daysAgo: 6 },
  { name: "Nismo Aero Front Lip", category: "Body Kits & Aero", brand: "Nismo", part_number: "NISMO-LIP-01", price: 380.0, stock: 10, description: "Front lip spoiler for improved front-end downforce", daysAgo: 42 },
  { name: "Greddy Rocket Bunny Boss Kit", category: "Body Kits & Aero", brand: "Greddy", part_number: "GREDDY-RB-BOSS", price: 2600.0, stock: 1, description: "Overfender boss kit for widebody conversions", daysAgo: 95 },
  { name: "Blitz Carbon Bonnet", category: "Body Kits & Aero", brand: "Blitz", part_number: "BLITZ-BONNET-CF", price: 890.0, stock: 4, description: "Lightweight carbon fiber bonnet with vents", daysAgo: 70 },
  { name: "Cusco Roll Cage 6-Point", category: "Body Kits & Aero", brand: "Cusco", part_number: "CUSCO-CAGE-6PT", price: 1200.0, stock: 0, description: "Bolt-in 6-point roll cage for track prep", daysAgo: 160 },
  { name: "RAYS Carbon Diffuser", category: "Body Kits & Aero", brand: "RAYS", part_number: "RAYS-DIFF-CF", price: 640.0, stock: 6, description: "Rear diffuser for improved underbody airflow", daysAgo: 33 },
  { name: "Nismo GT Wing Kit", category: "Body Kits & Aero", brand: "Nismo", part_number: "NISMO-GTWING", price: 720.0, stock: 5, description: "Track-focused GT wing with adjustable angle", daysAgo: 15 },
  { name: "Varis Carbon Rear Diffuser", category: "Body Kits & Aero", brand: "Varis", part_number: "VARIS-DIFF-CF", price: 780.0, stock: 3, description: "Aggressive carbon rear diffuser", daysAgo: 17 },
  { name: "Voltex Cyber Formula Front Bumper", category: "Body Kits & Aero", brand: "Voltex", part_number: "VOLTEX-CF-BUMP", price: 1650.0, stock: 2, description: "Wide aero front bumper with splitter", daysAgo: 52 },
  { name: "Greddy Rocket Bunny Ducktail Kit", category: "Body Kits & Aero", brand: "Greddy", part_number: "GREDDY-DUCKTAIL", price: 620.0, stock: 6, description: "Ducktail rear spoiler kit", daysAgo: 29 },
  { name: "Blitz Aero Side Skirts", category: "Body Kits & Aero", brand: "Blitz", part_number: "BLITZ-SIDESKIRT", price: 410.0, stock: 8, description: "Full carbon side skirt extensions", daysAgo: 63 },
  { name: "Cusco Carbon Trunk Lid", category: "Body Kits & Aero", brand: "Cusco", part_number: "CUSCO-TRUNK-CF", price: 720.0, stock: 1, description: "Lightweight carbon fiber trunk lid", daysAgo: 110 },
  { name: "Nismo Heritage Front Grille", category: "Body Kits & Aero", brand: "Nismo", part_number: "NISMO-GRILLE", price: 220.0, stock: 12, description: "Heritage-style mesh front grille", daysAgo: 21 },

  // Wheels & Tires
  { name: 'RAYS Volk TE37 Wheels 18"', category: "Wheels & Tires", brand: "RAYS", part_number: "TE37-18", price: 1650.0, stock: 12, description: "Legendary forged wheels", daysAgo: 220 },
  { name: 'Enkei RPF1 Wheels 17"', category: "Wheels & Tires", brand: "Enkei", part_number: "ENKEI-RPF1-17", price: 780.0, stock: 16, description: "Lightweight forged wheels for track use", daysAgo: 20 },
  { name: 'RAYS Gram Lights 57DR 18"', category: "Wheels & Tires", brand: "RAYS", part_number: "RAYS-57DR-18", price: 1200.0, stock: 8, description: "Classic mesh design forged wheels", daysAgo: 10 },
  { name: "BC Racing Forged Wheel Spacers", category: "Wheels & Tires", brand: "BC Racing", part_number: "BC-SPACER-KIT", price: 120.0, stock: 25, description: "Hub-centric wheel spacers, 15mm/20mm pair", daysAgo: 4 },
  { name: 'Enkei RS05RR Wheels 18"', category: "Wheels & Tires", brand: "Enkei", part_number: "ENKEI-RS05RR", price: 1450.0, stock: 0, description: "Ultra-lightweight competition wheels", daysAgo: 175 },
  { name: 'Nismo LMGT4 Wheels 19"', category: "Wheels & Tires", brand: "Nismo", part_number: "NISMO-LMGT4", price: 1980.0, stock: 3, description: "Forged motorsport-derived wheel design", daysAgo: 28 },
  { name: "Nitto NT555 G2 Tire Set", category: "Wheels & Tires", brand: null, part_number: "NITTO-NT555-SET", price: 640.0, stock: 18, description: "Ultra high performance summer tire set of 4", daysAgo: 50 },
  { name: 'RAYS TE37 SAGA Wheels 18"', category: "Wheels & Tires", brand: "RAYS", part_number: "RAYS-TE37-SAGA", price: 1750.0, stock: 6, description: "Modern reinterpretation of the classic TE37", daysAgo: 7 },
  { name: 'Enkei PF01 Wheels 17"', category: "Wheels & Tires", brand: "Enkei", part_number: "ENKEI-PF01-17", price: 690.0, stock: 11, description: "Motorsport pedigree lightweight wheel", daysAgo: 65 },
  { name: 'Enkei NT03+M Wheels 18"', category: "Wheels & Tires", brand: "Enkei", part_number: "ENKEI-NT03M-18", price: 950.0, stock: 9, description: "Motorsport-grade flow formed wheel", daysAgo: 36 },
  { name: 'RAYS ZE40 Wheels 18"', category: "Wheels & Tires", brand: "RAYS", part_number: "RAYS-ZE40-18", price: 1550.0, stock: 4, description: "Lightweight forged competition wheel", daysAgo: 15 },
  { name: "Whiteline Hub Centric Rings", category: "Wheels & Tires", brand: "Whiteline", part_number: "WHITELINE-HUBRING", price: 35.0, stock: 40, description: "Hub centric ring set for wheel fitment", daysAgo: 5 },
  { name: "Nitto NT01 Semi-Slick Tire Set", category: "Wheels & Tires", brand: null, part_number: "NITTO-NT01-SET", price: 980.0, stock: 10, description: "Extreme performance DOT semi-slick tire set", daysAgo: 24 },
  { name: "BC Racing Extended Wheel Studs", category: "Wheels & Tires", brand: "BC Racing", part_number: "BC-STUDS-EXT", price: 60.0, stock: 35, description: "Extended wheel stud kit for spacer clearance", daysAgo: 8 },
  { name: 'Enkei TS-10 Wheels 17"', category: "Wheels & Tires", brand: "Enkei", part_number: "ENKEI-TS10-17", price: 820.0, stock: 13, description: "Classic multi-spoke lightweight wheel", daysAgo: 47 },

  // Interior & Audio
  { name: "Bride Zeta III Racing Seats", category: "Interior & Audio", brand: "Bride", part_number: "BRD-ZETA3", price: 1250.0, stock: 6, description: "Semi-racing seats (red)", daysAgo: 220 },
  { name: "Recaro SR-7 Racing Seats", category: "Interior & Audio", brand: "Recaro", part_number: "RECARO-SR7", price: 1400.0, stock: 4, description: "FIA-approved bucket racing seats", daysAgo: 22 },
  { name: "Bride Vios III Reclining Seats", category: "Interior & Audio", brand: "Bride", part_number: "BRD-VIOS3", price: 980.0, stock: 5, description: "Reclining street/track seats with low hip point", daysAgo: 9 },
  { name: "Nismo Leather Shift Knob", category: "Interior & Audio", brand: "Nismo", part_number: "NISMO-SHIFTKNOB", price: 65.0, stock: 30, description: "Leather-wrapped shift knob with Nismo stitching", daysAgo: 1 },
  { name: "Apexi Turbo Timer", category: "Interior & Audio", brand: "Apexi", part_number: "APEXI-TTIMER", price: 140.0, stock: 12, description: "Turbo timer for post-drive turbo cooldown", daysAgo: 38 },
  { name: "Defi Boost Gauge 60mm", category: "Interior & Audio", brand: "Defi", part_number: "DEFI-BOOST-60", price: 180.0, stock: 9, description: "Electronic boost gauge with digital display", daysAgo: 14 },
  { name: "Cusco 4-Point Harness", category: "Interior & Audio", brand: "Cusco", part_number: "CUSCO-HARNESS-4PT", price: 220.0, stock: 10, description: "FIA-rated 4-point racing harness, pair", daysAgo: 48 },
  { name: "Bride Seat Rail Kit", category: "Interior & Audio", brand: "Bride", part_number: "BRD-RAIL-KIT", price: 310.0, stock: 7, description: "Low-down seat rail kit for bucket seat mounting", daysAgo: 80 },
  { name: "Recaro Steering Wheel Boss Kit", category: "Interior & Audio", brand: "Recaro", part_number: "RECARO-BOSS-KIT", price: 90.0, stock: 16, description: "Hub adapter kit for aftermarket steering wheels", daysAgo: 5 },
  { name: "Sparco R100 Racing Seats", category: "Interior & Audio", brand: "Sparco", part_number: "SPARCO-R100", price: 620.0, stock: 10, description: "FIA-approved fixed-back racing seat", daysAgo: 31 },
  { name: "Sparco Steering Wheel 350mm", category: "Interior & Audio", brand: "Sparco", part_number: "SPARCO-SW-350", price: 260.0, stock: 15, description: "Suede-wrapped deep dish steering wheel", daysAgo: 6 },
  { name: "Defi Advance BF Gauge Set", category: "Interior & Audio", brand: "Defi", part_number: "DEFI-BF-SET", price: 480.0, stock: 7, description: "Multi-gauge set: boost, oil pressure, oil temp", daysAgo: 40 },
  { name: "Bride Low Down Seat Rail", category: "Interior & Audio", brand: "Bride", part_number: "BRD-LOWDOWN-RAIL", price: 290.0, stock: 9, description: "Low mounting position seat rail kit", daysAgo: 58 },
  { name: "Cusco Quick Release Hub", category: "Interior & Audio", brand: "Cusco", part_number: "CUSCO-QR-HUB", price: 150.0, stock: 18, description: "Steering wheel quick release hub adapter", daysAgo: 13 },
  { name: "Recaro Pole Position Seats", category: "Interior & Audio", brand: "Recaro", part_number: "RECARO-POLEPOS", price: 1600.0, stock: 2, description: "Ultra-lightweight FIA racing bucket seat", daysAgo: 90 },

  // Exhaust Systems
  { name: "HKS Hi-Power Exhaust System", category: "Exhaust Systems", brand: "HKS", part_number: "HKS-HIPOWER", price: 980.0, stock: 6, description: "Full titanium cat-back exhaust system", daysAgo: 14 },
  { name: "Greddy SP Elite Exhaust", category: "Exhaust Systems", brand: "Greddy", part_number: "GREDDY-SPELITE", price: 720.0, stock: 8, description: "Stainless steel cat-back exhaust", daysAgo: 27 },
  { name: "Tomei Expreme Ti Exhaust", category: "Exhaust Systems", brand: "Tomei", part_number: "TOMEI-EXPREME-TI", price: 1250.0, stock: 3, description: "Titanium racing exhaust system", daysAgo: 45 },
  { name: "Apexi N1-X Evolution Extreme Exhaust", category: "Exhaust Systems", brand: "Apexi", part_number: "APEXI-N1X", price: 890.0, stock: 5, description: "High-flow N1 style muffler system", daysAgo: 9 },
  { name: "Blitz Nur-Spec R Exhaust", category: "Exhaust Systems", brand: "Blitz", part_number: "BLITZ-NURSPEC-R", price: 1050.0, stock: 4, description: "Stainless dual-tip cat-back exhaust", daysAgo: 60 },
  { name: "Nismo Sports Exhaust System", category: "Exhaust Systems", brand: "Nismo", part_number: "NISMO-SPORTS-EX", price: 1400.0, stock: 2, description: "OEM-style performance exhaust upgrade", daysAgo: 33 },
  { name: "Cusco Racing Header", category: "Exhaust Systems", brand: "Cusco", part_number: "CUSCO-HEADER", price: 520.0, stock: 7, description: "4-2-1 equal length racing header", daysAgo: 78 },
  { name: "HKS Super Turbo Muffler", category: "Exhaust Systems", brand: "HKS", part_number: "HKS-SUPERTURBO", price: 640.0, stock: 10, description: "Compact turbo-style rear muffler", daysAgo: 20 },
  { name: "Greddy Racing Manifold", category: "Exhaust Systems", brand: "Greddy", part_number: "GREDDY-MANIFOLD", price: 480.0, stock: 6, description: "Tubular turbo exhaust manifold", daysAgo: 51 },
  { name: "Tomei Catless Downpipe", category: "Exhaust Systems", brand: "Tomei", part_number: "TOMEI-DOWNPIPE", price: 380.0, stock: 12, description: "High-flow catless downpipe", daysAgo: 4 },
  { name: "Apexi Titanium Tip Muffler", category: "Exhaust Systems", brand: "Apexi", part_number: "APEXI-TITIP", price: 310.0, stock: 9, description: "Single titanium tip muffler", daysAgo: 66 },
  { name: "Blitz Cat-Back Dual Exit", category: "Exhaust Systems", brand: "Blitz", part_number: "BLITZ-DUALEXIT", price: 890.0, stock: 0, description: "Dual exit cat-back exhaust system", daysAgo: 140 },
  { name: "Nismo Titanium Exhaust Tip", category: "Exhaust Systems", brand: "Nismo", part_number: "NISMO-TI-TIP", price: 90.0, stock: 25, description: "Bolt-on titanium exhaust tip", daysAgo: 2 },
  { name: "Cusco Exhaust Hanger Kit", category: "Exhaust Systems", brand: "Cusco", part_number: "CUSCO-HANGER-KIT", price: 45.0, stock: 30, description: "Reinforced rubber exhaust hanger kit", daysAgo: 18 },
  { name: "HKS Legamax Premium Exhaust", category: "Exhaust Systems", brand: "HKS", part_number: "HKS-LEGAMAX", price: 760.0, stock: 5, description: "Quiet street-focused cat-back system", daysAgo: 37 },

  // Intake & Forced Induction
  { name: "K&N Typhoon Cold Air Intake", category: "Intake & Forced Induction", brand: "K&N", part_number: "KN-TYPHOON", price: 260.0, stock: 20, description: "High-flow cold air intake system", daysAgo: 6 },
  { name: "AEM Cold Air Intake System", category: "Intake & Forced Induction", brand: "AEM", part_number: "AEM-CAI", price: 290.0, stock: 15, description: "Dyno-proven cold air intake kit", daysAgo: 22 },
  { name: "HKS Super Power Flow Intake", category: "Intake & Forced Induction", brand: "HKS", part_number: "HKS-SPF", price: 320.0, stock: 10, description: "Open element performance intake", daysAgo: 41 },
  { name: "Greddy Airinx Intake Kit", category: "Intake & Forced Induction", brand: "Greddy", part_number: "GREDDY-AIRINX", price: 280.0, stock: 12, description: "Heat-shielded intake kit", daysAgo: 55 },
  { name: "Apexi Power Intake", category: "Intake & Forced Induction", brand: "Apexi", part_number: "APEXI-POWERINTAKE", price: 250.0, stock: 14, description: "Reusable panel filter intake system", daysAgo: 9 },
  { name: "HKS GTIII Turbo Kit", category: "Intake & Forced Induction", brand: "HKS", part_number: "HKS-GT3-KIT", price: 4200.0, stock: 1, description: "Complete bolt-on turbocharger kit", daysAgo: 95 },
  { name: "Greddy TD06 Turbocharger", category: "Intake & Forced Induction", brand: "Greddy", part_number: "GREDDY-TD06", price: 1850.0, stock: 2, description: "High-flow ball bearing turbocharger", daysAgo: 30 },
  { name: "Tomei ARMS MX8270 Turbo", category: "Intake & Forced Induction", brand: "Tomei", part_number: "TOMEI-MX8270", price: 2100.0, stock: 1, description: "Twin-scroll performance turbocharger", daysAgo: 120 },
  { name: "Nismo Intercooler Kit", category: "Intake & Forced Induction", brand: "Nismo", part_number: "NISMO-IC-KIT", price: 980.0, stock: 4, description: "Front-mount intercooler upgrade kit", daysAgo: 17 },
  { name: "Mishimoto Intercooler Piping Kit", category: "Intake & Forced Induction", brand: "Mishimoto", part_number: "MISH-IC-PIPE", price: 420.0, stock: 8, description: "Aluminum intercooler piping kit", daysAgo: 63 },
  { name: "HKS SSQV4 Blow Off Valve", category: "Intake & Forced Induction", brand: "HKS", part_number: "HKS-SSQV4", price: 240.0, stock: 16, description: "Sequential blow off valve", daysAgo: 3 },
  { name: "AEM Wideband Air/Fuel Gauge", category: "Intake & Forced Induction", brand: "AEM", part_number: "AEM-WIDEBAND", price: 220.0, stock: 11, description: "UEGO wideband air/fuel ratio gauge", daysAgo: 25 },
  { name: "K&N Drop-In Panel Filter", category: "Intake & Forced Induction", brand: "K&N", part_number: "KN-PANEL", price: 65.0, stock: 40, description: "High-flow drop-in replacement filter", daysAgo: 1 },
  { name: "Greddy Compact Intercooler Core", category: "Intake & Forced Induction", brand: "Greddy", part_number: "GREDDY-IC-CORE", price: 640.0, stock: 5, description: "Bar-and-plate intercooler core", daysAgo: 74 },
  { name: "Apexi AFC Neo Fuel Controller", category: "Intake & Forced Induction", brand: "Apexi", part_number: "APEXI-AFC-NEO", price: 380.0, stock: 6, description: "Piggyback fuel and timing controller", daysAgo: 48 },

  // Drivetrain & Transmission
  { name: "Nismo Coppermix Twin Clutch Kit", category: "Drivetrain & Transmission", brand: "Nismo", part_number: "NISMO-CMTWIN", price: 1450.0, stock: 3, description: "High-performance twin plate clutch kit", daysAgo: 12 },
  { name: "Cusco Type RS Limited Slip Differential", category: "Drivetrain & Transmission", brand: "Cusco", part_number: "CUSCO-LSD-RS", price: 1250.0, stock: 4, description: "1.5-way mechanical LSD", daysAgo: 38 },
  { name: "Nissan OEM 5-Speed Manual Transmission", category: "Drivetrain & Transmission", brand: "Nissan", part_number: "NISSAN-5MT-OEM", price: 2600.0, stock: 1, description: "Reconditioned OEM manual gearbox", daysAgo: 200 },
  { name: "Toyota OEM Rear Differential", category: "Drivetrain & Transmission", brand: "Toyota", part_number: "TOYOTA-DIFF-OEM", price: 980.0, stock: 2, description: "OEM rear differential assembly", daysAgo: 150 },
  { name: "Nismo Reinforced Clutch Line", category: "Drivetrain & Transmission", brand: "Nismo", part_number: "NISMO-CLUTCHLINE", price: 85.0, stock: 20, description: "Braided stainless clutch line", daysAgo: 5 },
  { name: "Cusco Short Shifter Kit", category: "Drivetrain & Transmission", brand: "Cusco", part_number: "CUSCO-SHORTSHIFT", price: 220.0, stock: 14, description: "Reduced-throw short shifter kit", daysAgo: 29 },
  { name: "Tomei Lightweight Flywheel", category: "Drivetrain & Transmission", brand: "Tomei", part_number: "TOMEI-FLYWHEEL", price: 460.0, stock: 6, description: "Chromoly lightweight racing flywheel", daysAgo: 67 },
  { name: "HKS Twin Plate Clutch Kit", category: "Drivetrain & Transmission", brand: "HKS", part_number: "HKS-TWINCLUTCH", price: 1600.0, stock: 2, description: "Twin plate racing clutch kit", daysAgo: 44 },
  { name: "Nismo GT Propeller Shaft", category: "Drivetrain & Transmission", brand: "Nismo", part_number: "NISMO-PROPSHAFT", price: 780.0, stock: 3, description: "Lightweight carbon propeller shaft", daysAgo: 88 },
  { name: "Cusco Transmission Mount Kit", category: "Drivetrain & Transmission", brand: "Cusco", part_number: "CUSCO-TRANSMOUNT", price: 130.0, stock: 18, description: "Reinforced transmission mount set", daysAgo: 10 },
  { name: "Toyota OEM Clutch Master Cylinder", category: "Drivetrain & Transmission", brand: "Toyota", part_number: "TOYOTA-CMC-OEM", price: 95.0, stock: 25, description: "OEM replacement clutch master cylinder", daysAgo: 22 },
  { name: "Nismo Solid Differential Mount", category: "Drivetrain & Transmission", brand: "Nismo", part_number: "NISMO-DIFFMOUNT", price: 110.0, stock: 16, description: "Solid rear differential mount bushings", daysAgo: 55 },
  { name: "Cusco Reinforced Axle Set", category: "Drivetrain & Transmission", brand: "Cusco", part_number: "CUSCO-AXLE-SET", price: 640.0, stock: 4, description: "Heavy duty reinforced axle set", daysAgo: 33 },
  { name: "Nissan OEM Clutch Kit", category: "Drivetrain & Transmission", brand: "Nissan", part_number: "NISSAN-CLUTCH-OEM", price: 320.0, stock: 12, description: "OEM replacement clutch kit", daysAgo: 7 },
  { name: "HKS Carbon Composite Clutch", category: "Drivetrain & Transmission", brand: "HKS", part_number: "HKS-CARBON-CLUTCH", price: 1900.0, stock: 1, description: "Extreme duty carbon composite clutch", daysAgo: 100 },

  // Electrical & Lighting
  { name: "Defi Advance ZD Boost Gauge", category: "Electrical & Lighting", brand: "Defi", part_number: "DEFI-ZD-BOOST", price: 210.0, stock: 12, description: "Slim-line digital boost gauge", daysAgo: 15 },
  { name: "AEM EMS Standalone ECU", category: "Electrical & Lighting", brand: "AEM", part_number: "AEM-EMS", price: 1450.0, stock: 3, description: "Fully programmable standalone engine management", daysAgo: 40 },
  { name: "Nismo LED Headlight Kit", category: "Electrical & Lighting", brand: "Nismo", part_number: "NISMO-LED-HEAD", price: 480.0, stock: 8, description: "Direct-fit LED headlight conversion kit", daysAgo: 6 },
  { name: "Nissan OEM Tail Light Assembly", category: "Electrical & Lighting", brand: "Nissan", part_number: "NISSAN-TAIL-OEM", price: 220.0, stock: 14, description: "OEM replacement tail light assembly", daysAgo: 52 },
  { name: "Toyota OEM Fog Light Kit", category: "Electrical & Lighting", brand: "Toyota", part_number: "TOYOTA-FOG-OEM", price: 160.0, stock: 18, description: "OEM fog light kit with wiring harness", daysAgo: 70 },
  { name: "Defi Link Meter ADVANCE", category: "Electrical & Lighting", brand: "Defi", part_number: "DEFI-LINKMETER", price: 320.0, stock: 6, description: "CAN-based digital gauge display system", daysAgo: 28 },
  { name: "AEM Digital Boost Gauge 30psi", category: "Electrical & Lighting", brand: "AEM", part_number: "AEM-BOOST-30", price: 140.0, stock: 20, description: "Digital electronic boost gauge", daysAgo: 3 },
  { name: "Apexi Rev Speed Meter", category: "Electrical & Lighting", brand: "Apexi", part_number: "APEXI-REVSPEED", price: 260.0, stock: 9, description: "Multi-function shift light and gauge", daysAgo: 46 },
  { name: "Nismo Sequential Shift Light", category: "Electrical & Lighting", brand: "Nismo", part_number: "NISMO-SHIFTLIGHT", price: 95.0, stock: 22, description: "LED sequential shift light indicator", daysAgo: 11 },
  { name: "Nissan OEM Wiring Harness", category: "Electrical & Lighting", brand: "Nissan", part_number: "NISSAN-HARNESS-OEM", price: 380.0, stock: 5, description: "OEM engine wiring harness", daysAgo: 110 },
  { name: "Defi Oil Pressure Sensor", category: "Electrical & Lighting", brand: "Defi", part_number: "DEFI-OILPRESS-SENS", price: 55.0, stock: 30, description: "Replacement oil pressure sensor", daysAgo: 2 },
  { name: "AEM Fuel Pressure Gauge", category: "Electrical & Lighting", brand: "AEM", part_number: "AEM-FUELPRESS", price: 130.0, stock: 16, description: "Mechanical fuel pressure gauge", daysAgo: 34 },
  { name: "Toyota OEM Ignition Coil Set", category: "Electrical & Lighting", brand: "Toyota", part_number: "TOYOTA-COIL-OEM", price: 210.0, stock: 12, description: "OEM replacement ignition coil set", daysAgo: 8 },
  { name: "Nismo LED Interior Light Kit", category: "Electrical & Lighting", brand: "Nismo", part_number: "NISMO-LED-INT", price: 60.0, stock: 25, description: "Full interior LED conversion kit", daysAgo: 19 },
  { name: "Apexi Electronic Boost Timer", category: "Electrical & Lighting", brand: "Apexi", part_number: "APEXI-EBC-TIMER", price: 300.0, stock: 7, description: "Electronic boost control timer unit", daysAgo: 62 },

  // Fuel System & Cooling
  { name: "Walbro 450lph Fuel Pump", category: "Fuel System & Cooling", brand: "Walbro", part_number: "WALBRO-450", price: 140.0, stock: 20, description: "High-flow in-tank fuel pump", daysAgo: 5 },
  { name: "Walbro 255lph Fuel Pump", category: "Fuel System & Cooling", brand: "Walbro", part_number: "WALBRO-255", price: 95.0, stock: 25, description: "Direct-fit high-flow fuel pump", daysAgo: 12 },
  { name: "Mishimoto Performance Thermostat", category: "Fuel System & Cooling", brand: "Mishimoto", part_number: "MISH-THERMO", price: 45.0, stock: 30, description: "Low-temp performance thermostat", daysAgo: 18 },
  { name: "Nismo Fuel Rail Kit", category: "Fuel System & Cooling", brand: "Nismo", part_number: "NISMO-FUELRAIL", price: 380.0, stock: 6, description: "Billet aluminum fuel rail kit", daysAgo: 44 },
  { name: "Cusco Radiator Cap High Pressure", category: "Fuel System & Cooling", brand: "Cusco", part_number: "CUSCO-RADCAP", price: 25.0, stock: 40, description: "1.3 bar high pressure radiator cap", daysAgo: 3 },
  { name: "AEM 320lph Fuel Pump", category: "Fuel System & Cooling", brand: "AEM", part_number: "AEM-320LPH", price: 120.0, stock: 18, description: "In-tank high-pressure fuel pump", daysAgo: 27 },
  { name: "Mishimoto Oil Cooler Kit", category: "Fuel System & Cooling", brand: "Mishimoto", part_number: "MISH-OILCOOLER", price: 340.0, stock: 8, description: "Thermostatic oil cooler kit", daysAgo: 61 },
  { name: "Nissan OEM Fuel Injector Set", category: "Fuel System & Cooling", brand: "Nissan", part_number: "NISSAN-INJ-OEM", price: 620.0, stock: 4, description: "OEM replacement fuel injector set", daysAgo: 90 },
  { name: "Walbro Fuel Pump Hanger Assembly", category: "Fuel System & Cooling", brand: "Walbro", part_number: "WALBRO-HANGER", price: 180.0, stock: 10, description: "Fuel pump hanger and sending unit", daysAgo: 35 },
  { name: "Mishimoto Silicone Radiator Hose Kit", category: "Fuel System & Cooling", brand: "Mishimoto", part_number: "MISH-HOSE-KIT", price: 130.0, stock: 16, description: "Reinforced silicone coolant hose kit", daysAgo: 9 },
  { name: "Cusco Oil Filter Relocation Kit", category: "Fuel System & Cooling", brand: "Cusco", part_number: "CUSCO-OILRELOC", price: 160.0, stock: 12, description: "Remote oil filter relocation kit", daysAgo: 53 },
  { name: "Nismo Coolant Reservoir Tank", category: "Fuel System & Cooling", brand: "Nismo", part_number: "NISMO-COOLTANK", price: 90.0, stock: 15, description: "Lightweight coolant overflow tank", daysAgo: 24 },
  { name: "AEM High Flow Fuel Filter", category: "Fuel System & Cooling", brand: "AEM", part_number: "AEM-FUELFILTER", price: 55.0, stock: 22, description: "High-flow inline fuel filter", daysAgo: 1 },
  { name: "Mishimoto Aluminum Fan Shroud", category: "Fuel System & Cooling", brand: "Mishimoto", part_number: "MISH-FANSHROUD", price: 150.0, stock: 9, description: "Lightweight aluminum fan shroud", daysAgo: 68 },
  { name: "Nissan OEM Water Pump", category: "Fuel System & Cooling", brand: "Nissan", part_number: "NISSAN-WATERPUMP-OEM", price: 210.0, stock: 11, description: "OEM replacement water pump", daysAgo: 31 },
];

async function main() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE categories, brands, items RESTART IDENTITY CASCADE");

    const categoryIds = {};
    for (const category of categories) {
      const result = await client.query(
        "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id",
        [category.name, category.description]
      );
      categoryIds[category.name] = result.rows[0].id;
    }

    const brandIds = {};
    for (const brand of brands) {
      const result = await client.query(
        "INSERT INTO brands (name, country) VALUES ($1, $2) RETURNING id",
        [brand.name, brand.country]
      );
      brandIds[brand.name] = result.rows[0].id;
    }

    for (const item of items) {
      const imageUrl = `/images/products/${slugify(item.name)}.webp`;
      await client.query(
        `INSERT INTO items
          (name, category_id, brand_id, part_number, price, stock, description, image_url, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          item.name,
          categoryIds[item.category],
          item.brand ? brandIds[item.brand] : null,
          item.part_number,
          item.price,
          item.stock,
          item.description,
          imageUrl,
          daysAgo(item.daysAgo),
        ]
      );
    }

    await client.query("COMMIT");
    console.log(`Seeded ${categories.length} categories, ${brands.length} brands, ${items.length} items.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Failed to seed database:", error);
  process.exit(1);
});
