import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User } from "react-feather";

const Login = () => {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <section className="flex justify-center items-center p-2 pt-10 drop-shadow-2xl">
      <div className="border-2 rounded-lg p-5 sm:w-2/4 xl:w-[30%]  bg-opacity-20 backdrop-blur-lg bg-slate-100 ">
        <div className="flex flex-col justify-center items-center gap-2 mb-4">
          <div className="bg-slate-200 rounded-full p-3 bg-opacity-60 border">
            <User className=" text-indigo-800 " />
          </div>

          <h1 className="text-center text-indigo-800 text-2xl font-bold">
            Login
          </h1>
        </div>

        <form
          onSubmit={(e) => {
            handleUserLogin(e, credentials);
          }}
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="inputemail" className="ml-2 font-semibold text-md ">
              Email :{" "}
            </label>
            <input
              type="email"
              id="inputemail"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              required
              placeholder="abc@example.com"
              className="p-3 w-auto outline-none rounded-xl text-violet-500"
            />
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <label htmlFor="inputpass" className="ml-2 font-semibold text-md">
              Password :{" "}
            </label>
            <input
              type="password"
              id="inputpass"
              required
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="p-3 w-auto outline-none rounded-xl text-violet-500"
            />
          </div>
          <hr className="m-5" />
          <div className="mt-4">
            <button
              type="submit"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              className="w-full p-3 rounded-xl text-white font-bold drop-shadow-xl"
            >
              Login
            </button>
          </div>
          <div className="flex justify-center items-center flex-wrap m-4 gap-2">
            <p>Don't have an Account ?</p>
            <Link to="/signup" className="text-indigo-500">
              Sign-up
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
