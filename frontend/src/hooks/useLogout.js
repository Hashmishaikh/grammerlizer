import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../api/publicRequest";

const useLogout = () => {
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    const logout = async () => {
        setLoading(true);
        try {
            // const data = await fetch('/api/auth/logout',{
            //     method:"POST",
            //     headers:{"Content-Type": "application/json"},
            //     // body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
            // })
            const data = await publicRequest.post('/api/auth/logout');
            if(data.error){
                throw new Error(data.error)
            }
            sessionStorage.removeItem("authUser");
            navigate('/signin');
        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false); 
        }
    }

    return {loading,logout}
}

export default useLogout