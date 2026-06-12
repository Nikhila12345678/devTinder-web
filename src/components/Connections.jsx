import axios from "axios";
import {BASE_URL} from "../utils/constants";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {addConnections} from "../utils/connectionSlice";
import {useSelector} from "react-redux";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
           const res = await axios.get(BASE_URL + "/user/connections",{
            withCredentials : true
           });
           dispatch(addConnections(res.data.data));
           console.log(res.data.data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchConnections();
    },[]);

    if(!connections)
        return;

    if(connections.length === 0)
        return  <h1 className = "text-bold text-2xl">No Connections Found</h1>

    return(
        <div className = "flex flex-col items-center my-10">
            <h1 className = "font-bold text-2xl mb-6">Connections</h1>
            {connections.map((connection) => {
                const {firstName, lastName, photourl, about, skills} = connection;
                return (
                    <div key ={connection._id} className="flex items-center gap-6 m-4 p-4 rounded-lg bg-base-200 w-1/2">
                        <img className = "w-20 h-20 rounded-full object-cover" src={photourl} alt = "photo"/>
                        <h2 className="font-bold text-lg"> {firstName} {lastName}</h2>
                        { about && <p> {about}</p>}
                        { skills && <p> {skills}</p> }
                    </div>
                )
            }
        )
    }              
        </div>
    )
}


export default Connections;