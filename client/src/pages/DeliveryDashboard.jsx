import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function OrdersDashboard() {
    const [orders, setOrders] = useState([]);
    const [myOrders, setMyOrders] = useState([])
    const [loading, setLoading] = useState(true);
    const {user, setUser, fetchUserData} = useContext(UserContext);
    const navigate = useNavigate();
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
            const curOrders = data.filter(order => !!order.deliverer_username && order.deliverer_username == user.username)
            setOrders(availableOrders);
            setMyOrders(curOrders)
            setLoading(false);
        });
    }, []);


    if(!user || user.user_type === "Customer"){
        return(
            <div>
                <h1>You do not have access to this page!</h1>
            </div>
        )
    }






    return (
        <div>
            <h1>Your Orders</h1>
            {loading ? (
                <p>Loading...</p>
            ) : myOrders.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {myOrders.map((order) => (
                        <li key={order._id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                            <div>
                                <strong>Dining hall:</strong> {order.dining_hall}<br />
                                <strong>Order:</strong> {order.food_order}<br />
                                <strong>Ordered by:</strong> {order.creator_username}<br />
                                <strong>Delivery address:</strong> {order.creator_address}<br />
                            </div>
                        </li>
                        
                    ))}
                    
                </ul>
            ) : (
                <p>No orders found</p>
            )}
        


            <h1>Available Orders</h1>
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
