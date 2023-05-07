
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Container, FloatingLabel, Form, FormControl, Image, Modal, Row, Spinner, Stack } from 'react-bootstrap'
import Heading from '../widgets/heading'
import { backgroundColor, cardColor, completeColor, mutedBackground, mutedText, primaryColor, randomColor, secondaryColor, textColor, vibrantColors, waitingColor } from '../utils/color_pallate'
import Paragraph from '../widgets/paragraph'
import CustomButton from '../widgets/button'
import Lottie from 'lottie-web'
import { getChallenges, joinChallenge } from '../controllers/challenge_controller'
import { MdClose } from 'react-icons/md'
import { FaPeopleCarry, FaTrophy } from 'react-icons/fa'

import { AuthContext } from '../providers/auth_provider'
import OutlinedButton from '../widgets/outlined_button'
import { BsAward, BsCheck, BsCheck2, BsCheck2All, BsCheckAll, BsClock, BsClockFill, BsPeople } from 'react-icons/bs'
import DesignUploadModal from './design_upload_modal'
import ErrorToast from '../utils/toasts'
import { auth } from '../controllers/firebase'
import { findChallengeUserDesigns } from '../controllers/design_controller'
import { updatePaypalAccountInfo } from '../controllers/auth_controller'
import FeebackModal from './feedback_modal'
import ChallengeParticipantsModel from './challange_participants_model'
import { textSize } from '../utils/font_size'

const ChallangeCard = ({challenge,index,challenges,refresh,setRefresh,setShowToast}) => {
    const [showChallangeModal, setShowChallangeModal] = useState(false);
    const {user,setUser} = useContext(AuthContext)
    const selectedChallange = challenges[index]
    const checkIfUserJoined = ()=>{
        let check = false;
        challenge.participants.forEach(element => {
            if(element.id == user.id){
                check = true
            }
        });
        return check;
    };
    const checkIfToShowChallenge  = ()=>{
        let check = true;
        if(timeRemaining2 <0 && !checkIfUserJoined()){
             check = false;
        }
        return check;
    }
    const checkUserRank  = (id = user.id)=>{
        let rank = 0;
        challenge.participants.forEach(element => {
            if(element.id == id){
               rank = element.rank
            }
        });
        return rank;
    }
    const getStep = ()=>{
        let step = 0;
        challenge.participants.forEach(element => {
            if(element.id == user.id){
                step = element.step
            }
        });
        return step;
    };
    const currentTime = new Date();
    const startTime = challenge.startTime.toDate();
    const endTime = challenge.endTime.toDate();
    const timeRemaining = startTime - currentTime;
    const timeRemaining2 = endTime - currentTime;
    const [currentStep, setCurrentStep] = useState(0);
    const [remainingTime, setRemainingTime] = useState(timeRemaining);
    const [remainingTime2, setRemainingTime2] = useState(timeRemaining2);
    const [show, setShow] = useState(false);
    const [isMounted, setIsMounted] = useState(0);

    // const [showToast, setShowToast] = useState(false);
  
    // console.log(timeRemaining2)
    const animationController = useRef(null)
    useEffect(() => {
        if(isMounted >0){
            if(show == true){
                setShowChallangeModal(false)
             }
             else{
                setShowChallangeModal(true)
             }
        }
        
    }, [show]);
   
    useEffect(() => {
        setCurrentStep(getStep())
    }, [refresh]);
    useEffect(() => {
       Lottie.destroy()
       Lottie.loadAnimation({
        container:animationController.current,
        path:"cat-sleeping-on-laptop.json",
        autoplay:true,
        loop:true
       })
    }, [currentStep,refresh,showChallangeModal]);
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
    const afterUpload = ()=>{
        setRefresh(refresh+1)
        setCurrentStep(getStep())
        setShow(false)
    }
    const [showReviewMOdal, setShowReviewMOdal] = useState(false);
    const [paypalAccount, setPaypalAccount] = useState("");
    const [userWithDesigns, setUserWithDesigns] = useState([]);
    useEffect(() => {
        setPaypalAccount(user.paypalAccount)
           if(challenge.closed==true){
            // console.log('Starting')
                findChallengeUserDesigns(challenge.id).then((designs)=>{
                   
                    const newParticipantsInfo = []
                    designs.forEach((design)=>{
                       const participants = challenge.participantsInfo.filter(participant=>participant.id == design.userID)
                       if(participants.length >0){
                       const  participant = {...participants[0],design}
                       newParticipantsInfo.push(participant)
                       }
                    })
                    setUserWithDesigns(newParticipantsInfo)
                }) 
                // console.log(userWithDesigns)
           }       
    }, []);
    const findWinner = ()=>{
        let winner ;
        userWithDesigns.forEach(usr=>{
           const rank = checkUserRank(usr.id)
           if (rank == 1){
              winner = usr
           }
        })
        return winner
    }
    const updateAccount = ()=>{
        console.log(paypalAccount)
        updatePaypalAccountInfo(paypalAccount).then((response)=>{
            // console.log(response)
            setUser(response)
            setPaypalAccount(response.paypalAccount)
            
        })
    }
 
    const [showParticipantsModel, setShowParticipantsModel] = useState(false);   
    const [loading, setLoading] = useState(false);   

    // console.log(findWinner().design)
    const [selectedDesignForFeedbackModal, setSelectedDesignForFeedbackModal] = useState(null);
    // console.log(userWithDesigns.filter((usr=>auth.currentUser.uid == usr.id))[0])
    const submittedDesigns = challenge.participants.filter(participant => participant.step == 2).length;
    // console.log(checkIfUserJoined())
    const beforeStarting = `${getTimeRemained(remainingTime).hours}hr : ${getTimeRemained(remainingTime).minutes}min : ${getTimeRemained(remainingTime).seconds}sec`;
    const beforeSubmission =`${getTimeRemained(remainingTime2).days}days: ${getTimeRemained(remainingTime2).hours}hr : ${getTimeRemained(remainingTime2).minutes}min : ${getTimeRemained(remainingTime2).seconds}sec`;
    return (
        checkIfToShowChallenge()&& <div style={{backgroundColor:cardColor,borderRadius:10}} className='p-5'>

            {/* <div style={{height:130,backgroundColor:secondaryColor,borderRadius:20}}>
                <div ref={challangeAnimationController} style={{height:130}}></div>
            </div> */}
            <Heading size={13} fontWeight={400} className="mt-3 mb-3" text={`Challange: ${challenge.name}`}/>
             <Stack direction='horizontal' >
                <BsPeople color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={challenge.participants.length+ ' joined'}/></div>
             </Stack>
             <Stack direction='horizontal' >
                <BsClock color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={remainingTime>0?'Starting on: '+beforeStarting :remainingTime2>0? 'Deadline: '+beforeSubmission:'Time is over'}/></div>
             </Stack>
             <Stack direction='horizontal' >
                <BsCheck2All color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={submittedDesigns+ ' submitted designs'}/></div>
             </Stack>
            {/* <Paragraph text={challenge.description} /> */}
          {
            checkIfUserJoined()? timeRemaining2>0 && getStep() < 2? <CustomButton
            onClick={()=>{setShowChallangeModal(true)
               // setSelectedChallange(index)
               }} 
               className="mt-4 border-0 w-100" text="Submit design"/>:
               <CustomButton   className="w-100 mt-4 border-0 " 
            onClick={()=>{setShowChallangeModal(true)
                // setSelectedChallange(index)
                }} 
            text="View results"/>  :
            <CustomButton
             onClick={()=>{setShowChallangeModal(true)
                // setSelectedChallange(index)
                }} 
                className="mt-4 border-0 w-100" text="Join challenge"/>
          }  
          <Modal className='my-modal' centered size='xl' show={showChallangeModal} onHide={()=>setShowChallangeModal(false)}>
            <Modal.Header  className='border-0 px-5' closeLabel='close'>
            <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                    <Modal.Title style={{fontSize:15,color:textColor}}>{selectedChallange != null &&'Challenge: '+ selectedChallange.name}</Modal.Title>
                    <MdClose onClick={()=>setShowChallangeModal(false)} size={20} color='white'/>
                    </Stack>
            </Modal.Header>
        <Modal.Body style={{  }} className='px-5'>
            <div>

            <Row>
            {
                 [{title:"Joining challange"},{title:"Designing stage"},{title:"Results"}].map((item,index)=>{
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
                
                
                </div>:currentStep==1?<div>
              {
                 timeRemaining2 <0? getStep() != 2&&<>
                 <Heading size={12} fontWeight={600} color={'red'} className=" pb-1 m-0 " text={`Oops! Time is over`}/>
                 <Paragraph   text={`Unfortunately, the deadline for submissions has passed, and we are no longer accepting entries. We appreciate your interest in participating and hope you will join us in future challenges.`}/>
                 </> :
                 <Stack direction='horizontal' className='mt-3 mb-1'>
                 <BsClock className='' color={'red'}/>   
                 <Heading size={10} fontWeight={400} color={'red'} className=" m-0 ps-2" text={`${beforeSubmission}`}/>
                 </Stack>
             }
                
                <Stack direction='horizontal' className='d-flex justify-content-between'>
                <Heading size={12} className="mt-0 mb-3" text="Challenge participants"/>
                <Heading size={12} className="mt-3 mb-3" text={selectedChallange != null &&selectedChallange.participantsInfo.length}/>
                </Stack>
                <Row>
                    {selectedChallange != null && challenge.participantsInfo.map((usr,index)=>{
                        return  <Col md="1 text-center">
                        <Image src={usr.photoURL} className='rounded-circle' style={{height:50,width:50}}/>
                        <Paragraph size={12} className="mt-1 mb-0 pb-0" text={usr.name.split(" ")[0]}/>
                        {/* <Paragraph size={10} color={index==0?waitingColor:completeColor} className="m-0 p-0" text={index==0?`Designing...`:`Completed`}/> */}
                        </Col>
                    })}
                    
                </Row>
                </div>:<div>

                    {
                        challenge.closed == true?
                        <>
                        <Row className='mt-3'>
                            <Col md={4}>
                            {
                                userWithDesigns.length >0&& <Image style={{borderRadius:10}} src={userWithDesigns.filter((usr=>auth.currentUser.uid == usr.id))[0].design.downloadUrl} fluid />
                            }
                            </Col>
                            <Col>
                              <Heading size={12} text={`Challenge results`}/>
                              <Paragraph text={`Congratulations! Your design results are out. Check them out now and see how you did in the challenge.`}/>
                              <Stack direction='horizontal'>
                                <BsAward color={`yellow`}/> <Paragraph className="m-0 ps-2" text={`Design rank: ${checkUserRank()} / ${userWithDesigns.length}`}/>
                              </Stack>
                              <Stack direction='horizontal'>
                                <FaTrophy color={`cyan`}/> <Paragraph className="m-0 ps-2" text={`Challenge winner: ${findWinner()&&findWinner().name}`}/> <Heading size={12} onClick={()=>{
                                    setSelectedDesignForFeedbackModal(findWinner().design)
                                    setShowReviewMOdal(true)
                                    setShowChallangeModal(false)
                                }} color={primaryColor} className="ms-auto btn p-0" text={`Check`}/>
                              </Stack>
                              <Stack direction='horizontal'>
                                <FaPeopleCarry color={`orange`}/> <Paragraph className="m-0 ps-2" text={`Total participants: ${userWithDesigns.length}`}/> <Heading size={12} onClick={()=>{setShowParticipantsModel(true); setShowChallangeModal(false)}} color={primaryColor} className="ms-auto btn border-0 p-0" text={`View designs`}/>
                              </Stack>
                  
                              {checkUserRank()== 1&&<>
                                <Heading size={12} className="mt-3" text={`Reward`}/>
                                 <Paragraph className="m-0 p-0" text={`Amount: ${userWithDesigns.length/2}$`}/>
                                 <Paragraph className="m-0 p-0" text={`Status: ${user.paid==true?'Paid':'Not paid'}`}/>
                                 <Stack direction='horizontal' className='mt-2'>
                                 <Form.Control  value={paypalAccount}  style={{backgroundColor:cardColor,borderColor:"#ffffff30", fontSize:11,borderRadius:8}} className='me-3 py-3 shadow-none text-white' onChange={(e)=>setPaypalAccount(e.target.value)} placeholder='Please provide your PayPal email for payment' type='text'/><CustomButton onClick={()=>updateAccount() } text={user.paypalAccount == ""?"Submit":"Update"}/>
                              </Stack>
                              </>}
                            </Col>
                        </Row>
                        </>:
                        <>
                        <div style={{height:200}} ref={animationController}></div>
                         <Paragraph size={12}  className="text-center m-0 mb-3" text={`Please wait! results will be out soon`}/>
                        </>
                    }

                    
                </div>
            }
            
            
            </div>
         
        
          {
            checkIfUserJoined()?   <Stack direction='horizontal' className=' '>
                {currentStep >0 && <Heading text="Prev" size={12} color={primaryColor} onClick={()=>{
                    const backStep = currentStep -1;
                    setCurrentStep(backStep)}
                    } className="mt-4 me-5 btn"/>}
                 
                    {
                     currentStep == 1?remainingTime2 > 0 ?  
                   getStep()==2? <CustomButton onClick={()=>setCurrentStep(currentStep+1)}  className="mt-4 border-0 w-100" text={`Next`}/>: 
                     <CustomButton onClick={()=>{setIsMounted(isMounted+1); setShow(true) }}  className="mt-4 border-0 w-100" text={`Upload design`}/>:
                    getStep()==2? <CustomButton onClick={()=>setCurrentStep(currentStep+1)} className="mt-4 border-0 w-100" text={`Next`}/>:
                    <CustomButton onClick={()=>setShowChallangeModal(false)} className="mt-4 border-0 w-100" text={`Ok`}/>:
                    currentStep == 0?
                     <CustomButton onClick={()=>setCurrentStep(currentStep+1)}  className="mt-4 border-0 w-100" text={`Next`}/>
                     :<CustomButton onClick={()=>setShowChallangeModal(false)}  className="mt-4 border-0 w-100" text={`Ok`}/>
                    }

            </Stack>:
              <Button onClick={()=>{
                setLoading(true)
                joinChallenge(selectedChallange.id).then(()=>{
                    let number = refresh+1;
                    setRefresh(number)
                    setLoading(false)

                    
                })
            
                }}  className='border-0 mt-3 w-100 py-3  '  style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>
              {  
              loading ?<Spinner size='sm'/>:'Join Challange' 
              } 
         </Button>
             
         
        }
             
        </Modal.Body>
       </Modal>
       <ChallengeParticipantsModel show={showParticipantsModel} onHide={()=>{setShowParticipantsModel(false); setShowChallangeModal(true)}} users={userWithDesigns}/>
       <DesignUploadModal participants={challenge.participants} challengeId={challenge.id} show={show} setShow={setShow} setShowToast={setShowToast} refresh={refresh} setRefresh={afterUpload} type="challenge" />
       <FeebackModal show={showReviewMOdal} onHide={()=>{setShowReviewMOdal(false); setShowChallangeModal(true)}} selectedDesign={selectedDesignForFeedbackModal} />
        </div>
        
    )
}

export default ChallangeCard
