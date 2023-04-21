import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Container, Image, Modal, Row, Stack } from 'react-bootstrap'
import Heading from '../widgets/heading'
import { backgroundColor, cardColor, mutedBackground, secondaryColor, textColor, vibrantColors } from '../utils/color_pallate'
import Paragraph from '../widgets/paragraph'
import CustomButton from '../widgets/button'
import Lottie from 'lottie-web'
import { getChallenges, joinChallenge } from '../controllers/challenge_controller'
import { MdClose } from 'react-icons/md'
import { AuthContext } from '../providers/auth_provider'
import OutlinedButton from '../widgets/outlined_button'
import ChallangeCard from '../widgets/challange_card'

const ChallangesPage = () => {
    const challangeAnimationController = useRef(null)
    const [challenges, setChallenges] = useState([]);
    const [showChallangeModal, setShowChallangeModal] = useState(false);
    const [selectedChallange, setSelectedChallange] = useState(null);
    const [refresh, setRefresh] = useState(0);

   

    useEffect(() => {
        Lottie.destroy()
        Lottie.loadAnimation({
            container:challangeAnimationController.current,
            path:'male-graphic-designer-designing.json',
            renderer:'svg',
            autoplay:true,
            loop:true
        })
        getChallenges().then((response)=>{
            setChallenges(response)
        })
    }, [refresh]);
   console.log(challenges)
    return (
        <>
        <div className=''>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mb-4'></div>
        <Container>
        <Heading className="" size={15} text=" Designing Challenge"/>
        </Container>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        </div>
        <Container>
        <div className='p-5 mt-3' style={{backgroundColor:secondaryColor,borderRadius:20}}>
                <Row>
                    <Col className='d-flex align-items-center' md={8}>
                        <div>
                        <Heading size={25} color={backgroundColor} text="Win over $100  everyday"/>
                        <Paragraph color={backgroundColor} text="Participate in our daily challenges for a chance to win over $100 every day! Create and submit your best designs, then have other participants judge and like your entry. Winners are selected based on the most likes received. Don't miss out on this exciting opportunity to showcase your skills and win big!"/>
                        </div>
                       
                    </Col>
                    <Col>
                    <div  style={{height:200}} ref={challangeAnimationController}></div>
                    </Col>

                </Row>
            </div>
        <Heading className="mt-5 mb-3 text-start" size={15} text="All challanges"/>

        <Row className='mb-5'>
        {challenges.map((challenge,index)=><Col md={4}>
        <ChallangeCard challenge={challenge} challenges={challenges} index={index} setRefresh={setRefresh} refresh={refresh}/>
        
        </Col>)}
        </Row>
        </Container>
       
        </>
    )
}

export default ChallangesPage
