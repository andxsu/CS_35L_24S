import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast' ;
import {useNavigate} from 'react-router-dom';

export default function Register(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNum: '',
        address: '',
        venmo: '',
    })
    const registerUser = async (e) => {
        e.preventDefault();
        const {username, email, password, phoneNum, address, venmo} = data;
        try {
            const {data} = await axios.post('/register', {username, email, password, phoneNum, address, venmo});
            if(data.error){
                toast.error(data.error);
            }
            else{
                setData({});
                toast.success('Registration successful! Redirecting to login page...');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    return(
        <div>
            <form onSubmit={registerUser}>
                <label>Username</label> 
                <input type = 'text' placeholder = 'Enter username...' value = {data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                
                <label>Email</label> 
                <input type = 'text' placeholder = 'Enter email...' value = {data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
               
                <label>Password</label> 
                <input type= 'password' placeholder = 'Enter password...' value = {data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
               
                <label>Phone number</label> 
                <input type = 'text' placeholder = 'Enter phone number...' value = {data.phoneNum} onChange={(e) => setData({...data, phoneNum: e.target.value})}/>
                
                <label>Address</label> 
                <input type = 'text' placeholder = 'Enter address...' value = {data.address} onChange={(e) => setData({...data, address: e.target.value})}/>

                <label>Venmo</label> 
                <input type = 'text' placeholder = 'Enter venmo...' value = {data.venmo} onChange={(e) => setData({...data, venmo: e.target.value})}/>

                <button type = 'submit'>Register</button>


            </form>
        </div>
    )
}