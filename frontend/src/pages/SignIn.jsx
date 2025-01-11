import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";


function SignIn() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isSigningUp, signup } = useAuthStore();
  const navigate = useNavigate();
  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) 
      return toast.error("All fields are required");
    if (!formData.email.includes("@")) {
      return toast.error("Invalid email address");
    }
    if (formData.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData)
        .then(() => {
          toast.success("Account created successfully");
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-slate-100 mt-6 text-center text-3xl font-extrabold">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full m-1 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                required
                className="appearance-none m-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type={"password"}
                required
                className="appearance-none m-1 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
              {console.log(formData)}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-ml text-slate-300">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-500 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}


export default SignIn;
