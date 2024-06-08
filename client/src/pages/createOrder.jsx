
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BuildYourOwnBurritoBowl } from "./BuildYourOwn";
import { BuildYourOwnRendeWestSalad } from "./BuildYourOwn";
import { BuildYourOwnBurrito } from "./BuildYourOwn";
import { BuildYourOwnTacos } from "./BuildYourOwn";
import { BuildYourOwnTacoSalad } from "./BuildYourOwn";
import { BuildYourOwnPizza } from "./BuildYourOwn";
import { BuildYourOwnSandwich } from "./BuildYourOwn";
import { BuildYourOwnStudySalad } from "./BuildYourOwn";
import { BuildYourOwnBreakfastSkillet } from "./BuildYourOwn";
import { BuildYourOwnBagel } from "./BuildYourOwn";
import {useContext} from 'react';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {UserContext} from '../../context/userContext';



export default function CreateOrder() {
    const params = useParams();
    const navigate = useNavigate();
    const { user, fetchUserData } = useContext(UserContext);

    const buttonStyle = {
        fontSize: '24px',
        padding: '15px 35px',
        backgroundColor: '#747bff',
        color: '#fff',
        borderRadius: '12px',
        textDecoration: 'none',
        display: 'inline-block',
        marginBottom: '10px',
        marginTop: '20px',
        padding: '9px 24px',
        fontSize: '18px',
        fontWeight: 'bold',
        backgroundColor: '#747bff',
        color: '#fff',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease'
    };

    const labelStyle = {
        fontSize: '20px',
        marginBottom: '10px',
        display: 'block',
        color: '#555',
        marginTop: '20px',
    };

    const inputStyle = {
        width: '50%',
        maxWidth: '600px',
        padding: '10px 20px',
        border: '2px solid #ddd',
        borderRadius: '25px',
        fontSize: '10px',
        outline: 'none',
        boxSizing: 'border-box',
    };

    const [form, setForm] = useState({
        dining_hall: '',
        creator_username: '',
        food_order: '',
        notes_for_deliverer: '',
        protein: '',
        side1: '',
        side2: '',
        toppings1: [],
        toppings14: '',
        toppings2: '',
        toppings3: '',
        beverage: '',
        sauce: '',
        cheese: '',
        topping: '',
        addOns1: '',
        addOns2: '',
        addOns3: '',
        bread: '',
        spreadsCondiments: [],
        greens: '',
        dressing: '',
        croutons: '',
        eggs: '',
        bagel: '',
        active: true,
        out_for_delivery: false,
        favorite_order: '',
    });

    useEffect(() => {
        if (user) {
            setForm(prevData => ({
                ...prevData,
                creator_username: user.username,
            }));
        }
    }, [user, navigate]);

    const [isNew, setIsNew] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [favoriteOrders, setFavoriteOrders] = useState([]);

    const buildYourOwnItems = [
        "Build your own bowl",
        "Build your own burrito",
        "Build your own burrito bowl",
        "Build your own pizza",
        "Build your own sandwich",
        "Build your own study salad",
        "Build your own bagel",
        "Build your own breakfast skillet",
        "Build your own tacos",
        "Build your own taco salad",
        "Build your own Rende West salad"
    ];

    const [buildYourOwnForm, setBuildYourOwnForm] = useState({});

    function updateForm(value) {
        setForm((prev) => ({ ...prev, ...value }));
        setBuildYourOwnForm((prev) => ({ ...prev, ...value }));
    }

    useEffect(() => {
        const diningHallsMenus = {
            "Rendezvous East": ["California Sushi Bowl"],
            "Rendezvous West": ["Build your own burrito", "Build your own burrito bowl", "Build your own tacos", "Build your own taco salad", "Build your own Rende West salad", "Chicken Quesadillas"],
            "The Study": ["Build your own bagel", "Build your own breakfast skillet", "Build your own pizza", "Build your own sandwich", "Build your own study salad", "Pretzel and sausage platter", "Swiss fondue frites", "Cream and fruits waffle", "Nutella Waffle", "Coffee"],
            "The Drey": ["California Roll", "Cucumber avocado roll", "Berry Smoothie", "Roast Beef Sandwich", "BLT"],
            "Bruin Cafe": ["BBQ Beef Brisket Sandwich", "Buffalo Sandwich", "Cheesesteak", "Chicken Caesar", "The Cuban"]
        };

        setMenuItems(diningHallsMenus[form.dining_hall] || []);
    }, [form.dining_hall]);

    useEffect(() => {
        if (user) {
            const fetchFavoriteOrders = async () => {
                try {
                    const response = await axios.get('/getallorders');
                    const favOrders = response.data.filter(order => order.favorite && order.creator_username === user.username);
                    setFavoriteOrders(favOrders);
                } catch (error) {
                    console.error('Error fetching favorite orders:', error);
                }
            };
            fetchFavoriteOrders();
        }
    }, [user]);

    useEffect(() => {
        if (form.favorite_order) {
            const selectedFavorite = favoriteOrders.find(order => order.food_order === form.favorite_order);
            if (selectedFavorite) {
                setForm(prevForm => ({
                    ...prevForm,
                    dining_hall: selectedFavorite.dining_hall,
                    food_order: selectedFavorite.food_order,
                }));
            }
        }
    }, [form.favorite_order, favoriteOrders]);

    const createOrder = async (e) => {
        e.preventDefault();
        const concatenatedOrder = [
            form.protein && `Protein: ${form.protein}`,
            form.side1 && `Side 1: ${form.side1}`,
            form.side2 && `Side 2: ${form.side2}`,
            form.toppings1.length > 0 && `Toppings 1: ${form.toppings1.join(', ')}`,
            form.toppings2 && `Toppings 2: ${form.toppings2}`,
            form.toppings3 && `Toppings 3: ${form.toppings3}`,
            form.beverage && `Beverage: ${form.beverage}`,
            form.sauce && `Sauce: ${form.sauce}`,
            form.cheese && `Cheese: ${form.cheese}`,
            form.topping && `Topping: ${form.topping}`,
            form.addOns1 && `Add-Ons 1: ${form.addOns1}`,
            form.addOns2 && `Add-Ons 2: ${form.addOns2}`,
            form.addOns3 && `Add-Ons 3: ${form.addOns3}`,
            form.bread && `Bread: ${form.bread}`,
            form.spreadsCondiments.length > 0 && `Spreads/Condiments: ${form.spreadsCondiments.join(', ')}`,
            form.greens && `Greens: ${form.greens}`,
            form.dressing && `Dressing: ${form.dressing}`,
            form.croutons && `Croutons: ${form.croutons}`,
            form.eggs && `Eggs: ${form.eggs}`,
            form.bagel && `Bagel: ${form.bagel}`,
        ].filter(Boolean).join(', ').replace(/[\r\n\s]{2,}/gm, " ");
        
        const isBuildYourOwn = buildYourOwnItems.includes(form.food_order.trim());

        const {
            dining_hall,
            creator_username,
            food_order,
            notes_for_deliverer,
            active,
            out_for_delivery,
            favorite_order,
        } = {
            dining_hall: form.dining_hall,
            creator_username: form.creator_username,
            food_order: (form.food_order.trim() && !isBuildYourOwn) ? form.food_order : concatenatedOrder,
            notes_for_deliverer: form.notes_for_deliverer,
            active: form.active,
            out_for_delivery: form.out_for_delivery,
            favorite_order: form.favorite_order,
        };

        try {
            const { data } = await axios.post('/order', { dining_hall, creator_username, food_order, notes_for_deliverer, active, out_for_delivery, favorite_order });
            if (data.error) {
                toast.error(data.error)
            }
            else {
                setForm({});
                setBuildYourOwnForm({});
                toast.success('Order created!');
                await fetchUserData();
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    function renderBuildYourOwnForm() {
        switch (form.food_order) {
            case "Build your own burrito bowl":
                return <BuildYourOwnBurritoBowl form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own Rende West salad":
                return <BuildYourOwnRendeWestSalad form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own burrito":
                return <BuildYourOwnBurrito form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own tacos":
                return <BuildYourOwnTacos form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own taco salad":
                return <BuildYourOwnTacoSalad form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own pizza":
                return <BuildYourOwnPizza form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own sandwich":
                return <BuildYourOwnSandwich form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own study salad":
                return <BuildYourOwnStudySalad form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own bagel":
                return <BuildYourOwnBagel form={buildYourOwnForm} updateForm={updateForm} />;
            case "Build your own breakfast skillet":
                return <BuildYourOwnBreakfastSkillet form={buildYourOwnForm} updateForm={updateForm} />;
            default:
                return null;
        }
    }

    return (
        <div>
            <h2>Create Order</h2>
            <form onSubmit={createOrder}>
                <label style={labelStyle} htmlFor="dining_hall">Dining Hall</label>
                <select
                    id="dining_hall"
                    name="dining_hall"
                    value={form.dining_hall}
                    onChange={(e) => updateForm({ dining_hall: e.target.value })}
                    style={inputStyle}
                >
                    <option value="">Select a dining hall</option>
                    <option value="Rendezvous East">Rendezvous East</option>
                    <option value="Rendezvous West">Rendezvous West</option>
                    <option value="The Study">The Study</option>
                    <option value="The Drey">The Drey</option>
                    <option value="Bruin Cafe">Bruin Cafe</option>
                </select>

                <label style={labelStyle} htmlFor="food_order">Food Order</label>
                <select
                    id="food_order"
                    name="food_order"
                    value={form.food_order}
                    onChange={(e) => updateForm({ food_order: e.target.value })}
                    style={inputStyle}
                >
                    <option value="">Select a food order</option>
                    {menuItems.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                </select>

                {buildYourOwnItems.includes(form.food_order) && renderBuildYourOwnForm()}

                <label style={labelStyle} htmlFor="favorite_order">Favorite Orders</label>
                <select
                    id="favorite_order"
                    name="favorite_order"
                    value={form.favorite_order}
                    onChange={(e) => updateForm({ favorite_order: e.target.value })}
                    style={inputStyle}
                >
                    <option value="">Select a favorite order</option>
                    {favoriteOrders.map((order, index) => (
                        <option key={index} value={order.food_order}>{order.food_order}</option>
                    ))}
                </select>

                <label style={labelStyle} htmlFor="notes_for_deliverer">Notes for Deliverer</label>
                <textarea
                    id="notes_for_deliverer"
                    name="notes_for_deliverer"
                    value={form.notes_for_deliverer}
                    onChange={(e) => updateForm({ notes_for_deliverer: e.target.value })}
                    style={{ ...inputStyle, height: '100px' }}
                />

                <button type="submit" style={buttonStyle}>Create Order</button>
            </form>
        </div>
    );
}


