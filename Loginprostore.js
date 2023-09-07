import {useState} from 'react';
import axios from 'axios';
import { proContext } from './prologin';
function LoginproStore({children}){
  let [currentuser,setuser] = useState({});
  let [msg,setmsg]=useState(" ")
  let [err,seterr] = useState("");
  let [ls,setls] = useState(false)
  let [type,setType] = useState("user")
  const logout=()=>{
    localStorage.clear()
    setls(false)
    setmsg(" ")
  }
  const login=(user)=>{
    axios.post("http://localhost:4803/product-api/product-login",user)
    .then(res=>{
      if (res.data.message==="valid"){
        if (res.data.pro.product == "admin"){
          setType("admin")
        }
        localStorage.setItem("token-p",res.data.token);
        setuser({...res.data.user})
        setls(true)
        setmsg("sucessful login")
      }else if(res.data.message==="ip"){
        setmsg("invalid password")
      }else{
        setmsg("invalid username")
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
  }
  console.log(currentuser)
  return(
    <proContext.Provider value={[currentuser,login,msg,ls,logout,setuser,type]}>
      {children}
    </proContext.Provider>
  )
}
export default LoginproStore