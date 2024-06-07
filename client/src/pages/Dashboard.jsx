import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [pastOrders, setPastOrders] = useState([]);
    const { user } = useContext(UserContext);

    const fetchOrderDetails = async () => {
        let orderDetails;

        if (user && user.active_orders) {
            if (user.active_orders.length === 1) {
                let orderId;
                if (typeof user.active_orders[0] === "string") {
                    orderId = user.active_orders[0];
                } else {
                    orderId = user.active_orders[0]._id;
                }
                try {
                    const response = await axios.get(`/getorder?orderId=${orderId}`);
                    orderDetails = [response.data];
                } catch (error) {
                    console.log("Error fetching order details in Dashboard");
                    console.log(error);
                }
            } else {
                orderDetails = await Promise.all(
                    user.active_orders.map(async orderId => {
                        try {
                            const response = await axios.get(`/getorder?orderId=${orderId}`);
                            return response.data;
                        } catch (error) {
                            console.error('Error fetching order details:', error);
                            return null;
                        }
                    })
                );
            }

            setActiveOrders(orderDetails.filter(order => !order.orderDetails.completed));
            setPastOrders(orderDetails.filter(order => order.orderDetails.completed));
        }
    };

    const toggleFavorite = async (orderId) => {
        try {
            await axios.post('/togglefavorite', { orderId });
            fetchOrderDetails();
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useEffect(() => {
        fetchOrderDetails();
    }, [user]);

    if (!user || user.user_type === "Deliverer") {
        return (
            <div>
                <h1>You do not have access to this page!</h1>
            </div>
        )
    }

    const buttonStyle = {
        fontSize: '24px',
        padding: '15px 35px',
        backgroundColor: '#747bff',
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        display: 'inline-block',
        marginBottom: '10px',
        padding: '9px 24px',
        fontSize: '18px',
        fontWeight: 'bold',
        backgroundColor: '#747bff',
        color: '#fff',
        borderRadius: '10px',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease'
    };

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
            <h1 style={{ marginBottom: '30px', fontSize: '40px', color: '#333' }}>
                {user ? `Dashboard for ${user.username}` : 'Dashboard'}
            </h1>
            {!!user && (
                <Link to='/order' style={buttonStyle} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#357ABD'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#747bff'}
                >
                    Place an order
                </Link>
            )}
            <h2 style={{ marginBottom: '20px', padding: '15px', fontSize: '30px', color: '#555' }}>
                Active orders:
            </h2>
            {activeOrders.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {[...activeOrders].reverse().map(order => (
                        <li key={order.orderId} style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            padding: '20px',
                            fontSize: '18px',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            color: '#555'
                        }}>
                            <div>
                                <strong>Dining hall:</strong> {order.orderDetails.dining_hall}<br />
                                <strong>Order:</strong> {order.orderDetails.food_order}<br />
                                <strong>Status:</strong> {order.orderDetails.active ? 'Out for delivery' : 'Waiting for pickup'}<br />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No active orders</p>
            )}

            <h2 style={{ marginBottom: '20px', padding: '15px', fontSize: '30px', color: '#555' }}>
                Previous orders:
            </h2>
            {pastOrders.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {[...pastOrders].reverse().map(order => (
                        <li key={order.orderId} style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            padding: '20px',
                            fontSize: '18px',
                            backgroundColor: '#f9f9f9',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                            color: '#555'
                        }}>
                            <div>
                                <strong>Dining hall:</strong> {order.orderDetails.dining_hall}<br />
                                <strong>Order:</strong> {order.orderDetails.food_order}<br />
                                <strong>Status:</strong> Completed <br />
                                <span onClick={() => toggleFavorite(order.orderId)} style={{ cursor: 'pointer' }}>
                                    {order.orderDetails.favorite ? '🌟' : '☆'}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    padding: '20px',
                    fontSize: '18px',
                    backgroundColor: '#f9f9f9',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    color: '#555'
                }} >No previous orders found :\</p>
            )}
        </div>
    );
}
