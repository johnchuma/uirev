import { doc, updateDoc } from "firebase/firestore"
import { auth, firestore } from "./firebase"

export const updateStep = async(number)=>{
    try {
      await updateDoc(doc(firestore,'users',auth.currentUser.uid),{
            step:number
        })
    } catch (error) {
        console.log(error)
    }    
}
export const updateTestStatus = async(status)=>{
    try {
    const response =  await updateDoc(doc(firestore,'users',auth.currentUser.uid),{
            testStatus:status
        })
        return response
    } catch (error) {
        console.log(error)
    }    
}