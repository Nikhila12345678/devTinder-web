import {useState} from "react";
import Usercard from "./Usercard.jsx";
import {useDispatch} from "react-redux";
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {addUser} from "../utils/userSlice";

const EditProfile = ({user}) => {
        const [firstName, setFirstName] = useState(user.firstName);
        const [lastName, setLastName] = useState(user.lastName);
        const [about, setAbout] = useState(user.about);
        const [skills, setSkills] = useState(user.skills);
        const [photourl, setPhotourl] = useState(user.photourl);
        const [error, setError] = useState("");
        const [showtoast, setShowtoast] = useState(false);
        const dispatch = useDispatch();

        const saveProfile = async () => {
            setError("");
            try{
                const res = await axios.patch(BASE_URL + "/profile/edit", {
                    firstName, lastName, about, skills, photourl
                }, {
                    withCredentials: true
                });
                dispatch(addUser(res.data));
                setShowtoast(true);
                setTimeout(() => {
                    setShowtoast(false);
                }, 3000);
            } catch (error) {
                setError(error.response.message);
                console.error("Error updating profile:", error);
            }
        }
    return (
        <div className="flex justify-center my-10">
        <div className = "flex justify-center mx-10">
        <div className="card card-border bg-base-100 w-96">
  <div className="card-body p-10 bg-neutral rounded-lg">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">First Name:</legend>
  <input type="text" value = {firstName} 
  placeholder="xxx@gmail.com" className = "input input-bordered w-full max-w-xs rounded-lg"
  onChange = {(e) => setFirstName(e.target.value)} />
</fieldset>
    </div>

    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">Last Name</legend>
  <input type="text" 
  value = {lastName}
   placeholder="...." className = "input input-bordered w-full max-w-xs rounded-lg"
   onChange = {(e) => setLastName(e.target.value)} />
</fieldset>
    </div>

    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">About</legend>
  <input type="text" 
  value = {about}
   placeholder="...." className = "input input-bordered w-full max-w-xs rounded-lg"
   onChange = {(e) => setAbout(e.target.value)} />
</fieldset>
    </div>

    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">Skills</legend>
  <input type="text" 
  value = {skills}
   placeholder="...." className = "input input-bordered w-full max-w-xs rounded-lg"
   onChange = {(e) => setSkills(e.target.value)} />
</fieldset>
    </div>

    <div>
        <fieldset className="fieldset w-full max-w-xs">
  <legend className="fieldset-legend">Photo URL</legend>
  <input type="text" 
  value = {photourl}
   placeholder="...." className = "input input-bordered w-full max-w-xs rounded-lg"
   onChange = {(e) => setPhotourl(e.target.value)} />
</fieldset>
    </div>

    {error && <p className="text-red-500">{error}</p>}
    <div className="card-actions justify-center m-3">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>
</div>
        <Usercard user = {{firstName, lastName, about, skills, photourl}} />
        
        {showtoast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile updated successfully.</span>
            </div>
          </div>
        )}

</div>
    )
}

export default EditProfile;