import { FieldValue, arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import React from 'react'
import { auth, firestore } from './firebase'
import {v4 as uuidv4} from 'uuid'

export const getChallenges = async()=>{
    try {
        const querySnapshots = await getDocs(collection(firestore,'challanges'))
        const challenges  = await Promise.all(querySnapshots.docs.map( async (snapshot)=>{
            const challangeInfo = snapshot.data()
           
          const users = await Promise.all(challangeInfo.participants.map(async (item)=>{
                  const user = await getDoc(doc(firestore,'users',item.id))
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
         participants:arrayUnion({id:auth.currentUser.uid,step:1})
        })
    } catch (error) {
        console.error(error)
    }
}
export const updateStep = async (id,step,participants)=>{
    try {
        const updatedParticipants = participants.filter(participant=>participant.id != auth.currentUser.uid)
        updatedParticipants.push({id:auth.currentUser.uid,step:step,rank:0,paid:false})
        const docReferance = doc(firestore,'challanges',id);
        await updateDoc(docReferance,{
         participants:updatedParticipants,
        })
    } catch (error) {
        console.error(error)
    }
}


export const createChallenge = async (data)=>{
    try {
    const uid = uuidv4()
    const challengeRef = doc(firestore,"challanges",uid)
    const response = await setDoc(challengeRef,{
        ...data,id:uid
    })
    return response
    } catch (error) {
        console.error(error)
    }
}