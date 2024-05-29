import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Signup()
{
    const [form, setForm] = useState({
        username: "",
        password: "",
        venmo: "",
        address: "",
        email: "",
        phoneNum: "",
        venmo: "",
        type: "",
      });
      
      function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
      }
      

      async function onSubmit(e) {
        e.preventDefault();
        const person = { ...form };
        try {
            let response;
            response = await fetch("http://localhost:5050/users/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });
        console.log(response);
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('A problem occurred with your fetch operation: ', error);
        } finally {
            setForm({username: "",
            password: "",
            venmo: "",
            address: "",
            email: "",
            phoneNum: "",
            venmo: "",
            type: "",})
        }
      }

    // Signup.js
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={onSubmit} className="border rounded-lg overflow-hidden p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              name = "username"
              id = "username"
              placeholder="Enter your username"
              value = {form.username}
              onChange = {(e) => updateForm({username: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              name = "password"
              id = "password"
              placeholder="Enter your password"
              value = {form.password}
              onChange = {(e) => updateForm({password: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Venmo</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your Venmo username"
              name = "venmo"
              id = "venmo"
              value = {form.venmo}
              onChange = {(e) => updateForm({venmo: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your address"
              name = "address"
              id = "address"
              value = {form.address}
              onChange = {(e) => updateForm({address: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email"
              name = "email"
              id = "email"
              value = {form.email}
              onChange = {(e) => updateForm({email: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your phone number"
              name = "phoneNum"
              id = "phoneNum"
              value = {form.phoneNum}
              onChange = {(e) => updateForm({phoneNum: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Select User Type</label>
            <select 
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            name = "type"
            id = "type"
            value = {form.type}
            onChange = {(e)=> updateForm({type: e.target.value})}>
              <option value = "">Select</option>
              <option value="buyer">Buyer</option>
              <option value="deliverer">Deliverer</option>
            </select>

          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
