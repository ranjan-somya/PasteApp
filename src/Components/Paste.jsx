import { paste } from '@testing-library/user-event/dist/paste';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/Pastefile';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import {faTrash } from '@fortawesome/free-solid-svg-icons'
import {faCopy } from '@fortawesome/free-solid-svg-icons'
import {faShareNodes } from '@fortawesome/free-solid-svg-icons'
// import dayjs from 'dayjs';
import { FormatDate } from "../utlis/formatDate";
import { Calendar } from "lucide-react";



const Paste = () => {
  const pastes = useSelector((state) =>
    state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <div>
      <input
        className='p-2 rounded-2xl w-[600px] mt-5 '
        type='search'
        placeholder='search here'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 text-white text-center  mt-5'>

        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border-black border-[1px] flex flex-row gap-[20px] place-content-between hover:bg-slate-200 cursor-pointer transition duration-700 rounded-xl px-2 py-3' key={paste?._id}>
                  <div className='flex flex-col gap-[20px] text-black pl-5'>

                  <div className='text-[20px] font-bold'>
                       {paste.title}
                  </div>
                  <div>
                  
                    {paste.content}

                  </div>
                  </div>
                  <div className='flex flex-col gap-4 '>
                    <div className='flex flex-row gap-2 mt-2 text-black  '>

                    <button className='border-[1px] px-[10px] rounded-xl hover:text-blue-700 hover:border-2 '>
                      <a href={`/?pasteId=${paste?._id}`}>
                      
                      <FontAwesomeIcon icon={faPenToSquare} />
                      </a>
                    </button>
                    <button className='border-[1px] px-[10px]  hover:text-green-700 rounded-xl'  >
                      <a href={`/pastes/${paste?._id}`}>
                      <FontAwesomeIcon icon={faEye} />
                      </a>
                    </button>
                    <button className='border-[1px] px-[10px]  hover:text-red-700 rounded-xl' onClick={() => handleDelete(paste?._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button className='border-[1px] px-[10px]  hover:text-yellow-700 rounded-xl' onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success("copied to clip-board")
                    }}>
                      <FontAwesomeIcon icon={faCopy} />
                    </button>
                    <button className='border-[1px] px-[10px]  hover:text-blue-700  rounded-xl'>
                    <FontAwesomeIcon icon={faShareNodes} />
                    </button>
                    </div>


                  <div>
                  
                  <div className="gap-x-2 flex text-black ">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Paste
