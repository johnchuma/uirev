
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Image, Modal, Row, Stack } from 'react-bootstrap'
import Heading from '../widgets/heading'
import { cardColor, mutedBackground, mutedText, primaryColor, secondaryColor, textColor, vibrantColors } from '../utils/color_pallate'
import Paragraph from '../widgets/paragraph'
import CustomButton from '../widgets/button'
import Lottie from 'lottie-web'
import { getChallenges, joinChallenge } from '../controllers/challenge_controller'
import { MdClose } from 'react-icons/md'
import { AuthContext } from '../providers/auth_provider'
import OutlinedButton from '../widgets/outlined_button'
import { BsCheck, BsCheck2, BsCheck2All, BsCheckAll, BsClock, BsPeople } from 'react-icons/bs'

const ChallangeCard = ({challenge,index,challenges,refresh,setRefresh}) => {
    const [showChallangeModal, setShowChallangeModal] = useState(false);
    const {user} = useContext(AuthContext)
    const selectedChallange = challenges[index]
    const checkIfUserJoined = challenge.participants.includes(user.id);
    const currentTime = new Date();
    const startTime = challenge.startTime.toDate();
    const endTime = challenge.endTime.toDate();
    const timeRemaining = startTime - currentTime;
    const timeRemaining2 = endTime - currentTime;
    const [currentStep, setCurrentStep] = useState(0);
    const [remainingTime, setRemainingTime] = useState(timeRemaining);
    const [remainingTime2, setRemainingTime2] = useState(timeRemaining2);

    // console.log(timeRemaining2)
    useEffect(() => {
    const interval = setInterval(() => {
    setRemainingTime(remainingTime - 1000);
    setRemainingTime2(remainingTime2 - 1000);


    }, 1000);

    return () => clearInterval(interval);
    }, [remainingTime]);
    const getTimeRemained = (time)=>{
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return {days,hours,minutes,seconds}
    }
    const beforeStarting = `${getTimeRemained(remainingTime).hours}hours : ${getTimeRemained(remainingTime).minutes}minutues : ${getTimeRemained(remainingTime).seconds}seconds before submission`;
    const beforeSubmission =`${getTimeRemained(remainingTime2).hours}hr : ${getTimeRemained(remainingTime2).minutes}min : ${getTimeRemained(remainingTime2).seconds}sec`;
    return (
        <div style={{backgroundColor:mutedBackground,borderRadius:20}} className='p-5'>
            {/* <div style={{height:130,backgroundColor:secondaryColor,borderRadius:20}}>
                <div ref={challangeAnimationController} style={{height:130}}></div>
            </div> */}
            <Heading size={13} fontWeight={400} className="mt-3" text={`Challange: ${challenge.name}`}/>
             <Stack direction='horizontal' >
                <BsPeople color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={challenge.participants.length+ '+ joined'}/></div>
             </Stack>
             <Stack direction='horizontal' >
                <BsClock color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={'Deadline: '+beforeSubmission}/></div>
             </Stack>
             <Stack direction='horizontal' >
                <BsCheck2All color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={'0 submitted designs'}/></div>
             </Stack>
            {/* <Paragraph text={challenge.description} /> */}
          {
            checkIfUserJoined? getTimeRemained(timeRemaining).seconds<0? <CustomButton
            onClick={()=>{setShowChallangeModal(true)
               // setSelectedChallange(index)
               }} 
               className="mt-4 border-0 w-100" text="Submit design"/>:<OutlinedButton className="w-100 mt-4 " 
            onClick={()=>{setShowChallangeModal(true)
                // setSelectedChallange(index)
                }} 
            text="Joined challange"/>  :<CustomButton
             onClick={()=>{setShowChallangeModal(true)
                // setSelectedChallange(index)
                }} 
                className="mt-4 border-0 w-100" text="Join challenge"/>
          }  
          <Modal className='my-modal' size='xl' show={showChallangeModal} onHide={()=>setShowChallangeModal(false)}>
            <Modal.Header  className='border-0 px-5' closeLabel='close'>
            <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                    <Modal.Title style={{fontSize:15,color:textColor}}>{selectedChallange != null &&'Challange: '+ selectedChallange.name}</Modal.Title>
                    <MdClose onClick={()=>setShowChallangeModal(false)} size={20} color='white'/>
                    </Stack>
            </Modal.Header>
        <Modal.Body className='px-5'>
            <Row>
            {
                 [{title:"Joining challange"},{title:"Designing stage"},{title:"Submitting and voting"}].map((item,index)=>{
                return <Col className='px-0 mb-3'>
                    <Stack direction='horizontal' style={{display:"flex",alignItems:"center"}} >
                    <div  style={{height:50,width:50,borderColor:currentStep>=index?secondaryColor:mutedText,borderWidth:2,borderStyle:"solid"}} className='rounded-circle d-flex justify-content-center align-items-center mt-4'>
                          <Heading className="p-0 m-0" fontWeight={400} color={currentStep>=index?secondaryColor:mutedText} size={15} text={index+1}/>
                    </div>
                    <div style={{flex:1}}>
                    <Heading className="p-0 m-0  text-center" fontWeight={400}  color={currentStep>=index?secondaryColor:mutedText} size={12} text={item.title}/>
                    <div style={{height:3, backgroundColor:currentStep>=index?secondaryColor:mutedText}} className=' rounded-circle mt-2'></div>
                    </div>
                    </Stack> 
                </Col>

                 })   
                }

            </Row>
            {
                currentStep == 0 ? <div>
                <Heading size={12}  className="mt-3" text="About challange"/>
                
                <Paragraph text={selectedChallange != null &&selectedChallange.description}/>
                <Heading size={12}  className="mt-3" text="Challange requirements"/>
                <ul>
                    {selectedChallange != null &&selectedChallange.requirements.map((requirement)=>{
                        return  <li style={{color:secondaryColor}}> <Paragraph text={requirement}/></li>
                    })}
                </ul>
                <Stack direction='horizontal' className='d-flex justify-content-between'>
                <Heading size={12} className="mt-3 mb-3" text="Joined users"/>
                <Heading size={12} className="mt-3 mb-3" text={selectedChallange != null &&selectedChallange.participantsInfo.length}/>
    
                </Stack>
                <Row>
                    {selectedChallange != null && selectedChallange.participantsInfo.map((usr)=>{
                        return  <Col md="1 text-center">
                        <Image src={usr.photoURL} className='rounded-circle' style={{height:50,width:50}}/>
                        <Paragraph size={12} className="mt-1" text={usr.name.split(" ")[0]}/>
                    </Col>
                    })}
                    
                </Row>
                </div>:<div>
                <Stack direction='horizontal' className='d-flex justify-content-between'>
                <Heading size={12} className="mt-3 mb-3" text="Challenge participants designers"/>
                <Heading size={12} className="mt-3 mb-3" text={selectedChallange != null &&selectedChallange.participantsInfo.length}/>
    
                </Stack>
                <Row>
                    {selectedChallange != null && selectedChallange.participantsInfo.map((usr)=>{
                        return  <Col md="1 text-center">
                        <Image src={usr.photoURL} className='rounded-circle' style={{height:50,width:50}}/>
                        <Paragraph size={12} className="mt-1 mb-0 pb-0" text={usr.name.split(" ")[0]}/>
                        <Paragraph size={10} color={secondaryColor} className="m-0 p-0" text="Designing"/>

                    </Col>
                    })}
                    
                </Row>
                </div>
            }
            
            
        
          {
            selectedChallange != null ?
            <Stack direction='horizontal'>
                {currentStep >0 && <Heading text="Prev" size={12} color={primaryColor} onClick={()=>{
                    const backStep = currentStep -1;
                    setCurrentStep(backStep)}
                    } className="mt-4 me-5 btn"/>}
                 
                    {
                     currentStep == 1?remainingTime2 > 0 ?  
                     <OutlinedButton borderColor={mutedText} className="w-100 mt-4" text={'Keep designing, submissions will start in '+ beforeSubmission}/>:
                     <CustomButton onClick={()=>setCurrentStep(1)}  className="mt-4 border-0 w-100" text={`Upload design`}/>:
                    <CustomButton onClick={()=>setCurrentStep(1)}  className="mt-4 border-0 w-100" text={`Next`}/>

                    }
            </Stack>:
              <CustomButton onClick={()=>{
                joinChallenge(selectedChallange.id)
                let number = refresh+1;
                setRefresh(number)
                }} className="mt-4 border-0 w-100" text="Join challenge"/>
         
        }
             
        </Modal.Body>
       </Modal>
        </div>
        
    )
}

export default ChallangeCard
