import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './components/Error/ErrorPage.js'
import {
  createBrowserRouter,
  RouterProvider,
 
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import ResetPassword from './components/ResetPasword';
import NewPassword from './components/NewPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage/>
  },
  {
    path: "login/",
    element: <Login />,
  },
  {
    path: "register/",
    element: <Register />,
  },
  {
    path: "resetpassword/",
    element: <ResetPassword />,
  },
  {
    path: "newpassword",
    element: <NewPassword />
  }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
