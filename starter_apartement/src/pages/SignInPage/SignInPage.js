import React, { useEffect, useState } from "react";
import { login } from "../../services/authService";
import { XCircle } from "@phosphor-icons/react";
import { loggedInUserState } from "../../recoil_state";
import { useSetRecoilState } from "recoil";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const setSignedInUser = useSetRecoilState(loggedInUserState);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const { from = "/" } = state || {};

  useEffect(() => {
    document.title = "Sign In";
    const token = localStorage.getItem("authToken");
    if (token !== null) {
      navigate("/");
    }
  }, []);

  const removeError = (id) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  const signInWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);

    login(email, password)
      .then((data) => {
        console.log("User logged in successfully");
        setSignedInUser(data.data);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("loggedInUser", JSON.stringify(data.data));
        console.log("navigate to home");
        navigate(from);
        console.log("navigate to home finished");
      })
      .catch((error) => {
        const random = Math.random().toString(36).substring(7);
        console.error(`Error logging in user: ${error.response.data.message}`);
        setErrors([
          ...errors,
          {
            message: error.response.data.message,
            id: random,
            time: Date.now(),
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-screen h-screen">
      <div className="grid w-screen grid-cols-2 gap-4">
        <div className="flex flex-col w-full">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <a href="#" className="p-4 text-xl font-bold text-white bg-black">
              Logo
            </a>
          </div>

          <div className="grid grid-cols-1 px-8 pt-8 my-auto md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl font-bold text-neutral">
              Sign in to your account
            </p>

            <form className="flex flex-col pt-3 md:pt-8">
              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full max-w-md input input-bordered"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full input input-bordered max-w-xmds"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="h-10" />
              <button
                className={
                  "btn btn-primary btn-active" + (loading ? " loading" : "")
                }
                aria-pressed="true"
                type="button"
                onClick={signInWithEmailAndPasswordHandler}
              >
                Log In
              </button>
            </form>
            <div className="pt-12 pb-12 text-center">
              <p>
                Don't have an account?{" "}
                <a href={`/sign-up`} className="font-semibold underline">
                  Register here.
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full shadow-2xl">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src="./signin_image.jpg"
            alt="A banner with a group of A2SV students"
          />
        </div>
      </div>
      <div className="toast">
        {errors.map((error) => (
          <div className="alert alert-error" key={error.id}>
            <div>
              <span>{error.message}</span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => removeError(error.id)}
              >
                <XCircle size={25} weight="light" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
