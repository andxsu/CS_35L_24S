import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Order() {
  const [form, setForm] = useState({
    dining_hall: "",
    food_order: "",
    notes_for_deliverer: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
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
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new order we will POST to /orders.
        response = await fetch("http://localhost:5050/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        // if we are updating a order we will PATCH to /orders/:id.
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
      setForm({ dining_hall: "", food_order: "", notes_for_deliverer: ""});
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Order Request</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Place Your Order
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="order"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Order
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="order"
                    id="order"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="burrito?"
                    value={form.food_order}
                    onChange={(e) => updateForm({ food_order: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="notes"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Notes for deliverer
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="notes"
                    id="notes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Burrito?"
                    value={form.notes_for_deliverer}
                    onChange={(e) => updateForm({ notes_for_deliverer: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Food</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="dhallRendeEast"
                      name="diningHallOptions"
                      type="radio"
                      value="RendeEast"
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
                      value="RendeWest"
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
                      value="TheStudy"
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
                  </div>
                </div>
              </fieldset>
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