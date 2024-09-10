export const isLoggedIn = () => {
    return !!localStorage.getItem('jwtToken');
  };