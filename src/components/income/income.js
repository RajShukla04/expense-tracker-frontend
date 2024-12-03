import React, { useState } from "react";
import styles from "./income.module.css";
const Income = () => {
  const [incomeData, setIncomeData] = useState({
    monthlyIncome: "",
    company: "",
    role: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((Prev) => ({ ...Prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(incomeData);
  };
  return (
    <div className={styles["income-section"]}>
      <h2>Your Monthely Income Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="monthlyIncome">Monthly Income</label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            value={incomeData.monthlyIncome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={incomeData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            name="role"
            value={incomeData.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Income;
