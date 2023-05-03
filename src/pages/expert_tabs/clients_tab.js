import React, { useEffect, useState } from 'react'
import { getUsersAndDesigns } from '../../controllers/auth_controller';
import Avatar from '../../widgets/avatar';
import Paragraph from '../../widgets/paragraph';
import { Col, Row, Stack } from 'react-bootstrap';
import Heading from '../../widgets/heading';

const ClientsTab = () => {
    const [clients, setClients] = useState([]);
    useEffect(() => {
        getUsersAndDesigns().then(value=>setClients(value))
    }, []);
    const getDesignsCount = ()=>{
        let count = 0
       clients.forEach(client => {
           count = count + client.designs.length
       });
       return count
    }
    return (
        <>
        <Stack className='d-flex justify-content-between' direction='horizontal'>
            <Heading size={15} text={`All clients`}/>
            
            <Paragraph className="ms-auto me-3 p-0" text={`${clients.length} Clients | ${clients.length>0 ?getDesignsCount():0} Designs  `}/>
   


            </Stack>
        <Row className='mt-3'>
            {
                clients.map((client)=>{
                    return <Col className='text-center' md={2}>
                        <Avatar size={70} image={client.photoURL}/>
                        <Paragraph className="mt-2 mb-0 p-0" text={client.name}/>
                        <Paragraph className="p-0 m-0" text={client.designs.length+` designs`}/>
                    </Col>
                })
            }
        </Row>
        </>
    )
}

export default ClientsTab
