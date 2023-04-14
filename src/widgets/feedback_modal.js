import React, { useEffect, useState } from 'react'
import { Col, Image, Modal, Row, Stack } from 'react-bootstrap'
import { MdClose } from 'react-icons/md'
import { backgroundColor, mutedBackground, mutedText, randomColor, secondaryColor, textColor, vibrantColors } from '../utils/color_pallate'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { getDesignFeedbacks } from '../controllers/review_controller'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Paragraph from './paragraph'

const FeebackModal = ({show,onHide,selectedDesign}) => {
   const [feedback, setFeedback] = useState([]);
   const [selected, setSelected] = useState(null);
   


   useEffect(() => {
    show && getDesignFeedbacks(selectedDesign.id).then((value)=>{
        setFeedback(value)
     })
   }, [show]);
    return (
        <Modal centered  className='my-review-modal' size='xl' show={show} onHide={()=>{ onHide(); setSelected(null)}}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Design review</Modal.Title>
                <MdClose onClick={()=>{ onHide(); setSelected(null)}} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body style={{height:"80vh"}}>
            <Row>
                <Col md="5">
                <Image className='me-5' src={selectedDesign && selectedDesign.downloadUrl}  style={{borderRadius:"10px", width:"95%",objectFit:'contain'}} fluid/>
                </Col>
                <Col >
                <Modal.Title className='mb-4' style={{fontSize:14,color:textColor}}>🎨 Features review Feedback 
                </Modal.Title>
                
                
                {
                  selected != null? <div className='btn text-start px-3 py-3 mt-0 w-100 position-relative' style={{borderColor:"#ffffff20", borderRadius:10}}>
                    <div onClick={()=>setSelected(null)} className='d-flex justify-content-between  px-0 py-0 mb-0 btn' >
                  <div style={{fontSize:12,color:textColor,fontWeight:500}}>{feedback[selected].type}</div>
                  <BsChevronUp color="#ffffff" onClick={()=>setSelected(null)} />
                 </div>
                 <Row className='mt-2 position-relative'>
                    <Col md={8}>
                        <Paragraph text={feedback[selected].review}/>
                    </Col>
                    <Col>
                    <div style={{ width: "90%", height: '100px' }}>
      <CircularProgressbar
        value={feedback[selected].percent}
        text={`${feedback[selected].percent}%`}
        className="progress-animation position-relative"
        strokeWidth={10}
        styles={{
          path: {
            stroke: vibrantColors[selected],
            strokeLinecap: 'butt',
            transition: 'stroke-dashoffset 3s ease 5s',
          },
          trail: {
            stroke: '#d6d6d6',
            strokeLinecap: 'butt',
          },

          text: {
            fill: vibrantColors[selected],
            fontSize: '15px',
          },
        }}
      />
    </div>
                    </Col>
                 </Row>
                  </div>
                  :
                  feedback.map((item,index)=>{
                    return selected == null && <div onClick={()=>setSelected(index)} className='d-flex justify-content-between  px-3 py-2 mb-2 btn' style={{borderColor:"#ffffff20", borderRadius:5}}>
                    <div style={{fontSize:10,color:"#ffffff",fontWeight:300}}>{item.type}</div>
                    <BsChevronDown color="#ffffff50" />
                   </div>
                    
                   
                    
                   })
                }
               
                </Col>
            </Row>
        </Modal.Body>
        </Modal>
    )
}

export default FeebackModal
