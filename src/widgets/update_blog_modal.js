import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Modal, Spinner, Stack } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate';
import Heading from './heading';
import { formStyles } from '../utils/styles';
import Paragraph from './paragraph';
import 'react-datetime/css/react-datetime.css';
import CustomButton from './button';
import { createChallenge } from '../controllers/challenge_controller';
import { textSize } from '../utils/font_size';
import moment from 'moment/moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CreateBlog, deleteBlog, updateBlog } from '../controllers/blog_controller';

const UpdateBlogModal = ({show,onHide,blog}) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
  useEffect(() => {
    if(blog){
        setContent(blog.content)
        setName(blog.title)
  console.log(blog.createdAt)

    }
  
  }, [show]);
   

    const update =() =>{
        setLoading(true)
        const data = {content,title:name}
        updateBlog(blog,data).then(()=>{
            setLoading(false)
            onHide()
        })
    }
    const removeBlog = ()=>{
        setLoading(true)
        deleteBlog(blog).then(()=>{
            setLoading(false)
            onHide()
        })
    }
  
    return (
        <Modal centered  className='my-modal' size='xl' show={show} onHide={onHide}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Update blog content </Modal.Title>
                <MdClose onClick={onHide} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
           <Form>
           <Form.Group>
                <Paragraph text={`Blog title`}/>
                <Form.Control value={name} onChange={(e)=>setName(e.target.value)} required  placeholder='Create blog title' style={formStyles} />
            </Form.Group>
            <Form.Group>
                <Paragraph text={`Blog content`}/>
                <Form.Control
                    as={ReactQuill}
                    className='border-0 mt-0 pt-0 px-0'
                    value={content}
                    onChange={setContent}
                    style={formStyles}
                    />
            </Form.Group>
            <Stack direction='horizontal'>
            <Button onClick={update}  className='border-0 mt-3 w-100 py-3  '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
               {  
               loading ?<Spinner size='sm'/>:'Update blog' 
               } 
          </Button>
          
            <Heading size={12} onClick={removeBlog} text={`Delete`} className={`ms-3 mt-3 btn p-0 m-0`} color={`red`}/>

            </Stack>
           
           </Form>
          
        </Modal.Body>

        </Modal>
    )
}

export default UpdateBlogModal
