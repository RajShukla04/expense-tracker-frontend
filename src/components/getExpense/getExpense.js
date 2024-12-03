import React, { useEffect, useState } from "react";
import styles from "./getExpense.module.css";
import { Line, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
const GetExpense = () => {
  const [deta, setDeta] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const expense = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/exp/get-expense",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      //   console.log(res.expense);

      setDeta(res.expense);
      const total = res.expense.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      setTotalAmount(total);
    } catch (error) {
      console.error("error occured while getting expense", error);
    }
  };
  useEffect(() => {
    expense();
  }, []);
  const categories = deta.length ? deta.map((expense) => expense.category) : [];
  const amount = deta.length ? deta.map((expense) => expense.amount) : [];
  const dates = deta.length
    ? deta.map((expense) => new Date(expense.date).toLocaleDateString())
    : [];
  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: amount,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  const lineData = {
    labels: dates,
    datasets: [
      {
        label: "Expenses Over Time",
        data: amount,
        fill: false,
        borderColor: "#42A5F5",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
    ],
  };
  return (
    <div className={styles["get-expense"]}>
      <div className={styles["chartContainer"]}>
        <h2>Expense Overview</h2>
        <p className={styles["section-description"]}>
          Below is a visual representation of your spending habits. Understand
          where your money is going and make informed financial decisions.
        </p>
        <Pie data={pieData} />
      </div>
      <div>
        <h3>Expense Trends Over Time</h3>
        <Line data={lineData} />
      </div>
      <div className={styles["all-expenses"]}>
        <h2>Recent Expenses</h2>
        <p className={styles["section-description"]}>
          Keep an eye on your most recent transactions. Transparency is key to
          financial success.
        </p>
        {deta.map((expense) => (
          <li className={styles["allExpenses-list"]} key={expense._id}>
            <h3 className={styles["allExpenses-heading"]}>
              Category: {expense.category}
            </h3>
            <p className={styles["allExpenses-paragrapg"]}>
              Amount: {expense.amount}
            </p>
            <p className={styles["allExpenses-description"]}>
              Description: {expense.description}
            </p>
            <p className={styles["allExpenses-date"]}>
              Date: {new Date(expense.date).toLocaleDateString()}
            </p>
            {console.log(expense)}
            <p className={styles["allExpenses-totalAmount"]}>
              Total amount you spent: {totalAmount}
            </p>
          </li>
        ))}
      </div>
    </div>
  );
};

export default GetExpense;
