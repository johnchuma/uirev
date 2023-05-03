import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Heading from './heading'
import Paragraph from './paragraph'
import { formatDate } from '../utils/format_date'

const PostItem = ({blog,onClick,setSelectedBlog}) => {
    const navigate = useNavigate()
    return (
      <>
      <div className='btn p-0 text-start border-0 mb-2' onClick={()=>onClick != null?onClick():navigate(`/blog/${blog.id}`)} >
                            <Stack onClick={()=>setSelectedBlog&&setSelectedBlog(blog)} className='mb-2' direction='horizontal'>
                                <Image style={{height:60,width:80,borderRadius:10}} src={blog.image}/>
                                <div className='ms-3'>
                                    <Heading fontWeight={400} className={`m-0 p-0`} size={12} text={blog.title}/>
                                    <Paragraph className={`m-0 p-0 mt-1`} text={formatDate(blog.createdAt)}/>
                                </div>
                            </Stack>
     </div>
      </>
    )
}

export default PostItem
