import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,RouterProvider,Routes, createBrowserRouter, json } from 'react-router-dom';
import Layout from './pages/layout';
import HomePage from './pages/home_page';
import UserPage from './pages/user_page';
import ExpertPage from './pages/expert_page';
import AuthProvider from './providers/auth_provider';
import AdminRoute from './providers/admin_route';
import UnathorizedPage from './pages/unathorized_page';
import ErrorBoundary from './pages/error_boundary';
// import { findUser } from './controllers/app_controller';
import { auth } from './controllers/firebase';
import JobsPage from './pages/jobs_page';
import ChallangesPage from './pages/challanges_page';
import { findUser } from './controllers/auth_controller';
import BlogPage from './pages/blog_page';
import ReadBlog from './pages/read_blog';

function App() {
  const router = createBrowserRouter([
    {
         path:"/",
         errorElement:<ErrorBoundary/>,
         element:<Layout/>,
         children:[
          {
          path:"/",
          index:true,
          element:<HomePage/>
         },
         {
          path:'/jobs',
          element:<JobsPage/>
         },
         {
          path:'/challanges',
          element:<ChallangesPage/>
         },
         {
          path:'/blog',
          element:<BlogPage/>
         },
         {
          path:'/blog/:id',
          element:<ReadBlog/>
         },
       
        ]
    },
  {
    path:"/user",
    loader:async()=>{
      const user=  await findUser(auth.currentUser);
      if(user && user.accountType != "user"){
        throw json({
          message:"You do not have access to this page",
          status:404
        })
      }
   return user
    },
    errorElement:<ErrorBoundary/>,
    element:<UserPage/>,
    
},
      {
        path:"/expert",
        element:<ExpertPage/>,
        loader:async()=>{
          const user=  await findUser(auth.currentUser);
          if(user && user.accountType != "expert"){
            throw json({
              message:"You do not have access to this page",
              status:404
            })
          }
       return user
        },
        errorElement:<ErrorBoundary/>
      
      }
])
  return (
    <AuthProvider>
         <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
