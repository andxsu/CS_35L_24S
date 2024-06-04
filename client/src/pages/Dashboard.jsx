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
        padding: '15px 35px',      // Increase padding for better appearance
        backgroundColor: '#747bff', // Background color for the link
        color: '#fff',             // Text color for better contrast
        borderRadius: '12px',      // Rounded edges
        textDecoration: 'none',    // Remove underline
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
            <h1 style={{ marginBottom:'30px', fontSize: '40px', color: '#333' }}>
              {user ? `Dashboard for ${user.username}` : 'Dashboard'}
            </h1>
            {!!user && (
              <Link to='/order' style={{
                ...orderLinkStyle,
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
              }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#357ABD'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#747bff'}
              >
                Place an order
              </Link>
            )}
            <h2 style={{ marginBottom: '20px', padding: '15px', fontSize: '30px', color: '#555' }}>
              Your orders:
            </h2>
            {orders.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {[...orders].reverse().map(order => (
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
