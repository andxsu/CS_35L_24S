import {useContext, useEffect} from 'react';
import {UserContext} from '../../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate()
    
    const {user} = useContext(UserContext)
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
})
    
    

    
    return(
        <div>
            <h1>Dashboard</h1>
            {!!user && (<h2>Hi {user.username}!</h2>)}
            {!!user && <Link to='/order'>Place an order</Link>}

        </div>

    )
    

}