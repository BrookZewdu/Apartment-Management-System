import React, { useEffect, useState } from "react";
import { register } from "../../services/authService";
import { XCircle, Binoculars } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setname] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [grandFatherName, setGrandFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Sign Up";
    if (localStorage.getItem("authToken") !== null) {
      navigate("/home");
    }
  }, []);

  const removeError = (id) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.set("name", String(name));
    formData.set("fatherName", fatherName);
    formData.set("grandFatherName", grandFatherName);
    formData.set("phoneNumber", phoneNumber);
    formData.set("password", password);
    formData.set("email", email);
    formData.set("avatar", avatar[0]);
    register(formData)
      .then((data) => {
        navigate("/pending");
      })
      .catch((error) => {
        const random = Math.random().toString(36).substring(7);
        console.error(`Error signing up user: ${error.response.data.message}`);
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
      <div className="grid w-screen h-screen grid-cols-2 gap-4">
        <div className="flex flex-col w-full h-screen">
          <div className="w-full h-full overflow-scroll scroll-m-0">
            <div className="grid grid-cols-1 px-8 pt-8 mx-auto my-20 md:pt-0 md:px-24 lg:px-32">
              <div className="flex">
                <p className="text-3xl font-bold text-neutral">
                  Join<span> </span>
                </p>
                <Binoculars size={32} weight="bold" fill="text-neutral" />
              </div>
              <p className="pt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                Already have an account?{" "}
                <a href={`/sign-in`} className="font-semibold underline">
                  Login here.
                </a>
              </p>
              <form className="flex flex-col gap-1 pt-3 mx-auto">
                <div className="w-full form-control ">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    name="first-name"
                    type="text"
                    placeholder="John"
                    className="w-full max-w-md input input-bordered "
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full form-control">
                  <label className="label">
                    <span className="label-text">middle Name</span>
                  </label>
                  <input
                    name="middle-name"
                    type="text"
                    placeholder="Doe"
                    className="w-full max-w-md input input-bordered"
                    value={fatherName}
                    onChange={(e) => {
                      setFatherName(e.target.value);
                    }}
                  />
                </div>

                <div className="w-full form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    name="last-name"
                    type="text"
                    placeholder="Doe"
                    className="w-full max-w-md input input-bordered"
                    value={grandFatherName}
                    onChange={(e) => {
                      setGrandFatherName(e.target.value);
                    }}
                  />
                </div>
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
                    <span className="label-text">Phone number</span>
                  </label>
                  <input
                    name="phone number"
                    type="tel"
                    placeholder="mobile"
                    className="w-full max-w-md input input-bordered"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    className="w-full max-w-md input input-bordered"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full form-control">
                  <label className="label">
                    <span className="label-text">profile picture</span>
                  </label>
                  <input
                    name="profile picture"
                    type="file"
                    placeholder="profile picture"
                    className="w-full max-w-md input input-bordered"
                    onChange={(e) => setAvatar(e.target.files)}
                  />
                </div>
                <button
                  className={
                    "btn btn-primary mt-16 btn-active" +
                    (loading ? " loading" : "")
                  }
                  aria-pressed="true"
                  type="button"
                  onClick={signUpHandler}
                >
                  Sign Up
                </button>
              </form>
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
