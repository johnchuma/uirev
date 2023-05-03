import { doc, updateDoc } from "firebase/firestore"
import { firestore } from "./firebase"



export const rankChallengeParticipants = async(participants,challengeId)=>{
    try {
        const docReferance = doc(firestore,'challanges',challengeId);
         await updateDoc(docReferance,{
            participants,
            closed:true,
         })
    } catch (error) {
        console.error(error)
    }
}
