import React, { useContext, useEffect, useState } from 'react'
import {Navbar,Container,Nav,Stack, Offcanvas} from 'react-bootstrap'
import {useLocation, useNavigate} from 'react-router-dom'
import { backgroundColor, cardColor, mutedText, primaryColor, textColor } from '../utils/color_pallate'
import { textSize } from '../utils/font_size'
import { auth } from '../controllers/firebase'
import { googleSignIn } from '../controllers/design_controller'
import { AuthContext } from '../providers/auth_provider'
import { useRedirect } from '../utils/redirect'
import LoginModal from './login_modal'
import Paragraph from './paragraph'
import { BsMenuApp, BsMenuButton, BsMenuDown } from 'react-icons/bs'
import Heading from './heading'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
// import {primaryColor} from '../utils/color_pallate'

const NavigationBar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const redirect  = useRedirect()
    const [active, setActive] = useState(0);
    const location = useLocation()
    const [path, setPath] = useState("");  
    // const [showOffCanvans,setShowOffCanvans] = useState(false)
    const [showOffCanvans, setShowOffCanvans] = useState(false);
    const navItems = [{href:"#home",path:"/", title:"Home"},
    {href:"",path:"/jobs", title:"Jobs"},
    {href:"#challenges",path:"/challanges", title:"Challenges"},
    {href:"#blog",path:"/blog", title:"Blog"}];
    return (
        
           <Navbar   expand="lg" className='py-3 sticky-top'  style={{backgroundColor:backgroundColor}} variant="dark" >
            <Container>
            <Navbar.Brand onClick={()=>navigate("/")} className='btn px-0 border-0  text-start' style={{fontWeight:600,fontSize:20,width:"200px"}}>
                UIUXrev
            </Navbar.Brand>
            <div className='shadow-none d-block d-md-none ms-auto btn border-0' onClick={()=>setShowOffCanvans(true)}> 
                <Stack className=''>
                    <div  className='mb-2' style={{backgroundColor:textColor,width:25,height:2}}></div>
                    <div  className='mb-2 ' style={{backgroundColor:textColor,width:10,height:2}}></div>
                    <div  className='mb-2' style={{backgroundColor:textColor,width:30,height:2}}></div>
                </Stack>  </div>
          <Offcanvas placement='end' show={showOffCanvans}  onHide={()=>setShowOffCanvans(false)} >
            <Offcanvas.Body className='p-5' style={{backgroundColor:cardColor}}>
               <Stack className='d-flex justify-content-between mb-4'  direction='horizontal'>
               <Heading color={mutedText} className={`p-0 m-0`} size={12} text={`Menu`}/> 
               <AiOutlineClose size={30} color='white' onClick={()=>setShowOffCanvans(false)}/>
                </Stack> 
                <Stack className='text-start'>
                {navItems.map((item,index)=><Paragraph color={location.pathname == item.path?textColor:mutedText} size={15}
                    onClick={()=>{
                        if(user){
                            navigate(item.path)
                        }
                        else{
                            setShowLoginModal(true)
                            setPath(item.path)
                        }
                    }} active={location.pathname == item.path?true:false}  className='px-3 text-start btn border-0' text={item.title}/>)
                    }
                </Stack>
                
                     { user ?
                  <Stack direction="horizontal" className='ps-3 mt-4'>
                  {/* <Nav.Link style={{fontSize:textSize,color:textColor}} className='pe-3'>Hi👋,{user.name}</Nav.Link> */}
                   <Nav.Link  onClick={()=>redirect(user)} style={{backgroundColor:primaryColor,color:textColor,fontSize:textSize, fontWeight:400,padding:"10px 30px",borderRadius:"10px"}}>Go to dashboard</Nav.Link>
                    </Stack>:
                     <Stack direction="horizontal">
                    {/* <Nav.Link style={{fontSize:textSize,color:textColor}} className='pe-3'>Hi👋, there</Nav.Link> */}
                   <Nav.Link  onClick={()=>setShowLoginModal(true)} style={{backgroundColor:primaryColor,color:textColor,fontSize:textSize, fontWeight:400,padding:"10px 30px",borderRadius:"10px"}}>Sign in</Nav.Link>
                    </Stack>
                    }
            </Offcanvas.Body>
          </Offcanvas>
            <Navbar.Collapse className='small'>
                
                {  <Nav className='ms-auto small'>
                    {navItems.map((item,index)=><Nav.Link
                    onClick={()=>{
                        if(user){
                            navigate(item.path)
                        }
                        else{
                            setShowLoginModal(true)
                            setPath(item.path)
                        }
                    }} active={location.pathname == item.path?true:false} style={{fontSize:textSize,color:location.pathname == item.path?textColor:mutedText}}  className='px-3'>{item.title}</Nav.Link>)
                    }
                   
          
                </Nav>
}
                <Nav className='ms-auto small' >
                  { user ?
                  <Stack direction="horizontal">
                  <Nav.Link style={{fontSize:textSize,color:textColor}} className='pe-3'>Hi👋,{user.name}</Nav.Link>
                   <Nav.Link onClick={()=>redirect(user)} style={{backgroundColor:primaryColor,color:textColor,fontSize:textSize, fontWeight:400,padding:"10px 30px",borderRadius:"10px"}}>Upload</Nav.Link>
                    </Stack>:
                     <Stack direction="horizontal">
                    <Nav.Link style={{fontSize:textSize,color:textColor}} className='pe-3'>Hi👋, there</Nav.Link>
                   <Nav.Link onClick={()=>setShowLoginModal(true)} style={{backgroundColor:primaryColor,color:textColor,fontSize:textSize, fontWeight:400,padding:"10px 30px",borderRadius:"10px"}}>Sign in</Nav.Link>
                    </Stack>
                    }
                    <LoginModal path={path} show={showLoginModal} onHide={()=>setShowLoginModal(false)}/>
                </Nav>
            </Navbar.Collapse>
            </Container>
           </Navbar>
    )
}

export default NavigationBar
