import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import AllUserTable from './../AllUserTable/AllUserTable';
import Spanner from './../Shared/Spanner/Spanner';


const AllUsers = () => {
    const [toggleTab, setToggleTab] = useState('user')


    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', toggleTab],
        queryFn: async () => {
            const res = await fetch(`https://task-server-steel.vercel.app/allUser/${toggleTab}`)
            const data = await res.json();
            return data;
        }
    })


    //delete user 
    const handelToDelete = (id) => {
        fetch(`https://task-server-steel.vercel.app/user/delete/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(res => res.json())
            .then(data => {

                if (data.deletedCount > 0) {
                    toast.success('User deleted successfully.');
                    refetch()
                }
                toast.error(data.message)
            })
            .catch(err => {
                toast.error(err.message)
            });
    }


    if (isLoading) {
        return <Spanner />
    }
    return (
        <div className=' w-4/5 mx-auto min-h-screen'>
            <div className="mb-4 border-b border-gray2-00 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-lg  justify-between px-40 font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li className="mr-2" role="presentation">
                        <button
                            onClick={() => setToggleTab('user')}
                            className={toggleTab === 'user' ?
                                "inline-block  p-4 rounded-t-lg  border-b-2  text-blue-600  hover:text-blue-600  dark:text-blue-500   dark:hover:text-blue-500   border-blue-600  "
                                : "inline-block p-4 rounded-t-lg  border-b-2 border-transparent  hover:text-gray-600  hover:border-gray-300  dark:hover:text-gray-300 dark:border-transparent  text-gray-500 dark:text-gray-400  border-gray-100  dark:border-gray-700"
                            }
                        >Users</button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            onClick={() => setToggleTab('Admin')}
                            className={toggleTab === 'Admin' ?
                                "inline-block  p-4 rounded-t-lg  border-b-2  text-blue-600  hover:text-blue-600  dark:text-blue-500   dark:hover:text-blue-500   border-blue-600  "
                                : "inline-block p-4 rounded-t-lg  border-b-2 border-transparent  hover:text-gray-600  hover:border-gray-300  dark:hover:text-gray-300 dark:border-transparent  text-gray-500 dark:text-gray-400  border-gray-100  dark:border-gray-700"
                            }
                            type="button">Admins</button>
                    </li>
                </ul>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>

                                </label>
                            </th>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <AllUserTable
                                user={user}
                                index={index}
                                handelToDelete={handelToDelete}
                                key={user._id} />)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;