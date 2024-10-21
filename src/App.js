import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Paste from './Components/Paste';
import Viewpaste from './Components/Viewpaste';

const  route=createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {
      path:'/pastes',
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <Navbar/>
        <Viewpaste/>
      </div>
    }
  ]
)
function App() {
  return (
    <div className='border-2 border-black h-auto w-[900px] px-[100px] pb-[30px] bg-slate-300'>
      <div className='text-blue-700 text-[30px] font-serif font-bold m-2'>
        PasteApp..
      </div>
     <RouterProvider router={route}/>
    </div>
  );
}

export default App;
