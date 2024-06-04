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

    return (
        <div style={{margin: '0 auto', padding: '20px', width:'100%'}}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>Register</h1>

          <form onSubmit={registerUser} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Username</label>
            <input type='text' placeholder='Enter username...' value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Email</label>
            <input type='text' placeholder='Enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Password</label>
            <input type='password' placeholder='Enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Phone number</label>
            <input type='text' placeholder='Enter phone number...' value={data.phoneNum} onChange={(e) => setData({ ...data, phoneNum: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Address</label>
            <input type='text' placeholder='Enter address...' value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>Venmo</label>
            <input type='text' placeholder='Enter venmo...' value={data.venmo} onChange={(e) => setData({ ...data, venmo: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      
            <label style={{ fontSize: '20px', fontWeight: 'bold' }}>User Type</label>
            <select name='userType' value={data.user_type} onChange={(e) => setData({ ...data, user_type: e.target.value })} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color:'grey' }}>
                <option value='' disabled>Select user type</option>
                <option value='Customer'>Customer</option>
                <option value='Deliverer'>Deliverer</option>
            </select>
      
            <button type='submit' style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#747bff', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Register</button>
          </form>
        </div>
      );
      
}