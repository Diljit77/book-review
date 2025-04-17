
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Listing from './pages/Listing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Bookdetail from './pages/Bookdetail';
import UserProfile from './pages/Profile';
import AdminBookPage from './pages/AdminBookpage';
import { createContext, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

const MyContext=createContext();
function App() {
  const [islogin,setislogin]=useState(false);
  const checlogin=()=>{
  const user=JSON.parse(localStorage.getItem("user"));
  if(user){
    setislogin(true);

  }else{
    setislogin(false);
  }
  }
  useEffect(()=>{
checlogin();
  })
  const [alertbox,setalertbox]=useState({
    msg:"please fill",
    error:false,
    open:false
  });

const value={
  alertbox,
    setalertbox,
    islogin,setislogin

}
const handleclose=(event,reason)=>{
  if(reason==="clickaway"){
    return ;
  }
  setalertbox({
    open:false
  });
}


  return (
    <>
    <MyContext.Provider value={value} >
    <Snackbar open={alertbox.open} autoHideDuration={6000} oncClose={handleclose}  >
      <Alert onClose={handleclose} severity={alertbox.error===false?"success":"error"}
      variant="filled" sx={{width:"100%"}} >
     {alertbox.msg} 
      </Alert>

    </Snackbar>

 
    <Router >
      <Routes>
     <Route path='/' element={<Home />} />
     <Route path='/listing' element={<Listing/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/signup' element={<Signup />} />
     <Route path='/book/:id' element={<Bookdetail />} />
     <Route path='/profile' element={<UserProfile />} />
     <Route path='/adminbook' element={<AdminBookPage />} />


      </Routes>
    </Router>
    </MyContext.Provider>
    </>
  )
}
export { MyContext};
export default App;
