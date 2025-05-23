export const saveToken = (token) => localStorage.setItem("adminToken", token);
export const getToken = () => localStorage.getItem("adminToken");
export const isLoggedIn = () => !!getToken();
export const logout = () => localStorage.removeItem("adminToken");
