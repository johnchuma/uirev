import React, { useEffect, useState } from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import Heading from '../../widgets/heading'
import Paragraph from '../../widgets/paragraph'
import { getAllUserDesigns } from '../../controllers/design_controller'
import Avatar from '../../widgets/avatar'
import { getUsersAndPendingDesigns } from '../../controllers/auth_controller'
import UserDesigns from '../../widgets/user_designs'

const ReviewTab = () => {
    const [clients, setClients] = useState([]);
    useEffect(() => {
            getAllUserDesigns().then((res)=>{
            setClients(res)
            }
    );
    },[]);
    const getDesignsCount = ()=>{
      let count = 0
     clients.forEach(client => {
         count = count + client.designs.length
     });
     return count
  }
  const [showUserDesignsModal, setShowUserDesignsModal] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
    return (
        <>
         <Stack className='d-flex justify-content-between' direction='horizontal'>
            <Heading size={15} text={`Designs to review`}/>
            <Paragraph className={`p-0`} text={`${getDesignsCount()>0?getDesignsCount():0} designs`}/>
            </Stack>
               <Row className='mt-4'>
               {
                clients.map((client)=>{
                    return <Col onClick={()=>{setSelectedUser(client);setShowUserDesignsModal(true);}} className='text-center' md={2}>
                        <Avatar  size={70} image={client.photoURL}/>
                        <Paragraph className="mt-2 mb-0 p-0" text={client.name}/>
                        <Paragraph className="p-0 m-0" text={client.designs.length+` designs`}/>
                    </Col>
                })
            }
               
               </Row>
               <UserDesigns show={showUserDesignsModal} onHide={()=>setShowUserDesignsModal(false)} user={selectedUser}/>

        </>
    )
}

export default ReviewTab
