import { useNavigate } from "react-router-dom"

export const useRedirect = ()=>{
    const navigate = useNavigate()
    
    const redirect = (user)=>{
        if(user.accountType === "expert"){
            navigate('/expert')
        }
        else{
            navigate('/user')
        }
    }
    return redirect;
}



  
