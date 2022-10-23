import React, { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";



const Register = () => {
  const inputName = useRef(null);
  const inputPassword = useRef(null);
  const inputEmail = useRef(null);
  const inputImage = useRef(null);
  // POST request using fetch inside useEffect React hook
  const newUser = async () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "name": inputName.current.value,
        "password": inputPassword.current.value,
        "email": inputEmail.current.value,
        "profile_image": inputImage.current.value
      })
    };


    await fetch("http://localhost:5000/api/auth/register", requestOptions)
      .then(response => response.json())
      .then(data => data.success === true ? toast.success('Kayıt İşlemi Başarılı 🙉', {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }) : toast.error('İşlem Başarısız 🙈', {
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
  // empty dependency array means this effect will only run once (like componentDidMount in classes)

  return (
    <div className="h-screen flex  justify-center items-center pt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">

      <div className="bg-stone-50 flex flex-col p-16 rounded-lg">



        <p className="m-auto relative ">Register</p>


        <p className="input-title ">Name:</p>
        <input type="text" name="name" className="input-text" ref={inputName} />

        <p className="input-title">Password:</p>
        <input type="password" name="password" className="input-text" ref={inputPassword} />

        <p className="input-title">Email:</p>
        <input type="text" name="email" className="input-text" ref={inputEmail} />

        <p className="input-title">Profile Image:</p>
        <input type="file" className="input-file" ref={inputImage} />


        {/* P leri a(link yap) */}
        <span className="flex justify-between"><p className="link"><Link to="/login">Login</Link></p>
        <p className="link"><Link to="/resetpassword">Reset Password</Link></p></span>
        <button className="button" onClick={() => newUser()}>Kayıt ol</button>
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

export default Register
