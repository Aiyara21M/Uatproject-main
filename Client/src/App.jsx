import { useEffect, useState } from "react";
import axios from "axios";
import { authenticate } from "./auth/auth";
import { useNavigate } from "react-router-dom";


export default function App() {
  document.title = "Login Page"

  const [login, setLogin] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  
  const { username, password } = login;

  const inputdata = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  
  const inputlogin = async (e) => {
    e.preventDefault();
    setError(""); 
    if (!username || !password) {
      setError("Please fill in Username and Password.");
      return;
    }
    setLoading(true); 
    try {
      const response = await axios.post(`http://localhost:4211/api/user`, login);
      authenticate(response, () => navigate("/index"));
    } catch (err) {
      setError("Login failed. Please check your Username and Password.");
      console.log(err);
    } finally {
      setLoading(false); 
    }
  };


  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch('http://localhost:4211/api/ip');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        sessionStorage.setItem("this_IP", JSON.stringify(data.ip))
      } catch (error) {
        console.log('ไม่สามารถดึง IP ได้: ' + error.message);
      }
    };

    fetchIP();
  }, []);

  

  return (
<div className="flex h-screen overflow-hidden bg-gray-200">
  {/* Left Section for Logo */}
  <div className="hidden md:flex flex-1 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-500">
    {/* <img src="path/to/your/logo.png" alt="Logo" className="max-w-xs" /> */}<p>logo</p>
  </div>

  {/* Right Section for Login Form */}
  <div className="flex-1 flex items-center justify-center px-4 bg-white">
    <div className="w-full max-w-sm">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-full max-h-[calc(100vh-4rem)] overflow-auto border border-gray-300"
        onSubmit={inputlogin}
      >
        <div className="mb-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Login</h2>
          <p className="text-sm text-gray-600 mt-1">Please enter your credentials</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
            onChange={inputdata}
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600"
            onChange={inputdata}
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-gray-600 to-gray-500'} text-white font-semibold rounded-md shadow-sm hover:bg-gradient-to-l hover:from-gray-700 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <div className="text-sm text-red-500 text-center mt-4">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  </div>
</div>



  );
}
