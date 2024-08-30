/* eslint-disable react/prop-types */
import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import authService from '../service/AuthService';
import Toast from './Toast';


const LoginPopup = ({ setShowLogin }) => {
  const { setUser } = useContext(UserContext);
  const [currState, setCurrState] = useState("Sign Up");
  const [role, setRole] = useState('user');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [toast, setToast] = useState({ message: '', type: '', show: false });

  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 5000);
  };

  

  const register = async (payload) => {
    try {
      const response = await axios.post('http://localhost:5002/api/user/registerUser', payload);
      console.log(response.data);
      setCurrState("Login");
      showToast('Registration Successful!', 'success');
    } catch (error) {
      console.log(error);
      showToast('Registration failed. Please try again.', 'error');

    }
  };

  const login = async (payload) => {
    try {
      const token = await authService.login(payload.email, payload.password);
      const user = await authService.getUser();
      setUser(user);
      showToast('Login Successful!', 'success');
      setShowLogin(false);
      navigate('/dashboard');
    } catch (error) {
      showToast('Login failed. Please try again.', 'error');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currState === "Sign Up") {
      const payload = { role, username, email, password, mobileNumber };
      await register(payload);
    } else {
      const payload = { email, password };
      await login(payload);
    }
  };

  return (
    <div className="absolute z-10 w-full h-full bg-black/60 grid">
      <form onSubmit={handleSubmit} className="place-self-center w-[23vw] min-w-[330px] text-gray-500 bg-white flex flex-col gap-6 p-6  rounded-md text-sm animate-fadeIn">
        <div className="flex justify-between items-center text-black">
          <h2>{currState}</h2>
          <button onClick={() => setShowLogin(false)} className="w-4 cursor-pointervtext-3xl font-bold">X</button>
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" && (
            <>
              <select
                className="outline-none border bg-white border-gray-300 p-2 rounded-md"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user"> User</option>
                <option value="admin">Admin</option>
              </select>
              <input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="outline-none border bg-white border-gray-300 p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="outline-none border bg-white border-gray-300 p-2 rounded-md"
              />
            </>
          )}
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="outline-none border bg-white border-gray-300 p-2 rounded-md"
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="outline-none border bg-white border-gray-300 p-2 rounded-md"
          />
        </div>
        <button type="submit" className="btn border-none p-2 rounded-md text-white  text-base cursor-pointer">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="flex items-start gap-2 -mt-3">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account <span onClick={() => setCurrState("Sign Up")} className="text-red-500 font-medium cursor-pointer">Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account <span onClick={() => setCurrState("Login")} className="text-red-500 font-medium cursor-pointer">Login Here</span>
          </p>
        )}
      </form>
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ ...toast, show: false })} />}
    </div>
  );
};

export default LoginPopup;
