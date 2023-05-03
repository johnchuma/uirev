import React, { useContext, useEffect, useState } from 'react'
import { backgroundColor, cardColor, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import Heading from '../widgets/heading'
import { Button, Col, Container, Image, Row, Stack } from 'react-bootstrap'
import { getBlogs } from '../controllers/blog_controller'
import Paragraph from '../widgets/paragraph'
import Avatar from '../widgets/avatar'
import { MdOutlineSettingsSystemDaydream, MdWhatsapp } from 'react-icons/md'
import { SiInstagram, SiTwitter } from 'react-icons/si'
import { useNavigate, useParams } from 'react-router-dom'
import PostItem from '../widgets/post_item'
import { formatDate } from '../utils/format_date'
import CustomButton from '../widgets/button'
import LoginModal from '../widgets/login_modal'
import { textSize } from '../utils/font_size'
import { useRedirect } from '../utils/redirect'
import { AuthContext } from '../providers/auth_provider'


const ReadBlog = () => {
const [blogs, setBlogs] = useState([]);
const [selectedBlog, setSelectedBlog] = useState(null);
const {id} = useParams()
const navigate = useNavigate()
const {user} = useContext(AuthContext)
const [showLoginModal, setShowLoginModal] = useState(false);
  const redirect = useRedirect()

useEffect(() => {
    getBlogs().then((value)=>{
        setBlogs(value)
        if(value.length>0){
            value.forEach(blog=>{
                if(blog.id===id){
                    setSelectedBlog(blog)
                }
            })
        }
    })
}, []);
 const limit = 5;
    return (
        <>
         <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mb-4'></div>
        <Container>
        <Heading size={15} className="" text="UI/UX Designing tips"/>
        </Container>
        
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        <Container>
            <Row>
                <Col className='p-0' md={12}>
                <Stack direction='horizontal' className='container d-flex align-items-center mt-4'>
                        <Avatar size={50}   image={`https://lh3.googleusercontent.com/a/AGNmyxayY5okHs9tqKcq8cBIG-mpv_YWNS6WteCITcY7PQ=s96-c`}/>
                    <div className='ms-3'>
                        <Heading size={12} className={`m-0 p-0 mt-2`} text={`John Chuma`}/>
                        <Paragraph className={`m-0 mt-1 p-0`} text={selectedBlog&&formatDate(selectedBlog.createdAt)}/>
                    </div>
                    <div className='ms-auto'>
                        <MdWhatsapp  size={20}  color={`#ffffff70`}   className=' ms-4'/>
                        <SiTwitter  size={20}  color={`#ffffff70`} className=' ms-4'/>
                        <SiInstagram  size={17} color={`#ffffff70`}  className=' ms-4'/>
                    </div>
                </Stack>
                </Col>
            </Row>
        </Container>
      
         <Container style={{backgroundColor:cardColor,borderRadius:20}} className='my-4 p-5'>
            <Row>
                <Col md={8}>
               
                {blogs.length>0?<>
            <Heading text={selectedBlog.title}/>
            {/* <Paragraph text={`3 mins ago`}/> */}
            <Row className='mt-3'>
                <Col md={2}>
                </Col>
                <Col >
                <Image  className='mt-2 ' style={{borderRadius:10}}  fluid src={selectedBlog.image}/>
                </Col>
                <Col md={2}>
                </Col>
            </Row>
            
             <div className='mt-4' style={{color:"#ffffff",fontWeight:300, fontSize:12}} dangerouslySetInnerHTML={{ __html:selectedBlog.content}}></div>
            </>:<></>}
               <div className='p-5 my-4' style={{backgroundColor:secondaryColor,borderRadius:10}}>
                <Paragraph color={backgroundColor} size={20} text={`"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs`}/>
                <Paragraph color={backgroundColor}  text={"We hope that you found this blog post helpful and informative. Remember that the best way to improve your skills is by practicing, so why not take this opportunity to design something great and submit it for review? We can't wait to see what you come up with"}/>
                {user?
                         <Button className='border-0 mt-2 ' onClick={()=>redirect(user)} style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Submit design</Button>
                     :
                     <Button className='border-0 mt-2  ' onClick={()=>setShowLoginModal(true)} style={{color:textColor,borderRadius:"10px",fontSize:textSize, backgroundColor:primaryColor,padding:"10px 30px"}}>Submit design</Button>
                    
                    }
                    <LoginModal show={showLoginModal} onHide={()=>setShowLoginModal(false)}/>
               </div>
                </Col>
                <Col>
                <Heading size={15} className={`mb-4 mt-1`} text={`Recent posts`}/>

                  {
                    blogs.slice(0,limit).map((blog)=>{
                        return <PostItem setSelectedBlog={setSelectedBlog} blog={blog}/>
                    })
                  }
                  {<><Heading onClick={()=>navigate("/blog")} className={`text-start w-100 btn border-0 mt-2 p-0`} size={12} text={`View all posts`} color={primaryColor}/></>}
                </Col>
            </Row>
            
         </Container>
        </>
    )
}

export default ReadBlog
