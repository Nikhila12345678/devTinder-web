import {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "../utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlelogin = async() => {
        
        try{
            const res = await axios.post(BASE_URL + "/login",{
                emailId,
                password,
        },
    {withCredentials :true});
    console.log(res.data);
    dispatch(addUser(res.data));
    return navigate("/");
        }
        catch(err){
            console.log(err.message);
        }
    };

    return (
        <div className = "flex justify-center my-10">
        <div className="card card-border bg-base-100 w-96">
  <div className="card-body p-10 bg-neutral rounded-lg">
    <h2 className="card-title justify-center">Login</h2>
    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">Email Id:</legend>
  <input type="text" value = {emailId} 
  placeholder="xxx@gmail.com" className = "input input-bordered w-full max-w-xs rounded-lg"
  onChange = {(e) => setEmailId(e.target.value)} />
</fieldset>
    </div>

    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">Password</legend>
  <input type="text" 
  value = {password}
   placeholder="...." className = "input input-bordered w-full max-w-xs rounded-lg"
   onChange = {(e) => setPassword(e.target.value)} />
</fieldset>
    </div>

    <div className="card-actions justify-center m-3">
      <button className="btn btn-primary" onClick = {handlelogin}>Login</button>
    </div>
  </div>
</div>
</div>
    )
}

export default Login;