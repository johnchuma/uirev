import { auth, firestore } from "./firebase"
import {doc,setDoc,getDocs,collection,query,where,updateDoc} from "firebase/firestore"
import {v4 as uuidv4} from 'uuid'

export const submitFeedback =async (data)=>{
    try {
        const uid = uuidv4() 
        const reference = doc(firestore,'feedback',uid);
        const response = await setDoc(reference,{
           id:uid,
           expertID:auth.currentUser.uid,
           ...data
        })
        return response;
    } catch (error) {
        console.log(error)
}}
export const submitDesignReview = async (id,feedback)=>{
    try {
        const feedbackID =  [];
        feedback.forEach(element => {
            feedbackID.push(element.id)
        });
        const ref = doc(firestore,'designs',id)
        await updateDoc(ref,{
            inReview:false,
            feedback:feedbackID
        })

    } catch (error) {
        
    }
}

 export const getDesignFeedbacks = async (id)=>{
    try {
        const data = []
        const qr = query(collection(firestore,'feedback'),where('designID','==',id))
        const snapshots = await getDocs(qr)
        snapshots.forEach(snapshot => {
             data.push(snapshot.data())
        });
        return data;
    } catch (error) {
        
    }
 }       
