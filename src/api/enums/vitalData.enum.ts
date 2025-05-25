// 0–28 dias
export enum NeonateEnum {
  MIN_HEART_RATE = 100,
  MAX_HEART_RATE = 180,
  MIN_SPO2 = 95,
  MIN_TEMP = 36.5,
  MAX_TEMP = 37.5,
  MIN_HYDRATION = 75,
  MIN_RESPIRATION = 30,
  MAX_RESPIRATION = 60,
}

// 1–12 meses
export enum InfantEnum {
  MIN_HEART_RATE = 100,
  MAX_HEART_RATE = 160,
  MIN_SPO2 = 95,
  MIN_TEMP = 36.5,
  MAX_TEMP = 37.5,
  MIN_HYDRATION = 75,
  MIN_RESPIRATION = 30,
  MAX_RESPIRATION = 53,
}

// 1–3 anos
export enum ToddlerEnum {
  MIN_HEART_RATE = 90,
  MAX_HEART_RATE = 150,
  MIN_SPO2 = 95,
  MIN_TEMP = 36.5,
  MAX_TEMP = 37.5,
  MIN_HYDRATION = 75,
  MIN_RESPIRATION = 22,
  MAX_RESPIRATION = 37,
}

// 3–5 anos
export enum PreschoolEnum {
  MIN_HEART_RATE = 80,
  MAX_HEART_RATE = 140,
  MIN_SPO2 = 95,
  MIN_TEMP = 36.5,
  MAX_TEMP = 37.5,
  MIN_HYDRATION = 75,
  MIN_RESPIRATION = 20,
  MAX_RESPIRATION = 28,
}

// 6–12 anos
export enum SchoolAgeEnum {
  MIN_HEART_RATE = 70,
  MAX_HEART_RATE = 120,
  MIN_SPO2 = 95,
  MIN_TEMP = 36.0,
  MAX_TEMP = 37.5,
  MIN_HYDRATION = 70,
  MIN_RESPIRATION = 18,
  MAX_RESPIRATION = 25,
}

// 13–15 anos
export enum AdolescentEnum {
  MIN_HEART_RATE = 60,
  MAX_HEART_RATE = 100,
  MIN_SPO2 = 95,
  MIN_TEMP = 36.0,
  MAX_TEMP = 37.5,
  MIN_HYDRATION = 70,
  MIN_RESPIRATION = 12,
  MAX_RESPIRATION = 20,
}

// 16 anos ou mais
export enum AdultEnum {
  MIN_HEART_RATE = 60,    
  MAX_HEART_RATE = 100,   
  MIN_SPO2 = 95,           
  MIN_TEMP = 36.1,         
  MAX_TEMP = 37.2,         
  MIN_HYDRATION = 60,      
  MIN_RESPIRATION = 12,    
  MAX_RESPIRATION = 20,    
}