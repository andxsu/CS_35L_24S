// import {useContext, useEffect, useState} from 'react';
// import {UserContext} from '../../context/userContext';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function Dashboard() {
//     const navigate = useNavigate()
//     const [order, setOrder] = useState(null)
    
//     const {user} = useContext(UserContext)
//     // const orderId = user.active_orders

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
        
//         const fetchOrder = async() => {
//             const orderId = user.active_orders;
//             try {
//                 const response = await axios.get('/getorder', {params: {orderId: user.active_orders}})
//                 setOrder(response.data)
                
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchOrder()

// })
    
//     return(
//         <div>
//             <h1>Dashboard</h1>
//             {!!user && (<h2>Hi {user.username}!</h2>)}
//             {!!user && <Link to='/order'>Place an order</Link>}
//             <h2>Your orders</h2>
//             <h3>{order.food_order}</h3>
//         </div>

//     )
    

// }

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const { user } = useContext(UserContext);


    return (
        <div>
            <h1>Dashboard</h1>
            {!!user && <h2>Hi {user.username}!</h2>}
            {!!user && <Link to='/order'>Place an order</Link>}
            <h2>Your orders</h2>
            <h3>{user.active_orders}</h3>
        </div>
    );
}
