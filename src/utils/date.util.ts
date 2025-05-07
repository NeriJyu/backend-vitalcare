export const calculateAgeInYears = (birthDate: Date): number => {
  const diff = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const calculateAgeInMonths = (birthDate: Date): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  
  const yearsDiff = today.getFullYear() - birth.getFullYear();
  const monthsDiff = today.getMonth() - birth.getMonth();
  const totalMonths = (yearsDiff * 12) + monthsDiff;
  
  if (today.getDate() < birth.getDate()) {
    return totalMonths - 1;
  }
  return totalMonths;
};