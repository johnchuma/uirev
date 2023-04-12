import React, { useContext, useEffect, useState } from 'react'
import {Navbar,Container,Nav,Stack} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { backgroundColor, primaryColor, textColor } from '../utils/color_pallate'
import { textSize } from '../utils/font_size'
import { auth } from '../controllers/firebase'
import { googleSignIn } from '../controllers/app_controller'
import { AuthContext } from '../providers/auth_provider'
import { useRedirect } from '../utils/redirect'
import LoginModal from './login_modal'
// import {primaryColor} from '../utils/color_pallate'

const NavigationBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const redirect  = useRedirect()
    const [active, setActive] = useState(0);
    
    return (
        
           <Navbar  fixed='top' expand="lg" className='py-3'  style={{backgroundColor:backgroundColor}} variant="dark" >
            <Container>
            <Navbar.Brand className='btn px-0  text-start' style={{fontWeight:600,fontSize:20,width:"200px"}}>
                UIrev
            </Navbar.Brand>
            <Navbar.Collapse className='small'>
                <Nav className='ms-auto small'>
                    {[{href:"#home",title:"Home"},
                    {href:"#about",title:"About us"},
                    {href:"#review",title:"Review coverage"}].map((item,index)=><Nav.Link href={item.href} onClick={()=>setActive(index)} active={index==active?true:false} style={{fontSize:textSize}}  className='px-3'>{item.title}</Nav.Link>)
                    }
                   
          
                </Nav>
                <Nav className='ms-auto small' >
                  { user ?<Stack direction="horizontal">
                  <Nav.Link style={{fontSize:textSize,color:textColor}} className='pe-3'>Hi👋,{user.name}</Nav.Link>
                   <Nav.Link onClick={()=>redirect(user)} style={{backgroundColor:primaryColor,color:textColor,fontSize:textSize, fontWeight:400,padding:"10px 30px",borderRadius:"10px"}}>Upload</Nav.Link>
                    </Stack>:
                     <Stack direction="horizontal">
                    <Nav.Link style={{fontSize:textSize,color:textColor}} className='pe-3'>Hi👋, there</Nav.Link>
                   <Nav.Link onClick={()=>setShowLoginModal(true)} style={{backgroundColor:primaryColor,color:textColor,fontSize:textSize, fontWeight:400,padding:"10px 30px",borderRadius:"10px"}}>Sign in</Nav.Link>
                    </Stack>
                    }
                    
                    <LoginModal show={showLoginModal} onHide={()=>setShowLoginModal(false)}/>
                   
                </Nav>
            </Navbar.Collapse>
            </Container>
           </Navbar>
       
          
    )
}

export default NavigationBar
