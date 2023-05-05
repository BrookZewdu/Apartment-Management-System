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
  }, []);

  const removeError = (id) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  const signUpHandler = async (event) => {
    event.preventDefault();

    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("fatherName", fatherName);
    formData.set("grandFatherName", grandFatherName);
    formData.set("phoneNumber", phoneNumber);
    formData.set("password", password);
    formData.set("email", email);
    formData.set("avatar", avatar[0]);
    register(formData)
      .then((data) => {
        console.log(data);
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
    <div className="w-screen h-screen mx-auto">
      <div className="grid  gap-4 w-full h-full">
        <div className="w-full flex flex-col h-screen mx-auto">
          <div className="h-full w-full overflow-scroll scroll-m-0">
            <div className="grid grid-cols-1 my-20 mx-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32 border bg-white mt-5 shadow-md-gray offset-x-1 offset-y-1">
              <div className="flex mx-auto">
                <p className="text-3xl font-bold text-neutral">
                  <span> create your account</span>
                </p>
                {/* <Binoculars size={32} weight="bold" fill="text-neutral" /> */}
              </div>
              <p className="pt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                Already have an account?{" "}
                <a href={`/sign-in`} className="underline font-semibold">
                  Login here.
                </a>
              </p>
              <form className="flex flex-col pt-3 gap-1 mx-auto">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    name="first-name"
                    type="text"
                    placeholder="John"
                    className="input input-bordered w-full max-w-md "
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">middle Name</span>
                  </label>
                  <input
                    name="middle-name"
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full max-w-md"
                    value={fatherName}
                    onChange={(e) => {
                      setFatherName(e.target.value);
                    }}
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    name="last-name"
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full max-w-md"
                    value={grandFatherName}
                    onChange={(e) => {
                      setGrandFatherName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="input input-bordered w-full max-w-md"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Phone number</span>
                  </label>
                  <input
                    name="phone number"
                    type="tel"
                    placeholder="mobile"
                    className="input input-bordered w-full max-w-md"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-md"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">profile picture</span>
                  </label>
                  <input
                    name="profile picture"
                    type="file"
                    placeholder="profile picture"
                    className="input input-bordered w-full max-w-md"
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
