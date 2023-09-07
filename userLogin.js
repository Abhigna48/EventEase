import React,{useState,useContext, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import '../App.css'
import { useNavigate } from 'react-router-dom';
import { proContext } from '../Contexts/prologin';
import { Link } from 'react-router-dom';
function Login() {
  let [curuser,login,msg,status,logout,setuser,type] = useContext(proContext)
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err,seterr] = useState('')
  const onSubmit = (data) => {
    login(data)
  };
  useEffect(()=>{
    if (type == "admin"){
      navigate('/dashboard')
    }
    else if (status===true ){
      navigate('/profile')
    }
  },[status])
  return (
    <div className='adduser bg-white bg-opacity-50'>
      <p className="display-4 text-center">User Login</p>
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
            <div className='text-center'>
            <div className='mb-3'>
            <button type="submit" className="btn btn-success mx-auto" >
              Login
            </button>
            </div>
            <div>
            <Link to="/register" className='text-decoration-none text-dark'> Create Account</Link>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
