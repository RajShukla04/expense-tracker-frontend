"use client";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { checkAuth } from "../../../utils/checkAuth";
import CreateExpense from "@/components/createExpense/createExpense";
import GetExpense from "@/components/getExpense/getExpense";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import LogoutButton from "@/components/logout/logout";
const Dashboard = () => {
  const [deta, setDeta] = useState(null);
  const [click, setClick] = useState(false);
  useEffect(() => {
    const authenticate = async () => {
      try {
        const isAuthenticated = await checkAuth(setDeta);
        if (!isAuthenticated) {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };
    authenticate();
  }, []);

  return (
    <div className={styles["dashboard-section"]}>
      <NavBar dashboard="dashboard" register="register" login="login" />
      <div className={styles["welcome-container"]}>
        <h1>Welcome, {deta?.fullName || "Guest"}!</h1>
        <p className={styles["welcome-text"]}>
          Manage your finances like a pro. From tracking your daily expenses to
          analyzing spending trends, we&apos;ve got you covered. Stay on top of
          your budget and achieve your financial goals effortlessly.
        </p>

        <LogoutButton />
      </div>
      <div className={styles["action-buttons"]}>
        <button
          className={styles["button"]}
          onClick={() => setClick((prev) => !prev)}
        >
          {click ? "Close Add Expense" : "Add New Expense"}
        </button>
      </div>
      {click && <CreateExpense />}
      <div className={styles["expense-section"]}>
        <GetExpense />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
{
  /* <h1>
        Welcome {deta?.fullName}
        {/* <Income /> */
}
//   <button onClick={() => setClick((prev) => !prev)}>Add-Expense</button>
//   {click && <CreateExpense />}
//   <GetExpense />
//   {console.log("data: ", deta)}
// </h1>
// <Footer /> */}
