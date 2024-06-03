import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    // const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const {user, setUser, fetchUserData} = useContext(UserContext);
    
    const fetchOrderDetails = async () => {
        let orderDetails;
        if (user && user.active_orders) {
            if (user.active_orders.length === 1) {
                const orderId = user.active_orders[0]._id;
                try{
                    const response = await axios.get(`/getorder?orderId=${orderId}`);
                    orderDetails = [response.data]
                } 
                catch(error) {
                    console.log("Error fetching order details in Dashboard");
                    console.log(error)
                }
            }
            else{
                    orderDetails = await Promise.all(
                    user.active_orders.map(async orderId => {
                        try {
                            const response = await axios.get(`/getorder?orderId=${orderId}`);
                            // console.log("Creator")
                            // console.log(response.data.creator)
                            
                            return response.data;
                        } catch (error) {
                            console.error('Error fetching order details:', error);
                            return null;
                        }
                    })
                );
            }
            
            setOrders(orderDetails.filter(order => order !== null));
        }
    };
    
    useEffect(() => {
        console.log("user")
        console.log(user)
        fetchOrderDetails()
    }, [user]);

    const orderLinkStyle = {
        fontSize: '24px',          // Increase the font size of the "Place an order" link
        padding: '12px 24px',      // Increase padding for better appearance
        backgroundColor: '#747bff', // Background color for the link
        color: '#fff',             // Text color for better contrast
        borderRadius: '12px',      // Rounded edges
        textDecoration: 'none',    // Remove underline
    };

    return (
        <div>
            <h1 style={{ fontSize: '40px' }}>Dashboard</h1>
            {!!user && <h2>Hi {user.username}!</h2>}
            {!!user && <Link to='/order' style={orderLinkStyle} >Place an order</Link>}
            <h2>Your orders</h2>
            {orders.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {[...orders].reverse().map(order => (
                    <li key={order.orderId} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                        <div>
                            <strong>Dining hall:</strong> {order.orderDetails.dining_hall}<br />
                            <strong>Order:</strong> {order.orderDetails.food_order}<br />
                            <strong>Status:</strong> {order.orderDetails.out_for_delivery ? 'Out for delivery' : 'Waiting for pickup'}<br />
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No active orders</p>
        )}
        </div>
    );
}
