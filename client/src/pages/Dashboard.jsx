import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [activeOrders, setActiveOrders] = useState([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch orders and set active and previous orders
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders');
                setOrders(response.data);
                setActiveOrders(response.data.filter(order => !order.completed));
                setPreviousOrders(response.data.filter(order => order.completed));
            } catch (error) {
                console.error("Error fetching orders", error);
            }
        };
        fetchOrders();
    }, []);

    const toggleFavorite = async (orderId) => {
        try {
            await axios.post(`/api/orders/${orderId}/toggle-favorite`);
            // Update the orders list
            setOrders(prevOrders => prevOrders.map(order => 
                order._id === orderId ? { ...order, favorite: !order.favorite } : order
            ));
        } catch (error) {
            console.error("Error toggling favorite", error);
        }
    };

    const sortOrders = (orders, criteria) => {
        if (criteria === "favorite") {
            return orders.sort((a, b) => b.favorite - a.favorite);
        } else if (criteria === "order") {
            return orders.sort((a, b) => a.food_order.localeCompare(b.food_order));
        } else if (criteria === "location") {
            return orders.sort((a, b) => a.dining_hall.localeCompare(b.dining_hall));
        } else {
            return orders;
        }
    };

    const handleSortChange = (criteria) => {
        setSortBy(prevSortBy => prevSortBy === criteria ? "" : criteria);
    };

    const sortedPreviousOrders = sortOrders([...previousOrders], sortBy);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Dashboard for {user?.username}</h1>
            <Link to="/create-order" style={{
                display: 'block',
                backgroundColor: '#747bff',
                color: '#fff',
                padding: '10px 15px', // Adjusted padding for less wide button
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                marginBottom: '20px',
                textAlign: 'center',
                textDecoration: 'none'
            }}>Place an order 📬</Link>

            <div style={{ marginBottom: '20px' }}>
                <h2>Active orders:</h2>
                {activeOrders.length > 0 ? (
                    <ul>
                        {activeOrders.map(order => (
                            <li key={order._id} style={{
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '10px',
                                marginBottom: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <div>
                                    <p><strong>Dining hall:</strong> {order.dining_hall || ''}</p>
                                    <p><strong>Order:</strong> {order.food_order}</p>
                                    <p><strong>Status:</strong> {order.completed ? 'Completed' : 'Active'}</p>
                                </div>
                                <span
                                    style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: order.favorite ? 'gold' : 'black' }}
                                    onClick={() => toggleFavorite(order._id)}
                                    title="Favorite"
                                >
                                    {order.favorite ? '🌟' : '☆'}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No active orders</p>
                )}
            </div>

            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <h2>Previous orders:</h2>
                    <button
                        style={{
                            backgroundColor: '#747bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px', // Adjusted padding
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
                            title="Toggle"
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
                            title="Toggle"
                        >
                            Order (A-Z) 🍕 {sortBy === "order" ? "✅" : "🚫"}
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
                            title="Toggle"
                        >
                            Location (A-Z) 📍 {sortBy === "location" ? "✅" : "🚫"}
                        </div>
                    </div>
                )}

                <ul>
                    {sortedPreviousOrders.map(order => (
                        <li key={order._id} style={{
                            border: '1px solid #ccc',
                            borderRadius: '10px',
                            padding: '10px',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#f9f9f9'
                        }}>
                            <span
                                style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px', color: order.favorite ? 'gold' : 'black' }}
                                onClick={() => toggleFavorite(order._id)}
                                title="Favorite"
                            >
                                {order.favorite ? '🌟' : '☆'}
                            </span>
                            <div>
                                <p><strong>Dining hall:</strong> {order.dining_hall || ''}</p>
                                <p><strong>Order:</strong> {order.food_order}</p>
                                <p><strong>Status:</strong> {order.completed ? 'Completed' : 'Active'}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

