"use client";
import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import { checkAuth } from "../../../utils/checkAuth";
const inputData = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    required: "true",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    id: "userName",
    label: "userName",
    type: "text",
    required: true,
  },
  {
    id: "monthelyIncome",
    label: "monthelyIncome",
    type: "Number",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
  },
];
const Register = () => {
  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        window.location.href = "/dashboard";
      }
    };
    authenticate();
  }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.fullName ||
      !formData.userName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("password do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/usr/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      // if (!response.ok) throw new Error("Registration Failed");
      const data = await response.json();
      setError(data.message);
      console.log(data);
    } catch (error) {
      setError("An Error occurred. Please Try again. ");
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles["register-section"]}>
      <h1 className={styles["heading"]}>Register</h1>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <form className={styles["register-form"]} onSubmit={handleSubmit}>
        {inputData.map((data) => (
          <div className={styles["input-fields"]} key={data.id}>
            <label className={styles["input-label"]}>{data.label}</label>
            <input
              className={styles["register-input"]}
              id={data.id}
              type={data.type}
              value={data.value}
              onChange={handleChange}
              required={data.required === true}
            />
          </div>
        ))}
        {error && (
          <p role="alert" className={styles["error"]} style={{ color: "red" }}>
            {error}
          </p>
        )}
        <button className={styles["button"]} type="submit">
          {loading ? "Regisering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
