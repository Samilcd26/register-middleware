import React from 'react'
import { Link } from "react-router-dom";


export default function ResetPasword() {
  return (
    <div className='h-screen flex  justify-center items-center pt-20 bg-gradient-to-tr from-green-500 to-slate-500'>
      <div className='bg-stone-50 flex flex-col p-16 rounded-lg'>
        <p className="m-auto relative ">Reset Pasword</p>



        <p className="input-title">Email:</p>
        <input type="text" name="email" className="input-text" />

        

        {/* P leri a(link yap) */}
        
       
        
        <span className="flex justify-between">
  
        <p className="link"><Link to="/login">Login</Link></p> 
          <p className="link"><Link to="/register">Register</Link></p>
          
          </span>
          

        <button className="button" >Kayıt ol</button>
        
      </div>
    </div>
  )
}
