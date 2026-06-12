import axios from "axios";
import {useDispatch} from "react-redux";
import {BASE_URL} from "../utils/constants";
import {removeUserFromFeed} from "../utils/feedSlice";

const Usercard = ({user}) => {
    const {firstName, lastName, photourl, skills, about} = user;
    const dispatch = useDispatch();

    const handleRequest = async (status, _id) => {
      try{
        const res = await axios.post(BASE_URL + "/send/" + status + "/" + _id, {},{
          withCredentials:true,
        })
        dispatch(removeUserFromFeed(_id));
      }
      catch(err){
        console.log(err);
      }
    }

    return(
    <div className="card bg-base-200 w-70 shadow-sm rounded-3xl">
  <figure>
    <img
      src={user.photourl}
      alt="photo"
      className="h-57 w-full" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName}  {lastName}</h2>
    <p>{about}</p>
    {skills && <p>{skills}</p>}
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleRequest("ignored", user._id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleRequest("intrested", user._id)}>Interested</button>
    </div>
  </div>
</div>
)
}

export default Usercard;