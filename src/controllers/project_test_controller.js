import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, firestore } from "./firebase";

export const getTestProject = async(id)=>{
    try {
        let project ;
        if(id != ""){
           const response = await getDoc(doc(firestore,'testprojects',id))
           project = response.data()
        }
        else{
            const snapshots =await getDocs(collection(firestore,'testprojects'));
            const randomProjectNumber = Math.floor(Math.random()* snapshots.size)
            project = snapshots.docs[randomProjectNumber].data()
            await updateDoc(doc(firestore,'users',auth.currentUser.uid),{
               testprojectid:project.id
            })
        }
       
        return project;
    } catch (error) {
        console.log(error)
    }
}
