
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, FloatingLabel, Form, FormControl, Image, Modal, Row, Stack } from 'react-bootstrap'
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

const ChallengeCardAdmin = ({challenge,index,challenges,refresh,setRefresh,setShowToast}) => {
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

 
    const [showParticipantsModel, setShowParticipantsModel] = useState(false);   
    const [selectedDesignForFeedbackModal, setSelectedDesignForFeedbackModal] = useState(null);
    const submittedDesigns = challenge.participants.filter(participant => participant.step == 2).length;
    const beforeStarting = `${getTimeRemained(remainingTime).hours}hr : ${getTimeRemained(remainingTime).minutes}min : ${getTimeRemained(remainingTime).seconds}sec`;
    const beforeSubmission =`${getTimeRemained(remainingTime2).hours}hr : ${getTimeRemained(remainingTime2).minutes}min : ${getTimeRemained(remainingTime2).seconds}sec`;
    return (
        checkIfToShowChallenge()&& <div style={{backgroundColor:mutedBackground,borderRadius:10}} className='px-5 py-5'>

            <Heading size={13} fontWeight={400} className="" text={`Challange: ${challenge.name}`}/>
             <Stack direction='horizontal' >
                <BsPeople color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={challenge.participants.length+ ' joined'}/></div>
             </Stack>
            
             <Stack direction='horizontal' >
                <BsCheck2All color={mutedText} className='me-2' /> <div><Paragraph className="py-0 my-0" text={submittedDesigns+ ' submitted designs'}/></div>
             </Stack>
            <CustomButton
             onClick={()=>{setShowChallangeModal(true)
                // setSelectedChallange(index)
                }} 
                className="mt-2 border-0 w-100" text= {challenge.closed?"Challange ended":"Reviewed designs"}/>
      
       <ChallengeParticipantsModel show={showParticipantsModel} onHide={()=>{setShowParticipantsModel(false); setShowChallangeModal(true)}} users={userWithDesigns}/>
       <DesignUploadModal participants={challenge.participants} challengeId={challenge.id} show={show} setShow={setShow} setShowToast={setShowToast} refresh={refresh} setRefresh={afterUpload} type="challenge" />
       <FeebackModal show={showReviewMOdal} onHide={()=>{setShowReviewMOdal(false); setShowChallangeModal(true)}} selectedDesign={selectedDesignForFeedbackModal} />
        </div>
        
    )
}

export default ChallengeCardAdmin
