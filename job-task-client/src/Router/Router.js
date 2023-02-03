import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import Home from "../Pages/Home/Home"
import Login from './../Pages/Login/Login';
import Register from './../Pages/Register/Register';
import AllUsers from './../Pages/AllUsers/AllUsers';
import NotFoundPage from './../Pages/Shared/NotFoundPage/NotFoundPage';
import AdminRoute from "./AdminRoute";





export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/allUsers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />,
    }
])