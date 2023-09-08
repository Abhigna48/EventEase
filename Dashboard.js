import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {Modal,Button, ModalHeader, ModalTitle, ModalBody, ModalFooter} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Dashboard() {
  let navigate=useNavigate();
  let {register,handleSubmit,formState:{errors},setValue,getValues} = useForm()
  let [users,setUsers] = useState([]);
  let [err,seterr] = useState('')
  let [show,setShow] = useState(false);
  let [useredit,setUseredit] = useState({});
  let [userdel,setdel] = useState({})
  //for modal
  let showModal = ()=>setShow(true)

  let closeModal = ()=>setShow(false)
  //edit user
  let edit=(obj)=>{
    showModal()
    setUseredit(obj)
    setValue("title",obj.title)
    setValue("description",obj.description)
  }
  //save user
  let save=()=>{
    closeModal()
    //to get edited details
    let modifiedUser=getValues()
    console.log(modifiedUser)
    modifiedUser.id = useredit.id;
    //set id to user modified so that it is easy to update
    axios.put(`http://localhost:4803/event-api/update/${modifiedUser.id}`,modifiedUser)
    .then(res=>{
      if (res.status===200){
        getusers()
      }
    })
  }

  let getusers=()=>{
    axios.get("http://localhost:4803/event-api/events")
    .then(response=>{
      if (response.status===200){
        setUsers(response.data)
      }
    }).catch(err=>{
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
  }
  useEffect(()=>{getusers()
  },[])

  let onDelete=(obj)=>{
    //let deleteObj.id = obj.id;
      axios.delete(`http://localhost:4803/event-api/delete/${obj.id}`)
    .then((res)=>{
      if (res.status === 200){
        getusers();
      }
    })
      }

  

  return (
    <div className='mt-3'>
      {err.length!==0 && <p className='text-danger display-2'>{err}</p>}
     <div className='text-center'>
      <Link to ='/addevent'><button className='btn btn-primary mx-auto'>Add Event</button></Link>
      </div>
      <div className='text-center row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4'>
        {
          users.map(obj=><div key={obj.id}>
          <div className='card m-3 p-3 border-secondary bg-info' style={{"boxShadow":"1px 1px 4px black"}}>
            <div className='card-body'>
            <h6>Title:{obj.title}</h6>
            <h6>description:{obj.description}</h6>
            <button className='bg-warning float-start p-1' style={{"border":"none","borderRadius":"4px"}} onClick={()=>edit(obj)}>Edit</button>
            <button className='bg-danger float-end p-1' style={{"border":"none","borderRadius":"4px"}} onClick={()=>onDelete(obj)}>Delete</button>
            </div>
          </div>
          </div>
            )}
      </div>
      <Modal show={show}
      onHide={closeModal}
      backdrop="static"
      centered
      className='modal'>
        <ModalHeader>
          <ModalTitle>Edit event</ModalTitle>
        </ModalHeader>
        <ModalBody>
          {/*form to edit*/}
          <form>
            <div className="mb-3">
              <label htmlFor="name">Title</label>
              <input type="text" className="form-control" {...register("name", { required: true })} />
            </div>
            
            <div className="mb-3">
              <label htmlFor="dob">Description</label>
              <input type="text" className="form-control" {...register("dob", { required: true })} />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={save}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Dashboard
