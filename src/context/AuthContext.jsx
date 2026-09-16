import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export default function Authprovider({ children }) {
  const [user, setUser] = useState(
        localStorage.getItem('users') 
        ? {email: localStorage.getItem('currentUserEmail')} : "[]");

  function SignUp(email, password) {
    console.log("SignUp function called with:", email, password); 

    try {
      
      const existingUsers = JSON.parse(localStorage.getItem('users') || "[]");

      if(existingUsers.find(user => user.email === email)) {

        return { Success: false, error: "User already exists" };
      }
      
      const newUser = { email, password };
      existingUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('currentUserEmail', email);

      setUser({ email });

      return { Success: true, error: "User registered successfully" };  
    
    } catch (error) {
      console.error("LocalStorage error:", error);
    }
  }

  function Login(email, password) {
  try {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      
      return { Success: false, error: "Invalid email or password!" }; 
    }

    localStorage.setItem('currentUserEmail', email);
    setUser({ email });
    
    return { Success: true }; 
  } catch (error) {
    return { Success: false, error: "Something went wrong." };
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
  const context = useContext(AuthContext);
  return context;
}
