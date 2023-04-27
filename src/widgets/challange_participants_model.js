import React, { useState } from 'react'
import { Col, Image, Modal, Row, Stack } from 'react-bootstrap';
import { textColor } from '../utils/color_pallate';
import { MdClose } from 'react-icons/md';
import Heading from './heading';
import Paragraph from './paragraph';
import FeebackModal from './feedback_modal';

const ChallengeParticipantsModel = ({show,onHide,users}) => {
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);

    return (
        <Modal centered  className='my-modal' size='xl' show={show} onHide={()=>{ onHide()}}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Challenge participants designs</Modal.Title>
                <MdClose onClick={()=>{ onHide();}} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
            <Row>
               {users.map((user)=>{
                 return <Col md={4}>
                  <Image style={{borderRadius:10}} onClick={()=>{
                    setShowFeedbackModal(true);
                    setSelectedDesign(user.design)
                    // onHide();
                  }} fluid src={user.design.downloadUrl}/>
                  <Stack className='mt-2 d-flex align-items-center' direction='horizontal'>
                  <Image src={user.photoURL}  className='rounded-circle ' style={{height:30, width:30,backgroundSize:'cover',objectFit:'cover'}}/>
                   <Paragraph  className="ms-2 mt-2" text={user.name}/>
                  </Stack>
                  </Col>
                })}
            </Row>
            <FeebackModal show={showFeedbackModal} selectedDesign={selectedDesign} onHide={()=>setShowFeedbackModal(false)}/>

        </Modal.Body>
        </Modal>
    )
}

export default ChallengeParticipantsModel
