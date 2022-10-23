import React, { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import log from '../asset/login.png'
import { Link } from "react-router-dom";


const Login = () => {

    const inputEmail = useRef(null)
    const inputPassword = useRef(null)


    const login = async () => {

        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": inputEmail.current.value,
                "password": inputPassword.current.value,
            })
        };


        await fetch("http://localhost:5000/api/auth/login", requestOptions)
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
        <div className='h-screen grid grid-cols-5 grid-rows-4 bg-gradient-to-r from-cyan-500 to-blue-500 '>
            <div className='flex flex-col col-start-3 row-start-2 row-span-2 items-center justify-center rounded-lg  bg-stone-50 '>
                <img src={log} width="100" height="50" />
                
                <p className="input-title ">Email:</p>
                <input type="text" name="name" className="input-text" ref={inputEmail} />

                <p className="input-title">Password:</p>
                <input type="password" name="password" className="input-text" ref={inputPassword} />

                <button className='button px-5 text-black bg-cyan-200 hover:bg-blue-500' onClick={() => login()}>Giriş</button>

                <span className="flex "><p className="link mx-5"><Link to="/register">Register</Link></p>
                <p className="link "><Link to="/resetpassword">Reset Password</Link></p></span>

            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Login
