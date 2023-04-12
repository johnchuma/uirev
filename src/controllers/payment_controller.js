import {v4 as uuidv4} from 'uuid'
import { auth, firestore } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export const storePaymentInfo = async()=>{
const uid = uuidv4();
const documentReferance = doc(firestore,'payments',uid);
const response = await setDoc(documentReferance,{
    id:uid,
    timstamp:new Date(),
    status:"COMPLETED",
    userID:auth.currentUser.uid,
    amount:1
})

}