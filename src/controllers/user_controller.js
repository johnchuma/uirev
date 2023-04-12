import { collection, getCountFromServer,getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "./firebase";

export const designsCounts = async ()=> {
     try {
        let totalDesigns,inReview,reviewed;
        const totalDesignsSnapshot = await getCountFromServer(query(collection(firestore,'designs'),where("userID","==",auth.currentUser.uid)))
        const inReviewSnapshot =await  getCountFromServer(query(collection(firestore,'designs'),where("userID","==",auth.currentUser.uid),where("inReview","==",true)))
        const reviewedSnapshot =await getCountFromServer(query(collection(firestore,'designs'),where("userID","==",auth.currentUser.uid),where("inReview","==",false)))
        
        return {totalDesigns:totalDesignsSnapshot.data().count,inReview:inReviewSnapshot.data().count,reviewed:reviewedSnapshot.data().count}

     } catch (error) {
        console.log(error)
     }
}

export const getAllFeedbacks = async ()=> {
    try {
        const feedbacks = [];
        const qr = query(collection(firestore,'feedback'),where('userID','==',auth.currentUser.uid))
        const snapshots = await getDocs(qr)
        snapshots.forEach((snapshot)=>{
        feedbacks.push(snapshot.data())
      })
    
      return feedbacks;
    } catch (error) {
        console.log(error)
    }
}