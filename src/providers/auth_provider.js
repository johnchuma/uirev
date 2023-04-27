import React, { Children, createContext,useEffect,useState }  from 'react'
import { auth } from '../controllers/firebase';
// import { findUser } from '../controllers/design_controller';
import { useNavigate } from 'react-router-dom';
import { findUser } from '../controllers/auth_controller';
export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
     const unsubscribe= auth.onAuthStateChanged((user)=>{
            console.log(user)
            if(user){
                findUser(user).then((response)=>{
                    setCurrentUser(response)
                })
            }
            else{
                setCurrentUser(null)
            }
            
            console.log(user)
        })
       return unsubscribe
    }, []);
    return <AuthContext.Provider value={{user:currentUser,setUser:setCurrentUser}} >
       {children}
    </AuthContext.Provider>
}

export default AuthProvider
