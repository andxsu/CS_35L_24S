import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast' ;
import {useNavigate} from 'react-router-dom';

export default function Forgot(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
    })
    const registerUser = async (e) => {
        e.preventDefault();
        const {email} = data;
        try {
            const {data} = await axios.post('/forgot', {email});
            if(data.error){
                toast.error(data.error);
                console.log("balls and dick");
            }
            else{
                setData({});
                toast.success('An email will be sent to you very shortly with a temporary password! Please use it to login.');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <form onSubmit={registerUser}>
                <label>Email</label> 
                <input type = 'text' placeholder = 'Enter email...' value = {data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
               
                <button type = 'submit'>Submit</button>
            </form>
        </div>
    )
}