import {useContext} from 'react';
import {UserContext} from '../../context/userContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const {user} = useContext(UserContext)
    
    return(
        <div>
            <h1>Dashboard</h1>
            {!!user && (<h2>Hi {user.username}!</h2>)}
            {!!user && <Link to='/order'>Place an order</Link>}
            {!user && (<h2>You are not logged in, please log in or register</h2>)}

        </div>

    )
    

}