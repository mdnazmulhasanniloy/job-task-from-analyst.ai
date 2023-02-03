import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from './../../../context/AuthProvider';
import useAdmin from './../../../Hooks/useAdmin';



const NavBar = () => {
    const {user, signOutUser} = useContext(AuthContext)
    const Navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);
    

    //user logout
    const HandelToSignOut = () =>{
        signOutUser()
        .then(() => {
            localStorage.removeItem('accessToken')
            Navigate('/')
        })
        .catch(error => toast.error(error))
    }
    //nav items
    const menuItems = <>
                <li className='font-semibold'>
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li className='font-semibold'>
                {
                    user?.uid?
                    <button onClick={HandelToSignOut} >Sign Out</button>
                    : <NavLink to='/login'>Login Account</NavLink>
                }
                </li>
                {
                    isAdmin && <>
                                <li><NavLink to='/allUsers'>All Users</NavLink></li>
                            </>
                }
    </>
    return (
        <div className="navbar w-100 h-20 mb-12 bg-base-100 shadow-lg px-10">
                <div className="navbar-start">
                    <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}                        
                    </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                    Analystt.ai
                     </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="avatar">
                        <div className="w-10  rounded-full ring ring-[#ff3811] ring-offset-base-100 ring-offset-2 mr-4">
                        {
                            user?.photoURL?
                             <img alt='' src={user?.photoURL} /> 
                             : <FaUserTie className='w-full text-5xl'/>
                        }
                         </div>
                    </div> 
                </div>
            </div>
    );
};

export default NavBar;