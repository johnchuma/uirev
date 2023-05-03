import React, { useState } from 'react'
import { Col, Image, Modal, Row, Stack } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { textColor } from '../utils/color_pallate';
import WriteReviewModal from './write_review_modal';

const UserDesigns = ({show,onHide,user}) => {
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState(null);

    return (
       <>
       <Modal centered  className='my-modal' size='xl' show={show} onHide={()=>{ onHide(); }}>
        <Modal.Header className='border-0' closeLabel='close'>
        <Stack style={{width:"100%"}} direction='horizontal' className='d-flex justify-content-between'>
                <Modal.Title style={{fontSize:14,color:textColor}}>{user&&user.name+' designs'}</Modal.Title>
                <MdClose onClick={()=>{ onHide(); }} size={20} color='white'/>
        </Stack>
        </Modal.Header>
        <Modal.Body>
            <Row>
                {user&&user.designs.map((design)=>{
                  return  <Col md={3}>
                    <Image className='w-100' onClick={()=>{
                        setSelectedDesign(design)
                        setShowWriteReviewModal(true)
                    }} fluid style={{height:200}}  src={design.downloadUrl} />
                    </Col>
                })}
            </Row>

        </Modal.Body>
        </Modal>
        <WriteReviewModal showModal={showWriteReviewModal} onHide={()=>setShowWriteReviewModal(false)} selectedDesign={selectedDesign} />
       </>
    )
}

export default UserDesigns
