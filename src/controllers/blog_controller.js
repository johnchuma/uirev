import {setDoc,doc, getDocs, collection, deleteDoc, updateDoc} from 'firebase/firestore';
import {firestore, storage } from './firebase';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {v4 as uuidv4} from 'uuid'

export const CreateBlog = async(data,file)=>{
    try {
        const uid = uuidv4()
        const referance = ref(storage,`designs/${file.name}`);
        await uploadBytes(referance,file);
        const downloadUrl = await getDownloadURL(referance)
        const response = await setDoc(doc(firestore,'blogs',uid),{
                id:uid,
                image:downloadUrl,
                ...data
            })
            return response
    } catch (error) {
        console.error(error)
    }
}

export const getBlogs = async()=>{
  try {
    const response = await getDocs(collection(firestore,'blogs'))
    let blogs = []
    response.forEach((item)=>{
      blogs.push(item.data())
    })
    return blogs
  } catch (error) {
    console.error(error)
  }
}
export const updateBlog = async(blog,content)=>{
  try {
    const blogRef = doc(firestore,'blogs',blog.id)
    await updateDoc(blogRef,{
      ...content
    })
  } catch (error) {
    console.error(error)
  }
}
export const deleteBlog = async(blog)=>{
  try {
    const blogRef = doc(firestore,'blogs',blog.id)
    await deleteDoc(blogRef)
  } catch (error) {
    console.error(error)
  }
}