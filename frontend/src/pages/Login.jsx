import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken, backendUrl } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
          console.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
          console.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={onSubmitHandler}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "login"} to book appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-zinc-300 rounded w-full p-2 mt-1 outline-primary"
              required
            />
          </div>
        )}
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-zinc-300 rounded w-full p-2 mt-1 outline-primary"
            required
          />
        </div>
        <div className="w-full relative">
          <p>Password</p>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-zinc-300 rounded w-full p-2 mt-1 outline-primary"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[42px] text-lg font-semibold"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => setState("Login")}
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create an new account?{" "}
            <span
              className="cursor-pointer text-primary underline"
              onClick={() => setState("Sign Up")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
