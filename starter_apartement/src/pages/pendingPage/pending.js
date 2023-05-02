import axios from "axios";
// import {} from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PendingPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  return (
    <div>
      <a target="_blank" href="https://mail.google.com/mail/u/0/">
        please verify your email
      </a>
    </div>
  );
}
