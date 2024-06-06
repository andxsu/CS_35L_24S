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
const {user, fetchUserData} = useContext(UserContext);

const buttonStyle = {
  fontSize: '24px',          
  padding: '15px 35px',      // Increase padding for better appearance
  backgroundColor: '#747bff', // Background color for the link
  color: '#fff',             // Text color for better contrast
  borderRadius: '12px',      // Rounded edges
  textDecoration: 'none',    // Remove underline
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
})

  useEffect(() => {
    if (user){
        setForm(prevData => ({
            ...prevData,
            creator_username: user.username,
        }))
    }
  }, [user, navigate]);

  // if(!user){
  //   navigate('/login')
  // }


  const [isNew, setIsNew] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  const buildYourOwnItems = [
    "Build your own bowl",
    "Build your own burrito",
    "Build your own burrito bowl",
    "Build your own pizza",
    "Build your own sandwich",
    "Build your own study salad", "Build your own bagel", "Build your own breakfast skillet", "Build your own tacos", "Build your own taco salad", "Build your own Rende West salad"
  ];
  const [buildYourOwnForm, setBuildYourOwnForm] = useState({});


  
  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
    setBuildYourOwnForm((prev) => ({ ...prev, ...value }));
  }
  useEffect(() => {
    const diningHallsMenus = {
      "Rendezvous East": ["California Sushi Bowl"],
      "Rendezvous West": ["Build your own burrito", "Build your own burrito bowl", "Build your own tacos","Build your own taco salad","Build your own Rende West salad", "Chicken Quesadillas"],
      "The Study": ["Build your own bagel", "Build your own breakfast skillet", "Build your own pizza", "Build your own sandwich", "Build your own study salad", "Pretzel and sausage platter", "Swiss fondue frites", "Cream and fruits waffle", "Nutella Waffle", "Coffee"],
      "The Drey": ["California Roll", "Cucumber avocado roll", "Berry Smoothie", "Roast Beef Sandwich", "BLT"],
      "Bruin Cafe": ["BBQ Beef Brisket Sandwich", "Buffalo Sandwich", "Cheesesteak", "Chicken Caesar", "The Cuban"]
    };

    setMenuItems(diningHallsMenus[form.dining_hall] || []);
  }, [form.dining_hall]);

  const createorder = async (e) => {
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

    const { 
      dining_hall, 
      creator_username, 
      food_order,
      notes_for_deliverer, 
      active, 
      out_for_delivery 
    } = { 
        dining_hall: form.dining_hall, 
        creator_username: form.creator_username, 
        food_order: form.food_order.trim() ? form.food_order : concatenatedOrder, 
        notes_for_deliverer: form.notes_for_deliverer, 
        active: form.active, 
        out_for_delivery: form.out_for_delivery 
    };

    try {
        const {data} = await axios.post('/order', {dining_hall, creator_username, food_order, notes_for_deliverer, active, out_for_delivery})
        if(data.error){
            toast.error(data.error)
        }
        else{
            console.log("Final form state")
            console.log(form)
            setForm({});
            setBuildYourOwnForm({});
            console.log("Data sent back")
            console.log(data);
            toast.success('Order created!');
            await fetchUserData();
            navigate('/dashboard');
        }
    } catch (error) {
        
    }
}

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
      case "Build your own breakfast skillet":
        return <BuildYourOwnBreakfastSkillet form={buildYourOwnForm} updateForm={updateForm} />;
      case "Build your own bagel":
        return <BuildYourOwnBagel form={buildYourOwnForm} updateForm={updateForm} />;
      default:
        return null;
    }
  }


  // if(!user){
  //   navigate('/login')
  // }

  return (
    <>
      <form onSubmit={createorder} className="border rounded-lg overflow-hidden p-4" >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Place Your Order
            </h2>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div>
              <fieldset className="mt-4">
              <legend>Location</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="dhallRendeEast"
                      name="diningHallOptions"
                      type="radio"
                      value="Rendezvous East"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.dining_hall === "Rendezvous East"}
                      onChange={(e) => updateForm({ dining_hall: e.target.value })}
                    />
                    <label
                      htmlFor="dhallRendeEast"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Rende East &nbsp;
                    </label>
                    <input
                      id="dhallRendeWest"
                      name="diningHallOptions"
                      type="radio"
                      value="Rendezvous West"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.dining_hall === "Rendezvous West"}
                      onChange={(e) => updateForm({ dining_hall: e.target.value })}
                    />
                    <label
                      htmlFor="dhallRendeWest"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Rende West &nbsp;
                    </label>
                    <input
                      id="dhallStudy"
                      name="diningHallOptions"
                      type="radio"
                      value="The Study"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.dining_hall === "The Study"}
                      onChange={(e) => updateForm({ dining_hall: e.target.value })}
                    />
                    <label
                      htmlFor="dhallStudy"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      The Study &nbsp;
                    </label>
                    <input
                      id="dhallBcaf"
                      name="diningHallOptions"
                      type="radio"
                      value="Bruin Cafe"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.dining_hall === "Bruin Cafe"}
                      onChange={(e) => updateForm({ dining_hall: e.target.value })}
                    />
                    <label
                      htmlFor="dhallBcaf"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Bruin Cafe &nbsp;
                    </label>
                    <input
                      id="dhallTheDrey"
                      name="diningHallOptions"
                      type="radio"
                      value="The Drey"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.dining_hall === "The Drey"}
                      onChange={(e) => updateForm({ dining_hall: e.target.value })}
                    />
                    <label
                      htmlFor="dhallTheDrey"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      The Drey
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="menuItem" className="block text-sm font-medium leading-6 text-slate-900" style={labelStyle}>
                Menu Item
              </label>
              <div className="mt-2">
                <select
                  id="menuItem"
                  name="menuItem"
                  className="block w-full mt-1 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={form.food_order}
                  onChange={(e) => updateForm({ food_order: e.target.value })}
                  disabled={!form.dining_hall}
                >
                  <option value="">
                    {form.food_order ? form.food_order : "Select a Menu Item"}
                  </option>
                  {menuItems.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-4">
            {renderBuildYourOwnForm()}
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="notes" style={labelStyle} className="block text-sm font-medium leading-6 text-slate-900">
                Notes for deliverer
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    style={inputStyle}
                    type="text"
                    name="notes"
                    id="notes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Leave it at my door..."
                    value={form.notes_for_deliverer}
                    onChange={(e) => updateForm({ notes_for_deliverer: e.target.value })}
                    
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save"
          style={buttonStyle}
        />
      </form>
    </>
  );
}




