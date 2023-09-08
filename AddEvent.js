import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
//to navigate to user after add use immediately

function AddEvent() {
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [err,seterr] = useState('')
  const onSubmit = (data) => {
  
    axios.post('http://localhost:4803/event-api/create',data)
    .then(res=>{
      if(res.status==201){
        seterr("");
        navigate("/dashboard")
      }
    })
    .catch(err=>{
      if(err.response){
        seterr(err.message)
      }
      else if (err.request){
        seterr(err.message)
      }
      else{
        seterr(err.message)
      }
    })
  };

  return (
    <div className='addevent'>
      <p className="display-4 text-center">Add new Event</p>
      {err.length!==0 && <p className='text-danger tect-center'>{err}</p>}
      <div className="row">
        <div className="col-11 col-sm-8 col-md-6 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" {...register("title", { required: true })} />
              {errors.name && <span className="text-danger">Title is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <input type="description" className="form-control" {...register("description", { required: true })} />
              
            </div>
            <button type="submit" className="btn btn-success">
              Add Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
