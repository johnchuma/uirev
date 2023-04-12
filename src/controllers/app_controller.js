import {setDoc,doc, getDoc,orderBy, addDoc,where, collection, getDocs,query, Timestamp} from 'firebase/firestore';
import { auth, firestore, storage } from './firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {  signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import {v4 as uuidv4} from 'uuid'
import { useRedirect } from '../utils/redirect';

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
        'provider':'google',
        'timestamp':new Date(),
        'accountType':'user',
        
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
export const getDesigns = async()=>{
    try {
        const designs = [];
        const q = query(collection(firestore,'designs'),where('userID', '==',auth.currentUser.uid),orderBy("timestamp","desc"));
        const snapshots =await getDocs(q);
        snapshots.forEach((snapshot)=>{
            designs.push(snapshot.data())
            // console.log(snapshot.data())
        });
        console.log(snapshots)
        return designs;
    } catch (error) {
        console.log(error)
    }
}
export const findUser = async(usr)=>{
   try {
       const user = await getDoc(doc(firestore,'users',usr.uid));
       if(user.exists()){
        return user.data();
       }
   } catch (error) {
    
   }
}
export const getAllUserDesigns = async()=>{
    try{
          const designs = [];
          const qr = query(collection(firestore,'designs'),where('inReview','==',true))
          const response = await getDocs(qr)
          
          response.forEach((res)=>{
            designs.push(res.data());
          })
         return designs
    }
    catch (error){
         console.log(error)
    }
}
export const uploadDesign = async(file,data,user)=>{
    try {
        const uid = uuidv4()
        //uploading to firebae
        const referance = ref(storage,`designs/${file.name}`);
        console.log(referance);
        console.log(file)
       const fileUploadResponse = await uploadBytes(referance,file);
        const downloadUrl = await getDownloadURL(referance)
        //Storing designs details to firestore
    const response = await setDoc(doc(firestore,'designs',uid),{
            userID : user.uid,
            id:uid,
            payment:'paid',
            downloadUrl,
            inReview:true,
            timestamp:new Date(),
            feedback:[],
            ...data
        })
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