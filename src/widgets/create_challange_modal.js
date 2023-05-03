import React, { useState } from 'react'
import { Button, Form, Modal, Spinner, Stack } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate';
import Heading from './heading';
import { formStyles } from '../utils/styles';
import Paragraph from './paragraph';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import CustomButton from './button';
import { createChallenge } from '../controllers/challenge_controller';
import { textSize } from '../utils/font_size';
import moment from 'moment/moment';
import { firestore } from '../controllers/firebase';

const CreateChallengeModal = ({show,onHide}) => {
    const [startingTime, setStartingTime] = useState(null);
    const [endingTime, setEndingTime] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescriptions] = useState("");
    const [showRequirementModal, setshowRequirementModal] = useState(false);
    const [requirements, setRequirements] = useState([]);
    const [requirement, setRequirement] = useState("");
    const [Loading, setLoading] = useState(false);



    function handleSubmit() {
      
      const data = {
        name,description,startTime:moment(startingTime).toDate(),endTime:moment(endingTime).toDate(),requirements,participants:[],closed:false
      }
     setLoading(true)
     createChallenge(data).then((value)=>{
        setLoading(false)
        onHide()
     })

    }
  
    function handleDatetimeChange(moment,setTime) {
      setTime(moment.utc().format());
    }
    return (
        <Modal centered  className='my-modal' size='lg' show={show} onHide={onHide}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Create new challenge</Modal.Title>
                <MdClose onClick={onHide} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
           <Form>
            <Form.Group>
                <Paragraph text={`Challenge name`}/>
                <Form.Control onChange={(e)=>setName(e.target.value)} required  placeholder='Write challenge name' style={formStyles} />
            </Form.Group>
            <Form.Group>
                <Paragraph text={`Challenge description`}/>
                <Form.Control onChange={(e)=>setDescriptions(e.target.value)} required  as={`textarea`}  placeholder='Write description' style={formStyles} />
            </Form.Group>
            <Form.Group>
                <Paragraph text={`Set starting time`}/>
                <Datetime  inputProps={{style:{...formStyles},placeholder:"Set challenge starting datetime"}} onChange={(moment)=>handleDatetimeChange(moment,setStartingTime)} />
            </Form.Group>
            <Form.Group>
                <Paragraph text={`Set ending time`}/>
                <Datetime  inputProps={{style:{...formStyles},placeholder:"Set challenge ending datetime"}} onChange={(moment)=>handleDatetimeChange(moment,setEndingTime)} />
            </Form.Group>
            <Form.Group>
                <Stack direction='horizontal' className='d-flex justify-content-between'>
                <Paragraph text={`Challenge requirements`}/>
                 <Heading size={12} color={primaryColor} onClick={()=>setshowRequirementModal(true)} className="btn p-0 m-0" text={ `Add requirements`}/>
                </Stack>
                <ol >
                    {requirements.map(item=><li style={{color:mutedText,fontSize:12}}><Paragraph className={`m-0 p-0`} text={item}/></li>)}
                </ol>
            </Form.Group>
            <Button onClick={handleSubmit}  className='border-0 mt-3 w-100 py-3  '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
               {  
               Loading ?<Spinner size='sm'/>:'Create Challenge' 
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
             <CustomButton  onClick={()=>{
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

export default CreateChallengeModal
