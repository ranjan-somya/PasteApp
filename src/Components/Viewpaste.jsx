
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/Pastefile';
const Viewpaste = () => {

  const {id}=useParams();

  const allPastes=useSelector((state)=>state.paste.pastes);

  const paste=allPastes.filter((p)=>p._id === id)[0];
  console.log("Paste is",paste);
  
  return (
    <div>

      <div className='flex flex-row gap-7 place-content-between'>
        <input className='p-1 rounded-2xl border mt-2 w-[66%] pl-4'
          type='text'
          placeholder='Enter title here'
          value={paste.title}
          disabled
          onChange={(e) => paste.setTitle(e.target.value) }

        />
        {/* <button onClick={createPaste} className='border rounded-xl p-2 m-2 hover:bg-slate-400 text-white hover:text-black'>
          {
            pasteId ? "Update paste" : "Create My Paste"
          }
        </button> */}
      </div>
      <div className='mt-8'>
        <textarea
          className='border rounded-2xl mt-4 min-w-[500px] p-4 h-[400px]
        '
          value={paste.content}
          placeholder='Enter conent here'
          disabled
          onChange={(e) =>  paste.setValue(e.target.value) }
        />
      </div>
    </div>
  )
}

export default Viewpaste
