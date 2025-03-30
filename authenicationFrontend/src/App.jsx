import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Navbar from './Components/Navabar'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Secret from './Components/Secret'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'
const App = () => {
    const appRouter = createBrowserRouter([
      {
        path: "/",
        element: <Navbar />,
      },
      {
        path: "/singup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/secret",
        element: <Secret />,
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            
            path: "/login/:token",
            element: <ForgotPassword/>
        
        }
    ]);
  return (
  
          <RouterProvider router={appRouter}/>
    
  )
}

export default App