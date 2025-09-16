import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";
import welcome from "../assets/sign.png";
import { Lock, Mail, User } from "lucide-react";
import { apiClient } from "../api/Client";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { email, password, name };
      const response = await apiClient.post("/api/auth/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Account created! Please verify your email.");
        navigate("/verify-mail");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = { email, password };
      const response = await apiClient.post("/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ff6767] min-h-screen relative flex  items-center justify-center">
      {/* background image */}
      <img
        src={bg}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* white card */}
      <div className="bg-white w-252 h-138 p-8 rounded-lg shadow-lg z-10 mx-8">
        <div className="flex justify-between">
          <div className="w-[50%] hidden md:flex">
            <img src={welcome} alt="" className="w-80" />
          </div>
          <form
            className="md:w-[50%] flex flex-col mx-auto py-10 md:py-0"
            onSubmit={state === "Login" ? login : signUp}
          >
            <h1 className="font-bold text-[40px] mb-4">{state}</h1>
            <div className="flex flex-col gap-4">
              {state === "Sign Up" ? (
                <div className="relative">
                  <User
                    color="gray"
                    size={19}
                    className="absolute left-2 top-3 font-light"
                  />

                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border w-full p-2 px-7 rounded outline-none border-gray-900 text-gray-800"
                    placeholder="Username"
                  />
                </div>
              ) : null}
              <div className="relative">
                <Mail
                  color="gray"
                  size={19}
                  className="absolute left-2 top-3 font-light"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border w-full p-2 px-7 rounded outline-none border-gray-900 text-gray-800"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <Lock
                  color="gray"
                  size={19}
                  className="absolute left-2 top-3 font-light"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border w-full p-2 px-7 rounded outline-none border-gray-900 text-gray-800"
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col  mt-2">
              <button
                type="submit"
                className="bg-[#ff6767] w-30 cursor-pointer px-2 py-2 rounded font-bold text-white mt-3"
              >
                {loading
                  ? state === "Login"
                    ? "Logging In..."
                    : "Signing Up.."
                  : state}
              </button>
            </div>
            <div className="mt-4">
              {state === "Sign Up" ? (
                <p className="text-sm mt-4">
                  Already have an account?
                  {"  "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-blue-400 cursor-pointer underline"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-sm mt-4">
                  Don't have an account?
                  {"  "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-blue-400 cursor-pointer underline"
                  >
                    Sign Up
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
