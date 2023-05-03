import React, { useEffect, useState } from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
import Heading from '../../widgets/heading'
import { primaryColor } from '../../utils/color_pallate'
import CreateBlogModal from '../../widgets/create_blog_modal'
import { useNavigate } from 'react-router-dom'
import { getBlogs } from '../../controllers/blog_controller'
import PostItem from '../../widgets/post_item'
import UpdateBlogModal from '../../widgets/update_blog_modal'

const BlogsTab = () => {
    const [showBlogModal, setShowBlogModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [keyword, setKeyword] = useState("");
    
    const navigate = useNavigate()
    useEffect(() => {
        if(showUpdateModal == false){
            getBlogs().then((value)=>{
                setBlogs(value)
                if(value.length>0){
                    setSelectedBlog(value[0])
                }
            })
        }
       
    }, [showBlogModal,showUpdateModal]);
    return (
        <>
         <Stack className='d-flex justify-content-between' direction='horizontal'>
            <Heading size={15} text={`Create blogs`}/>
            <Heading size={12} onClick={()=>setShowBlogModal(true)}  className="btn border-0 p-0" color={primaryColor} text={`Create new blog`}/>
        </Stack>
        <Row className='mt-4'>
          {
                    blogs.map((blog)=>{
                        return blog.title.toLowerCase().includes(keyword.toLowerCase()) == true && <Col  md={4}>
                        <PostItem onClick={()=>{
                            // console.log('working')
                            setSelectedBlog(blog)
                            setShowUpdateModal(true)
                        }} blog={blog}/>
                        </Col>
                    })
            }
        </Row>
        <UpdateBlogModal show={showUpdateModal} onHide={()=>setShowUpdateModal(false)} blog={selectedBlog}/>
        <CreateBlogModal  show={showBlogModal} onHide={()=>setShowBlogModal(false)}/>
        </>
    )
}

export default BlogsTab
