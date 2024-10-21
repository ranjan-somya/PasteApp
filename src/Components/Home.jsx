import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/Pastefile';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes=useSelector((state)=>state.paste.pastes);
 const dispatch=useDispatch();

 useEffect(() => {
  if (pasteId) {
   const paste=allPastes.find((p)=>p._id === pasteId);
   setTitle(paste.title);
   setValue(paste.content);
  }
 }, [pasteId])
  function createPaste() {
      const paste={
        title:title,
        content:value,
        _id:pasteId ||
          Date.now().toString(36),
          createdAt:new Date().toISOString(),
      }
      
      
      if (pasteId) {
        dispatch(updateToPastes(paste))
      } else {
        dispatch(addToPastes(paste))
      }
      // After creationn or  updatiion 
      setTitle('');
      setValue('');
      setSearchParams({});
  }

  return (

    <div className='min-w-[600px] '>

      <div className='flex w-[690px]  gap-8 place-content-between flex-wrap  p-2 m-2 '>
        <input className=' rounded-2xl border mt-2 w-[73%] pl-4'
          type='text'
          placeholder='Enter title here'
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}

        />
        <button onClick={createPaste} className='border-2 border-blue-400 rounded-xl p-2 m-2  hover:bg-zinc-800 text-black hover:text-white transition duration-700'>
          { 
            pasteId ? "Update paste" : "Create My Paste"
          }
        </button>
      </div>

      <div className='mt-8 rounded-tl-xl'>
        
        <div className="min-w-[700px] flex border-1  rounded-t-2xl items-center select-none group p-4 place-content-between bg-white">
          <div className='flex flex-row gap-x-[6px]  '>

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
           
          </div>
          <div className='p-2 rounded-tl-xl rounded-tr-xl'>

            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              
              </div>
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center hover:text-blue-800  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
          </div>
              </div>
            
            
        <textarea
          className='border   min-w-[700px] p-4 h-[400px]
        '
          value={value}
          placeholder='Enter conent here'
          onChange={(e) => { setValue(e.target.value) }}
        />
      
      </div>
    </div>
  )
}

export default Home
