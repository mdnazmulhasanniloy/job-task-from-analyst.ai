import React, { useEffect, useState } from 'react';
import Cards from './Cards/Cards';
import { useQuery } from '@tanstack/react-query';
import Pagination from './Pagination/Pagination';
import Spanner from '../Shared/Spanner/Spanner';

const Home = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);


  const { data: employ = [], refetch, isLoading } = useQuery({
    queryKey: ['employ'],
    queryFn: async () => {
        const res = await fetch(`https://task-server-steel.vercel.app/employ`)
        const data = await res.json();
        setItems(data);
        return data;
      }
})


//get current post

const indexOfLastItem = currentPage * itemPerPage;
const indexOfFirstItem =indexOfLastItem - itemPerPage;
const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

if(isLoading){
  return <Spanner />
}

  return (
    <div className='w-11/12 mx-auto'>
    {
      currentItems.map(item=><Cards  item={item} key={item?._id} />)
    }
          

    <div className="flex justify-center mt-48">

       <Pagination totalItem={items.length} itemPerPage={itemPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />

    </div>      

      </div>
  );
};

export default Home;