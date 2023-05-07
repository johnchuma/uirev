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
        });
        return designs
    } catch (error) {
        console.error(error)
    }
}
export const findChallengeUserDesignsWithFeedback = async(challangeId)=>{
    try {
        const qr = query(collection(firestore,'designs'),where('challangeId','==',challangeId))
        const ChallengeSnapshots = await getDocs(qr)
          const designs = await Promise.all(ChallengeSnapshots.docs.map(async (snapshot)=>{
            const design = snapshot.data()
            const feedbacks = await Promise.all(design.feedback.map(async(value)=>{
            const feedbackSnapshot = await getDoc(doc(firestore,'feedback',value))
            return feedbackSnapshot.data()
            }))
            return {...design,feedbackDetails:feedbacks}
          }))
        return designs
    } catch (error) {
        console.error(error)
    }
}

export const getAllUserDesigns = async()=>{
    try{
        const qr = query(collection(firestore,'designs'),where('inReview','==',true));
        const querySnapshots = await getDocs(qr);
        const designsByUser = querySnapshots.docs.reduce(async (acc, snapshot) => {
            const design = snapshot.data();
            const userRef = doc(firestore,'users',design.userID);
            const user = await getDoc(userRef);
            const existingDesigns = (await acc) || [];
            const userDesigns = existingDesigns.find((userDesigns) => userDesigns.id === user.id)?.designs || [];
            return [...existingDesigns.filter((userDesigns) => userDesigns.id !== user.id), { id: user.id, ...user.data(), designs: [...userDesigns, design] }]
        }, []);

return designsByUser;
    }
    catch (error){
         console.error(error)
    }
}
export const uploadDesign = async(file,data,challangeId="")=>{
    try {
    const uid = uuidv4()
    const referance = ref(storage,`designs/${file.name}`);
    const fileUploadResponse = await uploadBytes(referance,file);
    const downloadUrl = await getDownloadURL(referance)
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


