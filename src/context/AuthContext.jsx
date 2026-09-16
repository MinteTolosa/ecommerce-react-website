import  { useState } from 'react';
import { createContext } from 'react';
 
export const AuthContext = createContext(null);

function AuthProvider( {children}) {

    const [user, setUser] = useState(
      localStorage.getItem("currentUserEmail") 
      ? {email: localStorage.getItem("currentUserEmail")} 
      : null);

    function signUp(email, password){
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        console.log(users);
        if (users.find((user) => user.email === email)) {
          return {success: false, message: "User already exists"};
        }

        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users))
        console.log(users);
        localStorage.setItem("currentUserEmail", email);
        setUser({email});

        return {success: true, message: "User created successfully"};
    }

     function login(email, password){

      const users = JSON.parse(localStorage.getItem("users") || []);

      const user = users.find(
        (user) => user.email === email && user.password === password);

        if (!user) {
          return {success: false, message: "Invalid email or password"};
        }
        
        localStorage.setItem("currentUserEmail", email);
        setUser({email});

        return {success: true, message: "User created successfully"};
    }

    function logout(){
      localStorage.removeItem("currentUserEmail");
      setUser(null);
    }

  return (
    <AuthContext.Provider value={{signUp, user, logout, login}}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider