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

export default function Order() {
  const [form, setForm] = useState({
    dining_hall: "",
    food_item: "",
    food_order: "",
    notes_for_deliverer: "",
  });
  const [isNew, setIsNew] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  const buildYourOwnItems = [
    "Build your own bowl",
    "Build your own burrito",
    "Build your own burrito bowl",
    "Build your own pizza",
    "Build your own sandwich",
    "Build your own Study salad", "Build your own bagel", "Build your own breakfast skillet", "Build your own tacos", "Build your own taco salad", "Build your own Rende West salad"
  ];
  const [buildYourOwnForm, setBuildYourOwnForm] = useState({});


  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/orders/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const order = await response.json();
      if (!order) {
        console.warn(`Order with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(order);
    }
    fetchData();
  }, [params.id, navigate]);

  useEffect(() => {
    const diningHallsMenus = {
      "Rendezvous East": ["California Sushi Bowl", "Build your own bowl"],
      "Rendezvous West": ["Build your own burrito", "Build your own burrito bowl", "Build your own tacos","Build your own taco salad","Build your own Rende West salad", "Chicken Quesadillas"],
      "The Study": ["Build your own bagel", "Build your own breakfast skillet", "Build your own pizza", "Build your own sandwich", "Build your own Study salad", "Pretzel and sausage platter", "Swiss fondue frites", "Cream and fruits waffle", "Nutella Waffle", "Coffee"],
      "The Drey": ["California Roll", "Cucumber avocado roll", "Berry Smoothie", "Roast Beef Sandwich", "BLT"],
      "Bruin Cafe": ["BBQ Beef Brisket Sandwich", "Buffalo Sandwich", "Cheesesteak", "Chicken Caesar", "The Cuban"]
    };

    setMenuItems(diningHallsMenus[form.dining_hall] || []);
  }, [form.dining_hall]);

  function updateForm(value) {
    if (buildYourOwnItems.includes(form.food_item)) {
      setBuildYourOwnForm((prev) => ({ ...prev, ...value }));
    } else {
      setForm((prev) => ({ ...prev, ...value }));
    }
  }


  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    console.log(person);
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`http://localhost:5050/orders/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ dining_hall: "", food_item: "", food_order: "", notes_for_deliverer: ""});
      setBuildYourOwnForm({});
      navigate("/");
    }
  }

  function renderBuildYourOwnForm() {
    switch (form.food_item) {
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
      case "Build your own Study salad":
        return <BuildYourOwnStudySalad form={buildYourOwnForm} updateForm={updateForm} />;
      case "Build your own breakfast skillet":
        return <BuildYourOwnBreakfastSkillet form={buildYourOwnForm} updateForm={updateForm} />;
      case "Build your own bagel":
        return <BuildYourOwnBagel form={buildYourOwnForm} updateForm={updateForm} />;
      default:
        // return (
        //   // <div className="mt-2">
        //   //   <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        //   //     <input
        //   //       type="text"
        //   //       name="order"
        //   //       id="order"
        //   //       className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
        //   //       placeholder="Sourdough bread with roast beef, bacon, lettuce, tomato, and mayo"
        //   //       value={form.food_order}
        //   //       onChange={(e) => updateForm({ food_order: e.target.value })}
        //   //     />
        //   //   </div>
        //   // </div>
        // );
    }
  }

  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Order Request</h3>
      <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Place Your Order
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Food</legend>
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
                      Rende East
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
                      Rende West
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
                      The Study
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
                      Bruin Cafe
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
              <label htmlFor="menuItem" className="block text-sm font-medium leading-6 text-slate-900">
                Menu Item
              </label>
              <div className="mt-2">
                <select
                  id="menuItem"
                  name="menuItem"
                  className="block w-full mt-1 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={form.food_item}
                  onChange={(e) => updateForm({ food_item: e.target.value })}
                  disabled={!form.dining_hall}
                >
                  <option value="">
                    {form.food_item ? form.food_item : "Select a Menu Item"}
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
              <label htmlFor="notes" className="block text-sm font-medium leading-6 text-slate-900">
                Notes for deliverer
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
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
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}
