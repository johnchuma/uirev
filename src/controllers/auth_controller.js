import {setDoc,doc, getDoc,orderBy, addDoc,where, collection, getDocs,query, Timestamp, updateDoc} from 'firebase/firestore';
import { auth, firestore, storage } from './firebase';
import {  signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ref } from 'firebase/storage';

export const googleSignIn = async()=>{
    try {
    const provider = new GoogleAuthProvider();

    const response= await signInWithPopup(auth,provider);
    const user   = response.user;
    const uid = user.uid;
    const data = {
        'id':uid,
        'name':user.displayName,
        'email':user.email,
        'photoURL':user.photoURL,
        'verified':false,
        'testStatus':'not-submitted',
        'testprojectid':'',
        'skills':[],
        'step':0,
        'provider':'google',
        'timestamp':new Date(),
        'accountType':'user',
        'paypalAccount':"",
        'challangesWon':[],
        'likedDesigns':[]
        
    }
    const documentReferance = doc(firestore,'users',uid);
    const userDocumentSnapshot =  await getDoc(documentReferance)
    if(!userDocumentSnapshot.exists()){
        await setDoc(documentReferance,{...data})
    }
    
    return await findUser(response.user);
    } catch (error) {
        console.log("Failed to login",error)
    }
    
}
export const findUser = async(usr=auth.currentUser)=>{
    try {
        const user = await getDoc(doc(firestore,'users',usr.uid));
        if(user.exists()){
         return user.data();
        }
    } catch (error) {
     console.log(error)
    }
 }

export const updatePaypalAccountInfo = async(account)=>{
    try {
        console.log(account)
        const docRef = doc(firestore,'users',auth.currentUser.uid)
        
        await updateDoc(docRef,{
            paypalAccount:account
        })
        const response = await findUser();
        return response;
    } catch (error) {
        console.log(error)
    }
}
export const logOut = async()=>{
    try {
        const response = await signOut(auth) 
    } catch (error) {
        console.log("Signed out successfully")
    }
}

