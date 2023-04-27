import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Image, Modal, Row, Stack, ToastContainer } from 'react-bootstrap'
import Heading from '../widgets/heading'
import { backgroundColor, cardColor, mutedBackground, mutedText, secondaryColor, textColor, vibrantColors } from '../utils/color_pallate'
import Paragraph from '../widgets/paragraph'
import CustomButton from '../widgets/button'
import Lottie from 'lottie-web'
import { getChallenges, joinChallenge } from '../controllers/challenge_controller'
import { MdClose } from 'react-icons/md'
import { AuthContext } from '../providers/auth_provider'
import OutlinedButton from '../widgets/outlined_button'
import ChallangeCard from '../widgets/challange_card'
import ErrorToast from '../utils/toasts'
import NoData from '../widgets/no_data'

const ChallangesPage = () => {
    const challangeAnimationController = useRef(null)
    const [challenges, setChallenges] = useState([]);
    const [showChallangeModal, setShowChallangeModal] = useState(false);
    const [selectedChallange, setSelectedChallange] = useState(null);
    const [refresh, setRefresh] = useState(0);

    const [showToast, setShowToast] = useState(false);
   

    useEffect(() => {
        getChallenges().then((response)=>{
            setChallenges(response)
        })
    }, [refresh]);
   console.log(challenges)
    return (
        <>

<ErrorToast show={showToast}  onClose={()=>setShowToast(false)}/>


        <div className=''>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mb-4'></div>
        <Container>
        <Heading className="" size={15} text=" Designing Challenge"/>
        </Container>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        </div>
        <Container>
        <Heading className="mt-4 mb-4 text-start" color={mutedText} fontWeight={400} size={12} text="All challanges"/>

        <Row className='mb-5'>
        {challenges.length>0? challenges.map((challenge,index)=><Col md={4}>
        <ChallangeCard challenge={challenge} challenges={challenges} index={index} setShowToast={setShowToast} setRefresh={setRefresh} refresh={refresh}/>
        </Col>):<NoData className={`mt-5`}/>}
        </Row>
        </Container>
       
        </>
    )
}

export default ChallangesPage
