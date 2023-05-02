import { XCircle } from "@phosphor-icons/react";
import axios from "axios";
import { Divide } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState([]);
  useEffect(() => {
    axios
      .get(`/users/completesignup/${token}`)
      .then((response) => {
        navigate("/sign-in");
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
  }, [token]);
  const removeError = (id) => {
    setErrors(errors.filter((error) => error.id !== id));
  };

  return (
    <div>
      {errors.length > 0 &&
        errors.map((error) => (
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
  );
}
