import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from "react-router-dom";

const h2Style={ marginBottom: '20px', padding: '15px', fontSize: '30px', color: '#555' };

const labelStyle = {
    fontSize: '20px',
    marginBottom: '10px',
    display: 'block',
    color: '#555'
};

const inputStyle = {
    width: '100%',
    maxWidth: '600px',
    padding: '10px 20px',
    border: '2px solid #ddd',
    borderRadius: '25px',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '20px',
    transition: 'border-color 0.3s',
};

const buttonStyle = {
    fontSize: '18px',
    padding: '10px 20px',
    cursor: 'pointer',
    marginBottom: '20px',
};

export default function Account() {
    const {user, fetchUserData} = useContext(UserContext);
    let navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        email: '',
        phoneNum: '',
        address: '',
        venmo: '',
    });

    useEffect(() => {
        // Initialize the form with the user's current data
        if (user) {
            setData({
                username: user.username,
                email: user.email,
                phoneNum: user.phoneNum,
                address: user.address,
                venmo: user.venmo
            });
        }
    }, [user]);

    const updateUser = async (e) => {
        e.preventDefault();
        const {username, email, phoneNum, address, venmo} = data;
        try {
            const {data} = await axios.post('/update', {username, email, phoneNum, address, venmo});
            if(data.error){
                toast.error(data.error);
            }
            else{
                toast.success('Update success!');
                fetchUserData();
                navigate('/');
            }
        } catch (error) {
            console.log(error);  
        }
    }

    return (
        <div style={{
            position: 'relative',
            paddingBottom: '100px',
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '50em',
            margin: '0 auto'
          }}>
            <h1 style={{ marginBottom:'30px', fontSize: '40px', color: '#333' }}>
              {`${user.username}`}'s account
            </h1>
            <h2 style={h2Style}>
              Update information:
            </h2>

            <form onSubmit={updateUser}>
                <label style={labelStyle}>Username</label> 
                <input style={inputStyle} type = 'text' placeholder = {user.username} value = {data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
               
                <label style={labelStyle}>Phone number</label> 
                <input style={inputStyle} type = 'text' placeholder = {user.phoneNum} value = {data.phoneNum} onChange={(e) => setData({...data, phoneNum: e.target.value})}/>
                
                <label style={labelStyle}>Address</label> 
                <input style={inputStyle} type = 'text' placeholder = {user.address} value = {data.address} onChange={(e) => setData({...data, address: e.target.value})}/>

                <label style={labelStyle}>Venmo</label> 
                <input style={inputStyle} type = 'text' placeholder = {user.venmo} value = {data.venmo} onChange={(e) => setData({...data, venmo: e.target.value})}/>

                <br/>
                <button style={buttonStyle} type = 'submit'>Update</button>

            </form>
            
          </div>
  
    );
}
