import React, { useRef, useState } from 'react'
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
import { CreateBlog } from '../controllers/blog_controller';

const CreateBlogModal = ({show,onHide}) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [showRequirementModal, setshowRequirementModal] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [requirement, setRequirement] = useState("");
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    // const editorRef = useRef(null);
   

    function handleSubmit() {
        setLoading(true)
        const data = {title:name,content,createdAt:new Date()}
        CreateBlog(data,file).then(()=>{
            setLoading(false)
            onHide()
        })
    }
  
  
    return (
        <Modal centered  className='my-modal' size='xl' show={show} onHide={onHide}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Create new blog</Modal.Title>
                <MdClose onClick={onHide} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
           <Form>
            <Form.Group>
                <Paragraph text={`Blog title`}/>
                <Form.Control onChange={(e)=>setName(e.target.value)} required  placeholder='Create blog title' style={formStyles} />
            </Form.Group>
            <Form.Group>
                <Paragraph text={`Blog image`}/>
                <Form.Control className='px-4' type='file' onChange={(e)=>setFile(e.target.files[0])} required  style={formStyles} />
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
            
            <Button onClick={handleSubmit}  className='border-0 mt-3 w-100 py-3  '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
               {  
               loading ?<Spinner size='sm'/>:'Create blog' 
               } 
          </Button>
          
           </Form>
           <Modal centered  className='my-modal' size='md' show={showRequirementModal} onHide={()=>setshowRequirementModal(false)}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Create new challenge</Modal.Title>
                <MdClose onClick={()=>setshowRequirementModal(false)} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
        <Form.Group>
            <Paragraph text={`New requirement`}/>
            <Form.Control as={`textarea`} onChange={(e)=>setRequirement(e.target.value)} required  placeholder='Add requirement' style={formStyles} />
            </Form.Group>
             <CustomButton onClick={()=>{
                let newRequirements = requirements
                 newRequirements.push(requirement)
                setRequirements(newRequirements)
                setRequirement("")
                setshowRequirementModal(false)
             }}  className={`w-100 py-3 mt-2`} text={`Add`}/>
            </Modal.Body>
            </Modal>
        </Modal.Body>

        </Modal>
    )
}

export default CreateBlogModal
