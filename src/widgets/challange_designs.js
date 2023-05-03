import React, { useEffect, useState } from 'react'
import { Button, Col, Image, Modal, Row, Spinner, Stack } from 'react-bootstrap'
import { cardColor, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import { findChallengeUserDesigns, findChallengeUserDesignsWithFeedback } from '../controllers/design_controller';
import { MdClose } from 'react-icons/md';
import WriteReviewModal from './write_review_modal';
import Heading from './heading';
import { textSize } from '../utils/font_size';
import { rankChallengeParticipants } from '../controllers/expert_controller';
import OutlinedButton from './outlined_button';
import CustomButton from './button';

const ChallengeDesigns = ({show,onHide,setRefresh,refresh,challenge}) => {
      const [designs, setDesigns] = useState([]);
      const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
      const [uploading, setUploading] = useState(false);
    //   const [refresh, setRefresh] = useState(false);
      const [selectedDesign, setSelectedDesign] = useState(null);

      

    useEffect(() => {
        if(challenge){
            if(showWriteReviewModal == false){
                findChallengeUserDesignsWithFeedback(challenge.id).then((designs)=>{
                    setDesigns(designs)
                  })
            }
        }
    
    }, [show,showWriteReviewModal,refresh]);
    const rankDesigns = () => {
        setUploading(true)
        const sortedDesigns = designs.sort((a, b) => {
          const sumPercentA = a.feedbackDetails.reduce((acc, feedback) => acc + feedback.percent, 0);
          const sumPercentB = b.feedbackDetails.reduce((acc, feedback) => acc + feedback.percent, 0);
          return sumPercentB - sumPercentA;
        });
        let orderedParticipants = []
        sortedDesigns.map(design=>{
          challenge.participants.forEach((participant,index) => {
             if(design.userID === participant.id){
                orderedParticipants.push({...participant,rank:index+1})
             }
          });
        })
         rankChallengeParticipants(orderedParticipants,challenge.id).then((value)=>{
            setUploading(false)
            setRefresh(refresh+1)
         })
      }
      const getSortedDesigns = ()=>{
        const sortedDesigns = designs.sort((a, b) => {
          const sumPercentA = a.feedbackDetails.reduce((acc, feedback) => acc + feedback.percent, 0);
          const sumPercentB = b.feedbackDetails.reduce((acc, feedback) => acc + feedback.percent, 0);
          return sumPercentB - sumPercentA;
        });
        return sortedDesigns
      }
  
     const getDesignPosition = (design)=>{
        let position = 0;
        challenge.participants.forEach(participant => {
            if(participant.id === design.userID){
              position = participant.rank
            }
        });
        
        return position
     }
     const findSum = (design)=>{
        let sum = 0;
        design.feedbackDetails.map((feedback)=>sum= sum+feedback.percent);
        return sum
     }
    return (
        <Modal centered  className='my-modal' size='xl' show={show} onHide={onHide}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>Submitted designs for the challenge</Modal.Title>
                <MdClose onClick={onHide} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
            <Row>
               {
                getSortedDesigns().map((design)=>{
                    return <Col md={3} >
                        <div className='w-100' style={{position:'relative'}}>
                        <Image className='' style={{objectFit:'cover',height:200}} onClick={()=>{
                             setSelectedDesign(design)
                             setShowWriteReviewModal(true)
                        }} src={design.downloadUrl} fluid/>

                       {
                       design.inReview == false&& <div className='d-flex  w-100 h-100 p-2 justify-content-end align-items-end' style={{position:'absolute',top:0,left:0}}>
                        <div className={`d-flex justify-content-center align-items-center `} style={{height:40,width:40,backgroundColor:cardColor,borderRadius:50}}>
                            <Heading className={`m-0 p-0`} text={getDesignPosition(design)}/>
                        </div>
                        </div>
                       }
                        </div>
                       
                    </Col>
                })
               }
            </Row>
            <br/>
            <br/>

        {
           challenge && challenge.closed===true?<CustomButton onClick={onHide}  className={`w-100 py-3 border-0`} text={`Oky`}/>: <Button onClick={rankDesigns} className='border-0 mt-5 py-3 mt-auto w-100 '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
            {  
            uploading ?<Spinner size='sm'/>:'Rank participants' 
            } 
       </Button>
        }   
        </Modal.Body>
        <WriteReviewModal  setRefresh={setRefresh}  showModal={showWriteReviewModal} onHide={()=>setShowWriteReviewModal(false)} selectedDesign={selectedDesign} />
        </Modal>
    )
}

export default ChallengeDesigns
