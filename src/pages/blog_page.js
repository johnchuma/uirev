import React, { useEffect, useState } from 'react'
import { cardColor } from '../utils/color_pallate'
import Heading from '../widgets/heading'
import { Col, Container, Form, Image, Row, Stack } from 'react-bootstrap'
import { getBlogs } from '../controllers/blog_controller'
import Paragraph from '../widgets/paragraph'
import Avatar from '../widgets/avatar'
import { MdOutlineSettingsSystemDaydream, MdWhatsapp } from 'react-icons/md'
import { SiInstagram, SiTwitter } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'
import { formStyles } from '../utils/styles'
import PostItem from '../widgets/post_item'


const BlogPage = () => {
const [blogs, setBlogs] = useState([]);
const [selectedBlog, setSelectedBlog] = useState(null);
const [keyword, setKeyword] = useState("");

const navigate = useNavigate()
useEffect(() => {
    getBlogs().then((value)=>{
        setBlogs(value)
        if(value.length>0){
            setSelectedBlog(value[0])
        }
    })
}, []);
 
    return (
        <>
         <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mb-4'></div>
        <Container>
        <Heading size={15} className="" text="UI/UX Designing blog"/>
        </Container>
        
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        <Container>
            <Row>
                <Col className='p-0' md={12}>
                <Stack direction='horizontal' className='container d-flex align-items-center mt-4'>
                        <Avatar size={50}   image={`https://lh3.googleusercontent.com/a/AGNmyxayY5okHs9tqKcq8cBIG-mpv_YWNS6WteCITcY7PQ=s96-c`}/>
                    <div className='ms-3'>
                        <Heading size={12} className={`m-0 p-0 mt-2`} text={`John Chuma`}/>
                        <Paragraph className={`m-0 mt-1 p-0`} text={`UI/UX designing expert`}/>
                    </div>
                    <div className='ms-auto'>
                      <a target='_blank' href='https://chat.whatsapp.com/Dhz7R5biOArCIlZPq8u424'>
                      <MdWhatsapp   size={20}  color={`#ffffff70`}   className=' ms-4'/>

                        </a>  
                        <a target='_blank' href='https://twitter.com/johnvchuma'>
                        <SiTwitter  size={20}  color={`#ffffff70`} className=' ms-4'/>
                        </a>
                        <a target='_blank'  href='https://www.instagram.com/johnvchuma/'>
                        <SiInstagram  size={17} color={`#ffffff70`}  className=' ms-4'/>
                        </a>
                    </div>
                </Stack>
                </Col>
            </Row>
        </Container>
      
         <Container style={{backgroundColor:cardColor,borderRadius:20}} className='my-4 p-5'>
            <Row>
           
                <Col>
               
                <Row >
                  <Col md={8}>
                <Heading size={15} className={`mb-4 mt-1`} text={`All posts`}/>

                  </Col>
                  <Col>
                <Form.Control onChange={(e)=>setKeyword(e.target.value)} className='ms-auto m-0' style={formStyles} placeholder='Search page'></Form.Control>

                  </Col>
                </Row>

                
           <Row className='mt-4'>
           {
                    blogs.map((blog)=>{
                        return blog.title.toLowerCase().includes(keyword.toLowerCase()) == true && <Col  md={4}>
                        <PostItem blog={blog}/>
                        </Col>
                    })
            }
           </Row>
                
                </Col>
            </Row>
      
         </Container>
        </>
    )
}

export default BlogPage
