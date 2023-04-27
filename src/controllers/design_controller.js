import {setDoc,doc, getDoc,orderBy, addDoc,where, collection, getDocs,query, Timestamp} from 'firebase/firestore';
import { auth, firestore, storage } from './firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4 as uuidv4} from 'uuid'


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
export const findChallengeUserDesigns = async(challangeId)=>{
    try {
        const designs = []
        const qr = query(collection(firestore,'designs'),where('challangeId','==',challangeId))
        const snapshots = await getDocs(qr)
        snapshots.forEach((snapshot)=>{
            designs.push(snapshot.data())
            // console.log(snapshot.data())
        });
        return designs
    } catch (error) {
        console.error(error)
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
export const uploadDesign = async(file,data,challangeId=null)=>{
    try {
        // const {challangeId} = others
        const uid = uuidv4()
        //uploading to firebae
        const referance = ref(storage,`designs/${file.name}`);
        console.log(referance);
        console.log(file)
       const fileUploadResponse = await uploadBytes(referance,file);
        const downloadUrl = await getDownloadURL(referance)
        //Storing designs details to firestore
    const response = await setDoc(doc(firestore,'designs',uid),{
            userID : auth.currentUser.uid,
            id:uid,
            payment:'paid',
            downloadUrl,
            inReview:true,
            challangeId:challangeId,
            likes:0,
            timestamp:new Date(),
            feedback:[],
            ...data
        })
    return response;

    } catch (error) {
        console.log(error)
    }
}


