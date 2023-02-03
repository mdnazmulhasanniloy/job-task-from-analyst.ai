import React from 'react';

const AllUserTable = ({ user, index, handelToDelete }) => {
    const { name, img, email, _id } = user;
    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>

                </div>
            </td>
            <td>
                {name}
            </td>
            <td>
                {email}
            </td>
            <th>
                <button className="btn btn-error text-white btn-xs" onClick={() => handelToDelete(_id)}>delete</button>
            </th>
            
        </tr>
    );
};

export default AllUserTable;