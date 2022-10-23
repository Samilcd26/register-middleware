import React, { useRef } from 'react'
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

export default function NewPassword() {
    let password = useRef(null)


    const newpassword = async () => {

        var path = window.location.search.split("resetPasswordToken=")[1]
        

         const requestOptions = {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({
                 "password": password.current.value,
             })
         };
        let URL="http://localhost:5000/api/auth/newpassword?resetPasswordToken="+path
         await fetch(URL, requestOptions)
             .then(response => response.json())
             .then(data => data.success === true ? toast.success('Giriş Başarılı 🙉', {
                 position: "bottom-right",
                 autoClose: 1500,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
             }) : toast.error('Giriş Başarısız 🙈', {
                 position: "bottom-right",
                 autoClose: 1500,
                 hideProgressBar: false,
                 closeOnClick: true,
                 pauseOnHover: true,
                 draggable: true,
                 progress: undefined,
                 theme: "light",
             }))



    }

  return (
    <div className='h-screen flex  justify-center items-center pt-20 bg-gradient-to-tr from-green-500 to-slate-500'>
      <div className='bg-stone-50 flex flex-col p-16 rounded-lg'>
        <p className="m-auto relative ">Reset Pasword</p>



        <p className="input-title">New Password:</p>
        <input type="text" name="email" className="input-text" ref={password} />

        

        {/* P leri a(link yap) */}
        
       
        
        <span className="flex justify-between">
  
        <p className="link"><Link to="/login">Login</Link></p> 
          <p className="link"><Link to="/register">Register</Link></p>
          
          </span>
          

        <button className="button" onClick={()=>newpassword()}  >New Password Save</button>
        
      </div>
    </div>
  )
}
