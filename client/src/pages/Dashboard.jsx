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
    const [sortBy, setSortBy] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

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

    const sortOrders = (orders, criteria) => {
        if (criteria === "favorite") {
            return orders.sort((a, b) => b.orderDetails.favorite - a.orderDetails.favorite);
        } else if (criteria === "order") {
            return orders.sort((a, b) => a.orderDetails.food_order.localeCompare(b.orderDetails.food_order));
        } else if (criteria === "location") {
            return orders.sort((a, b) => a.orderDetails.dining_hall.localeCompare(b.orderDetails.dining_hall));
        } else {
            return orders;
        }
    };

    const handleSortChange = (criteria) => {
        setSortBy(prevSortBy => prevSortBy === criteria ? "" : criteria);
    };

    const sortedPastOrders = sortOrders([...pastOrders], sortBy);

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
                    Place an order 📬
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2>Previous orders:</h2>
                <button
                    style={{
                        backgroundColor: '#747bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '18px',
                        marginBottom: '10px'
                    }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    {dropdownOpen ? 'Close ⬆️' : 'Sort by ⬇️'}
                </button>
            </div>
            {dropdownOpen && (
                <div style={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    position: 'absolute',
                    padding: '10px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '150px',
                    zIndex: 1 // Ensure dropdown stays above other elements
                }}>
                    <div
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: sortBy === "favorite" ? '#747bff' : 'transparent',
                            color: sortBy === "favorite" ? '#fff' : 'black'
                        }}
                        onClick={() => handleSortChange("favorite")}
                        title="Click to toggle"
                    >
                        Favorite 🌟 {sortBy === "favorite" ? "✅" : "🚫"}
                    </div>
                    <div
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: sortBy === "order" ? '#747bff' : 'transparent',
                            color: sortBy === "order" ? '#fff' : 'black'
                        }}
                        onClick={() => handleSortChange("order")}
                        title="Click to toggle"
                    >
                        Order (A-Z) 🍳 {sortBy === "order" ? "✅" : "🚫"}
                    </div>
                    <div
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: sortBy === "location" ? '#747bff' : 'transparent',
                            color: sortBy === "location" ? '#fff' : 'black',
                            whiteSpace: 'nowrap' // Ensure it stays on one line
                        }}
                        onClick={() => handleSortChange("location")}
                        title="Click to toggle"
                    >
                        Location (A-Z) 📍 {sortBy === "location" ? "✅" : "🚫"}
                    </div>
                </div>
            )}

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {sortedPastOrders.map(order => (
                    <li key={order.orderId} style={{
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        padding: '20px',
                        fontSize: '18px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                        color: '#555',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span
                            style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: order.orderDetails.favorite ? 'gold' : 'black' }}
                            onClick={() => toggleFavorite(order.orderId)}
                            title="Click to toggle"
                        >
                            {order.orderDetails.favorite ? '🌟' : '☆'}
                        </span>
                        <div>
                            <strong>Dining hall:</strong> {order.orderDetails.dining_hall || ''}<br />
                            <strong>Order:</strong> {order.orderDetails.food_order}<br />
                            <strong>Status:</strong> {order.orderDetails.completed ? 'Completed' : 'Active'}<br />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

