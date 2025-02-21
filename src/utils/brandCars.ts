export const PASSENGER_CAR = [
  "Chevrolet",
  "Fiat",
  "Volkswagen",
  "Toyota",
  "Honda",
  "Renault",
  "Nissan",
  "Ford",
  "Hyundai",
  "Peugeot",
  "Citroën",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volvo",
  "Tesla",
  "BYD",
  "Caoa Chery",
  "Jeep",
  "Mini",
  "Land Rover",
  "Jaguar",
  "Porsche",
  "Mitsubishi",
  "Subaru",
  "Lexus",
  "Ram",
  "Suzuki",
  "JAC Motors",
  "Maserati",
  "Ferrari",
  "Lamborghini",
  "Bentley",
  "Rolls-Royce",
  "Bugatti",
  "McLaren",
  "Kia Motors",
  "Dongfeng",
  "GWM (Great Wall Motors)",
  "Geely",
];

export const ELECTRIC_CAR = [
  "Tesla",
  "BYD",
  "Caoa Chery",
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Volvo",
  "Porsche",
  "Jaguar",
  "Hyundai",
  "Kia Motors",
  "Nissan",
  "Renault",
  "Peugeot",
  "Citroën",
  "GWM (Great Wall Motors)",
  "Geely",
  "Dongfeng",
  "JAC Motors",
  "Toyota",
  "Ford",
  "Volkswagen",
];

export const PICKUP_TRUCK = [
  "Chevrolet",
  "Fiat",
  "Ford",
  "Toyota",
  "Volkswagen",
  "Nissan",
  "Ram",
  "Mitsubishi",
  "Renault",
  "GWM (Great Wall Motors)",
  "JAC Motors",
  "Peugeot",
  "Riddara",
];

export const VAN = [
  "Mercedes-Benz",
  "Renault",
  "Fiat",
  "Volkswagen",
  "Peugeot",
  "Citroën",
  "Ford",
  "Hyundai",
  "Toyota",
];

export const MOTORCYCLE = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "Kawasaki",
  "BMW",
  "Triumph",
  "Harley-Davidson",
  "Royal Enfield",
  "Ducati",
  "KTM",
  "Haojue",
  "Bajaj",
  "MV Agusta",
  "Indian Motorcycle",
];

export const SCOOTER = [
  "Honda",
  "Yamaha",
  "Suzuki",
  "BMW",
  "Dafra",
  "Kymco",
  "Vespa",
  "Shineray",
];

export const ATV = [
  "Can-Am",
  "Polaris",
  "Honda",
  "Yamaha",
  "Kawasaki",
  "CFMoto",
  "Arctic Cat",
];

export const UTV = [
  "Can-Am",
  "Polaris",
  "Honda",
  "Yamaha",
  "Kawasaki",
  "CFMoto",
  "John Deere",
];

export const LIGHT_TRUCK = [
  "Volkswagen",
  "Mercedes-Benz",
  "Iveco",
  "Ford",
  "Hyundai",
  "Peugeot",
  "Citroën",
  "Renault",
  "JAC Motors",
];

export const HEAVY_TRUCK = [
  "Scania",
  "Volvo",
  "Mercedes-Benz",
  "MAN",
  "DAF",
  "Iveco",
  "Volkswagen",
];

export const BUS = [
  "Mercedes-Benz",
  "Marcopolo",
  "Volvo",
  "Scania",
  "Agrale",
  "Volkswagen",
  "Caio",
  "Iveco",
];

export const AGRICULTURAL = [
  "John Deere",
  "Massey Ferguson",
  "New Holland",
  "Case IH",
  "Valtra",
  "Agrale",
  "Stara",
  "Jacto",
  "LS Tractor",
  "Yanmar",
];

export const CONSTRUCTION = [
  "Caterpillar",
  "Volvo",
  "JCB",
  "Komatsu",
  "XCMG",
  "LiuGong",
  "CASE",
  "Hyundai",
  "Bobcat",
  "Doosan",
];

export const EMERGENCY = [
  "Mercedes-Benz",
  "Renault",
  "Fiat",
  "Ford",
  "Volkswagen",
  "Chevrolet",
  "Toyota",
];

export const MILITARY = [
  "Agrale",
  "Iveco Defence Vehicles",
  "Mercedes-Benz",
  "AVIBRAS",
  "EMBRAER",
  "Taurus",
  "Mectron",
];

export const BRANDS = Array.from(
  new Set([
    ...PASSENGER_CAR,
    ...ELECTRIC_CAR,
    ...PICKUP_TRUCK,
    ...VAN,
    ...MOTORCYCLE,
    ...SCOOTER,
    ...ATV,
    ...UTV,
    ...LIGHT_TRUCK,
    ...HEAVY_TRUCK,
    ...BUS,
    ...AGRICULTURAL,
    ...CONSTRUCTION,
    ...EMERGENCY,
    ...MILITARY,
  ])
);
