import { arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import React from 'react'
import { auth, firestore } from './firebase'
export const getChallenges = async()=>{
    try {
        const querySnapshots = await getDocs(collection(firestore,'challanges'))
        const challenges  = await Promise.all(querySnapshots.docs.map( async (snapshot)=>{
            const challangeInfo = snapshot.data()
           
          const users = await Promise.all(challangeInfo.participants.map(async (userId)=>{
                  const user = await getDoc(doc(firestore,'users',userId))
                  return user.data()
           }))
            return {...challangeInfo,participantsInfo:users}
        }))
        console.log(challenges)
        return challenges
    } catch (error) {
        console.error("Failed to fetch challenges",error)
    }
}

export const joinChallenge = async(id)=>{
    try {
        const docReferance = doc(firestore,'challanges',id);
        await updateDoc(docReferance,{
         participants:arrayUnion(auth.currentUser.uid)
        })
    } catch (error) {
        console.error(error)
    }
}
