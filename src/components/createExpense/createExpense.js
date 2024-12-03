import React, { useState } from "react";
import styles from "./createExpense.module.css";
const CreateExpense = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    // console.log(catogery)
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `category: ${category}, Amount: ${amount}, description: ${description}`
    );
    const formData = {
      category,
      amount,
      description,
    };
    try {
      const response = await fetch(
        "https://expense-tracker-server-production-0ed9.up.railway.app/api/v1/exp/add-expense",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert("Expense Added SuccessFully");
        setCategory("");
        setAmount("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error submitting expense: ", error);
      alert("Something Went wrong. please try again.");
    }
  };
  return (
    <div className={styles["createExpense-section"]}>
      <form className={styles["expense-form"]} onSubmit={handleFormSubmit}>
        <div className={styles["category"]}>
          <label className={styles["label"]} htmlFor="category">
            Select category:
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            style={{ padding: "8px", borderRadius: "4px" }}
          >
            <option value="">--Choose Category--</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="transportation">Transportation</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <div className={styles["expense-amount"]}>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            required
            placeholder="Enter Amount"
          />
        </div>
        <div className={styles["description"]}>
          <textarea
            id="textarea"
            value={description}
            placeholder="please add description"
            onChange={handleDescriptionChange}
            rows={3}
          />
        </div>
        <button className={styles["button"]} type="submit">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
