import React, { useContext, useEffect, useState } from 'react'
import {Navbar,Container,Nav,Button,Stack,NavDropdown, Image} from 'react-bootstrap'
import { backgroundColor, primaryColor, textColor } from '../utils/color_pallate'
import { textSize } from '../utils/font_size'
import { Bs0Circle, Bs0CircleFill, BsBellFill, BsChevronBarDown, BsChevronDoubleDown, BsChevronDown } from 'react-icons/bs'
// import {primaryColor} from '../utils/color_pallate'
import {useNavigate} from 'react-router-dom'
import { auth } from '../controllers/firebase'
import { logOut, signOut } from '../controllers/app_controller'
import { AuthContext } from '../providers/auth_provider'

const UserNavigationBar = () => {
   
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
 
    return (
        
           <Navbar expand="lg"   style={{backgroundColor:backgroundColor}} variant="dark" >
            <Container>
            <Navbar.Brand className='btn px-0  text-start' onClick={()=>navigate('/')} style={{fontWeight:600,fontSize:18,width:"200px"}}>
                UIrev 
            </Navbar.Brand>
            <Navbar.Collapse className='small'>
               
                <Nav className='ms-auto small d-flex justify-content-end' style={{width:"200px"}}>
                  {
                   user&&
                   <Stack direction='horizontal'>
                   <Image src={user.photoURL}  className='rounded-circle' style={{height:30, width:30,backgroundSize:'cover',objectFit:'cover'}}/>
                    <NavDropdown style={{backgroundColor:"black"}} title={user.name}>
                        <NavDropdown.Item onClick={()=>logOut().then(()=>navigate('/'))} style={{fontSize:12}}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  
                   </Stack>
                  }
                    
                 

                  
                   
          
                </Nav>
            </Navbar.Collapse>
            </Container>
           </Navbar>
       
          
    )
}

export default UserNavigationBar
