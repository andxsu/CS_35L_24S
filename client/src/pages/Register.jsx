import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast' ;
import {useNavigate} from 'react-router-dom';

const labelStyle = {
    fontSize: '20px',
    marginBottom: '10px',
    display: 'block'
};

const inputStyle = {
    fontSize: '18px',
    padding: '10px',
    width: '100%',
    marginBottom: '20px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    fontSize: '18px',
    padding: '10px 20px',
    cursor: 'pointer'
};

export default function Register(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        phoneNum: '',
        address: '',
        venmo: '',
        user_type: '',
    })
    const registerUser = async (e) => {
        e.preventDefault();
        const {username, email, password, phoneNum, address, venmo, user_type} = data;
        try {
            const {data} = await axios.post('/register', {username, email, password, phoneNum, address, venmo, user_type});
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
                <label style={labelStyle}>Username</label> 
                <input style={inputStyle} type = 'text' placeholder = 'Enter username...' value = {data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                
                <label style={labelStyle}>Email</label> 
                <input style={inputStyle} type = 'text' placeholder = 'Enter email...' value = {data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
               
                <label style={labelStyle}>Password</label> 
                <input style={inputStyle} type= 'password' placeholder = 'Enter password...' value = {data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
               
                <label style={labelStyle}>Phone number</label> 
                <input style={inputStyle} type = 'text' placeholder = 'Enter phone number...' value = {data.phoneNum} onChange={(e) => setData({...data, phoneNum: e.target.value})}/>
                
                <label style={labelStyle}>Address</label> 
                <input style={inputStyle} type = 'text' placeholder = 'Enter address...' value = {data.address} onChange={(e) => setData({...data, address: e.target.value})}/>

                <label style={labelStyle}>Venmo</label> 
                <input style={inputStyle} type = 'text' placeholder = 'Enter venmo...' value = {data.venmo} onChange={(e) => setData({...data, venmo: e.target.value})}/>

                <label style={labelStyle}>User Type</label>
                <select style={inputStyle}
                    name='userType' 
                    value={data.user_type} 
                    onChange={(e) => setData({...data, user_type: e.target.value})}>
                    <option value="" disabled>Select user type</option>
                    <option value="Customer">Customer</option>
                    <option value="Deliverer">Deliverer</option>
                    
                </select>
                

                <button style={buttonStyle} type = 'submit'>Register</button>

            </form>
        </div>
    )
}