import { useEffect } from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {addRequests, removeRequest} from "../utils/requestSlice";


const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async(status, _id) => {
        try{
            const res = axios.post(BASE_URL + "/review/" + status + "/" + _id, {}, {
                withCredentials: true,
            })
            dispatch(removeRequest(_id));
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const fetchRequests = async () => {
        try{
        const res = await axios.get(BASE_URL + "/user/requests/received",{
            withCredentials: true,
        });
        console.log(res.data.data);
        dispatch(addRequests(res.data.data));
    }
    catch(err){
        console.log(err);
    }
}

useEffect(() => {
    fetchRequests();
}, []);

if(!requests)
        return;

    if(requests.length === 0)
        return  <h1 className = "font-bold text-center mt-10 text-2xl">No Requests Found</h1>

    return(
        <div className = "flex flex-col items-center my-10">
            <h1 className = "font-bold text-2xl mb-6">Requests</h1>
            {requests.map((request) => {
                const {fromUserId} = request;
                return (
                    <div key ={request._id} className="flex justify-between items-center gap-6 m-4 p-4 rounded-lg bg-base-200 w-1/2">
                        <img className = "w-20 h-20 rounded-full object-cover" src={fromUserId.photourl} alt = "photo"/>
                        <h2 className="font-bold text-lg"> {fromUserId.firstName} {fromUserId.lastName}</h2>
                        { fromUserId.about && <p> {fromUserId.about}</p>}
                        { fromUserId.skills && <p> {fromUserId.skills}</p> }
                        <div className="flex m-5">
                        <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                        <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                        </div>
                    </div>
                )
            }
        )
    }              
        </div>
    )

}

export default Requests;