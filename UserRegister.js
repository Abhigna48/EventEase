import React,{useState,useContext} from 'react';
import { useForm } from 'react-hook-form';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FcCheckmark,FcCancel } from "react-icons/fc";
import { proContext } from '../Contexts/prologin';
function Register() {
  let [curuser,login,msg,status,logout,setuser,type] = useContext(proContext)
  let navigate = useNavigate();
  let [msgs,setmsg] = useState('')
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err,seterr] = useState('')
  const onSubmit = (data) => {
    axios.post("http://localhost:4803/product-api/product-signup",data)
    .then(res=>{
      if(res.status===201){
        setmsg("Registration Successful")
        navigate("/profile")
        seterr("")
      }else if(res.status===200){
        seterr("User exits already")
      }
    })
    .catch((err)=>{
      if (err.response){
        seterr(err.message);
      } else if (err.request){
        seterr(err.message);
      }else{
        seterr(err.message);
      }
    })
  };

  return (
    <div className='adduser bg-white opacity-75'>
      <p className="display-4 text-center">User Registration</p>
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="name">Username</label>
              <input type="text" className="form-control" {...register("product", { required: true })} />
              {errors.username && <span className="text-danger">Username is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="name">Password</label>
              <input type="password" className="form-control" {...register("password", { required: true })} />
              {errors.password && <span className="text-danger">Password is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" {...register("email", { required: true })} />
              {errors.email && <span className="text-danger">Email is required</span>}
            </div>
            <button type="submit" className="btn btn-success mb-3">
              Register
            </button>
          </form>
        </div>
      </div>
      {msgs?.length !== 0 && (
        <div className='alert alert-success text-center mx-auto' role='alert' style={{"width":"200px"}}>
          <i className='fas fa-check-circle'><FcCheckmark/></i> {msgs}
        </div>
      )}
      {err?.length !== 0 && (
        <div className='alert alert-danger text-center mx-auto' role='alert' style={{"width":"200px"}}>
          <i className='fas fa-times-circle'><FcCancel/></i>{err}
        </div>
      )}
    </div>
  );
}

export default Register;
