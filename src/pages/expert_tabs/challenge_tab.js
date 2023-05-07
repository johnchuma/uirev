import React, { useEffect, useState } from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import Heading from '../../widgets/heading'
import Paragraph from '../../widgets/paragraph'
import { primaryColor } from '../../utils/color_pallate'
import CreateChallengeModal from '../../widgets/create_challange_modal'
import { getChallenges } from '../../controllers/challenge_controller'
import ChallangeCard from '../../widgets/challange_card'
import ChallengeCardAdmin from '../../widgets/challenge_card_admin'
import ChallengeDesigns from '../../widgets/challange_designs'

const ChallengeTab = () => {
    const [showCreateChallengeModal, setShowCreateChallengeModal] = useState(false);
    const [challenges, setChallenges] = useState([]);
    const [showChallangeModal, setShowChallangeModal] = useState(false);
    const [selectedChallange, setSelectedChallange] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [showDesignsModal, setShowDesignsModal] = useState(false);

    
    useEffect(() => {
        console.log("After submitting")
        getChallenges().then((response)=>{
            setChallenges(response)
        })
    }, [refresh]);
    return (
        <>
        <Stack className='d-flex justify-content-between' direction='horizontal'>
            <Heading size={15} text={`Created challenge`}/>
            <Heading size={12} onClick={()=>{setShowCreateChallengeModal(true)}} className="btn border-0 p-0" color={primaryColor} text={`New challenge`}/>
        </Stack>
        <Row className='mt-2'>
            { challenges.map((challenge,index)=>{
              return  <Col md={6} onClick={()=>{
                 setSelectedChallange(index)
                 setShowDesignsModal(true)
              }}>
                <ChallengeCardAdmin  challenge={challenge} challenges={challenges} refresh={refresh} setRefresh={setRefresh}/>
               </Col>
            })
             
            }
        </Row>
        <ChallengeDesigns show={showDesignsModal} refresh={refresh} onRefresh={setRefresh}  onHide={()=>setShowDesignsModal(false)} challenge={challenges[selectedChallange]} />
        <CreateChallengeModal show={showCreateChallengeModal} onHide={()=>setShowCreateChallengeModal(false)}/>
        </>
    )
}

export default ChallengeTab
