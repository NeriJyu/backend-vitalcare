export const calculateAge = (birthDate: Date): number => {
  const diff = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(diff); // Converter a diferença para anos
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
