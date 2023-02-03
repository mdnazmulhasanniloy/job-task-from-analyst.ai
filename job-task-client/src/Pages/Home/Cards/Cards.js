import React, { useState } from 'react';
import CardDetails from '../CardDetails/CardDetails';

const Cards = ({item}) => {
    const {name, username, address} = item;
    
  const [viewDetails, setViewDetails] = useState(false);
    return (
        <div className="rounded mb-4">
            <div className='bg-gray-100 w-full'>
            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-3 p-10'>
              <h1 className='text-lg font-bold text-orange-400 uppercase mt-3'>{username}</h1>
              <div>
                <h1 className='text-lg font-bold uppercase'>Contact</h1>
                <h3 className='mt-2'>{name}</h3>
              </div>
              <div>
                <h1 className='text-lg font-bold uppercase'>city</h1>
                <h3 className='mt-2'>{address?.city}</h3>
              </div>
              <div>
                <h1 className='text-lg font-bold uppercase'>State</h1>
                <h3 className='mt-2'>{address?.street}</h3>
              </div>
              <div className="w-100 flex align-middle justify-end ">
              <button className='btn-sm bg-orange-400  text-white text-sm ' onClick={()=>{setViewDetails(!viewDetails)}}>View Details</button>
              </div>
            </div>
            { viewDetails && <CardDetails item={item} />
            }
          </div>
        </div>
    );
};

export default Cards;