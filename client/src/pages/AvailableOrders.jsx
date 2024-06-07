import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { SearchBar } from '../components/SearchBar';

export default function OrdersDashboard() {
    const [orders, setOrders] = useState("");
    const [myOrders, setMyOrders] = useState([])
    const [loading, setLoading] = useState(true);
    const {user, setUser, fetchUserData} = useContext(UserContext);
    const navigate = useNavigate();
    const [pastOrders, setPastOrders] = useState([])
    const [filter, setFilter] = useState([])
    // console.log(user);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get('/getallorders');
            return response.data;
        } catch (error) {
            console.error('Error fetching all orders:', error);
            return [];
        }
    };

    


    useEffect(() => {
        fetchAllOrders().then((data) => {

            
            const availableOrders = data.filter(order => !order.active && !!order.creator_address);

            setOrders(availableOrders);
            
            setLoading(false);
        });
    }, [user]);

    useEffect(() => {
        fetchAllOrders().then((data) => {

            
            const availableOrders = data.filter(order => !order.active && !!order.creator_address);

            const filteredOrders = availableOrders.filter(order => order.dining_hall.toLowerCase().includes(filter.toLowerCase()));

            setOrders(filteredOrders);
            
            setLoading(false);
        });
    }, [filter]);


    if(!user || user.user_type === "Customer"){
        return(
            <div>
                <h1>You do not have access to this page!</h1>
            </div>
        )
    }






    return (
        <div>
            <h1>Available Orders</h1>
            <div style={{
                position: 'relative',
                paddingBottom: '100px',
                borderRadius: '15px',
                padding: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                width: '50em',
                margin: '0 auto'
            }}>
                <h2>Search</h2>
                <SearchBar setFilter={setFilter} />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : orders.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {orders.map((order) => (
                        <li key={order._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                            <div>
                                <strong>Dining hall:</strong> {order.dining_hall}<br />
                                <strong>Order:</strong> {order.food_order}<br />
                                <strong>Ordered by:</strong> {order.creator_username}<br />
                                <strong>Delivery address:</strong> {order.creator_address}<br />
                                <strong>Contact info:</strong> {order.creator_phone} <br />
                                <strong>Venmo:</strong>{order.creator_venmo} <br />
                                <strong>Notes: </strong>{order.notes_for_deliverer} <br />
                                <button onClick={() => navigate(`/acceptorder/:${order._id}`)}>Accept Order</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found</p>
            )}
            
        </div>
    );
}
