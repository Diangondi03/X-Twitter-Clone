export const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
};
  
export const saveTheme = (darkMode) => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
};