import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export default function Authprovider({ children }) {
  const currentUserEmail = localStorage.getItem('currentUserEmail');
  const [user, setUser] = useState(currentUserEmail ? { email: currentUserEmail } : null);

  function SignUp(email, password) {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');

      if(existingUsers.find((user) => user.email === email)) {
        return { Success: false, error: 'User already exists' };
      }

      const newUser = { email, password };
      existingUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('currentUserEmail', email);
      setUser({ email });

      return { Success: true };
    } catch (error) {
      return { Success: false, error: 'Something went wrong.' };
    }
  }

  function Login(email, password) {
    try {
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = existingUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        return { Success: false, error: 'Invalid email or password!' };
      }

      localStorage.setItem('currentUserEmail', email);
      setUser({ email });

      return { Success: true };
    } catch (error) {
      return { Success: false, error: 'Something went wrong.' };
    }
  }

  function Logout() {
    localStorage.removeItem('currentUserEmail');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ SignUp, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
