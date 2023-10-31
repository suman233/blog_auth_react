import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from '../AuthPages/Register'
import Home from './Home'
import BlogPage from './BlogPage'
import BlogDetails from './BlogDetails'
import CategoryDetails from './CategoryDetails'
import Profile from './Profile'
import LoginPage from '../AuthPages/LoginPage'
import Navbar from '../component/Common/Navbar'
import CreateComment from './CreateComment'
import Courses from './Courses'
import About from './About'
import Applyform from './Applyform'
import Showapplied from './Showapplied'
import Contact from './Contact'
import SearchPage from './SearchPage'

const Routing = () => {
    function PrivateRoute({ children }){
        const token=localStorage.getItem('auth') || sessionStorage.getItem('auth')
        return token !== null && token !== undefined ? (
            children
            ) : (
                <Navigate to='/' />
            )
    }

    const PublicRoute=[
        {
            path:'/',
            component: <LoginPage/>
        },
        {
            path:'/register',
            component: <Register/>
        }        
    ]

    const ProtectedRoute=[
        {
            path:'/home',
            component: <Home/>
        },
        {
            path:'/about',
            component: <About/>
        },
        {
            path: '/blog',
            component: <BlogPage/>
        },
        {
            path: '/blogdetails/:_id',
            component: <BlogDetails/>
        },
        {
            path: 'catdetails/:_id',
            component: <CategoryDetails/>
        },
        {
            path: '/createcomment/:_id',
            component: <CreateComment/>
        },
        {
            path: '/courses',
            component: <Courses/>
        },
        {
            path: '/coursedetails/:_id',
            component: <Applyform/>
        },
        {
            path: '/search/:encodedResults',
            component: <SearchPage/>
        },
        // {
        //     path: '/show',
        //     component: <Showapplied/>
        // },
        {
            path: '/contact',
            component: <Contact/>
        },
        {
            path: '/profile',
            component: <Profile/>
        }
    ]
  return (
    <>
    <Navbar/>
    <Routes>
        {
            PublicRoute?.map((route,idx)=>{
                return (
                    <Route
                    key={idx+1}
                    path={route?.path}
                    element={route?.component}
                    />
                )
            })
        }
        {
            ProtectedRoute?.map((route,idx)=>{
                return (
                    <Route 
                    key={idx+1}
                    path={route?.path}
                    element={<PrivateRoute>{route?.component}</PrivateRoute>}
                    />
                )
            })
        }
    </Routes>
    </>
  )
}

export default Routing