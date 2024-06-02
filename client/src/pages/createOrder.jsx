import {useContext} from 'react';
import {UserContext} from '../../context/userContext';
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast' ;
import {useNavigate} from 'react-router-dom';

export default function CreateOrder() {
    const navigate = useNavigate();
    const {user} = useContext(UserContext);
    
    
    
    

    const [data, setData] = useState({
        dining_hall: '',
        creator_username: '',
        food_order: '',
        notes_for_deliverer: '',
        active: true,
        out_for_delivery: false,
    })

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (user){
            setData(prevData => ({
                ...prevData,
                creator_username: user.username
            }))
        }
    }, [user, navigate]);
    
    
    const createorder = async (e) => {
        e.preventDefault();
        const {dining_hall, creator_username, food_order, notes_for_deliverer, active, out_for_delivery} = data;
        try {
            const {data} = await axios.post('/order', {dining_hall, creator_username, food_order, notes_for_deliverer, active, out_for_delivery})
            if(data.error){
                toast.error(data.error)
            }
            else{
                setData({});
                toast.success('Order created!');
                navigate('/dashboard');
            }
        } catch (error) {
            
        }
    }
    return(
        <div>
        <form onSubmit={createorder}>
            <label>Dining hall</label> 
            <input type = 'text' placeholder = 'Enter dining hall...' value = {data.dining_hall} onChange={(e) => setData({...data, dining_hall: e.target.value})}/>
            
            <label>Food order</label> 
            <input type = 'text' placeholder = 'Enter food orer...' value = {data.food_order} onChange={(e) => setData({...data, food_order: e.target.value})}/>
           
            <label>Notes for deliverer</label> 
            <input type= 'text' placeholder = 'Enter notes...' value = {data.notes_for_deliverer} onChange={(e) => setData({...data, notes_for_deliverer: e.target.value})}/>
           
            <button type = 'submit'>Place order</button>


        </form>
    </div>
    )
}

