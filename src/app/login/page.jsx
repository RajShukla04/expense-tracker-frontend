"use client";
import NavBar from "@/components/navbar/NavBar";
import React, { useEffect, useState } from "react";
import styles from "./login.module.css";
import { checkAuth } from "../../../utils/checkAuth";
const inputData = [
  {
    id: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    id: "password",
    label: "Password",
    type: "password",
    required: true,
  },
];

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        window.location.href = "/dashboard";
      }
    };
    authenticate();
  }, []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/usr/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "login failes")
      const data = await response.json();
      window.location.href = "/dashboard";
      console.log(data);
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles["login-section"]}>
      <h1 className={styles["heading"]}>Login</h1>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        {inputData.map((data) => (
          <div className={styles["login-input-fields"]} key={data.id}>
            <label className={styles["label"]}>{data.label}</label>
            <input
              className={styles["login-input"]}
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
        <button className={styles["buttom"]} type="submit">
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
