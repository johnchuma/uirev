import React,{useEffect,useState} from 'react'
import UserNavigationBar from '../widgets/user_navigation_bar'
import {Row,Col,Container,Stack,Form,Button,Spinner, Modal,Carousel,Image} from 'react-bootstrap'
import { backgroundColor, cardColor, mutedBackground, mutedText, primaryColor, secondaryColor, textColor } from '../utils/color_pallate'
import { getDesignFeedbacks, submitDesignReview, submitFeedback } from '../controllers/review_controller'
import Heading from '../widgets/heading'
import ReviewTab from './expert_tabs/review_tab'
import ClientsTab from './expert_tabs/clients_tab'
import ChallengeTab from './expert_tabs/challenge_tab'
import BlogsTab from './expert_tabs/blogs_tab'


const ExpertPage = () => {



    
   const [currentTab, setCurrentTab] = useState(0);
   

   

    return (
        <>
        <UserNavigationBar/>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mb-4'></div>
        <Container>
        <Heading size={15} className="" text="Admin workspace"/>
        </Container>
        <div style={{height:1,backgroundColor:cardColor}} className=' w-100 mt-4'></div>
        <Container>
          <Row className='mt-4'>
            {
              ["Designs to review","All clients","Challenges","Blogs"].map((item,index)=>{
              return  <Col sm="auto">
                  <div className='py-1 px-3 btn border-0' onClick={()=>setCurrentTab(index)}  style={{backgroundColor:index==currentTab?secondaryColor:mutedBackground,borderRadius:30}}>
                    <Heading  fontWeight={400} size={12} color={index==currentTab?backgroundColor:textColor} className="p-0 m-0 py-2" text={item}/>
                    </div>
                </Col>
              })
            }
          </Row>
           <div className='mt-4 p-5' style={{backgroundColor:mutedBackground,borderRadius:10}}>
           {currentTab==0&&<ReviewTab/>}
           {currentTab==1&&<ClientsTab/>}
           {currentTab==2&&<ChallengeTab/>}
           {currentTab==3&&<BlogsTab/>}



           </div>
        </Container>
        </>
     
    )
}

export default ExpertPage
