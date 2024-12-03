import ChartSection from "@/components/chart/chart";
import Footer from "@/components/footer/Footer";
import { GiWallet } from "react-icons/gi";
import { GoReport } from "react-icons/go";
import { SiProtools } from "react-icons/si";
import { FaLevelDownAlt } from "react-icons/fa";
import styles from "./page.module.css";
import NavBar from "@/components/navbar/NavBar";

export default function Home() {
  const expenseData = [
    { category: "Food", amount: 700 },
    { category: "Transport", amount: 1200 },
    { category: "Entertainment", amount: 550 },
    { category: "Utilities", amount: 200 },
  ];
  const howItWorks = [
    {
      num: 1,
      val: "SIgn Up",
    },
    {
      num: 2,
      val: "Add Expenses",
    },
    {
      num: 3,
      val: "View Reports",
    },
  ];
  const page2Data = [
    {
      icon: <GiWallet />,
      text: "Easy Expense Tracking ",
    },
    {
      icon: <GoReport />,
      text: "VIsual Reports ",
    },
    {
      icon: <SiProtools />,
      text: "Budgeting Tools ",
    },
  ];
  return (
    <div>
      <NavBar dashboard="dashboard" register="register" login="login" />
      {/* hey this is nextjs
      <Footer /> */}
      <div className={styles["main-page"]}>
        <div className={styles["main-page-01"]}>
          <h1>Welcome to DimeDossier</h1>
          <h3>Track Your Expenses With Ease!</h3>
          <p>
            DimeDossier simplifies your financial management by providing an
            intuitive platform to track and categorize your expenses
            effortlessly. Gain insights into your spending habits, set budgets,
            and visualize your financial goals. Whether you’re saving for a big
            purchase or just want to keep your finances in check, DimeDossier
            empowers you to take control of your money.
          </p>
        </div>
        <div className={styles["main-page-02"]}>
          {page2Data.map((deta, index) => (
            <li className={styles["page2-infoText"]} key={index}>
              ||{deta.icon} {deta.text}||
            </li>
          ))}
        </div>
        <div className={styles["main-page-03"]}>
          <h3>What Users Say !</h3>
          <hr className={styles["custom-hr"]} />
          <span>{"soon i'll update it"}</span>
          <hr className={styles["custom-hr"]} />
        </div>
        <div className={styles["main-page-04"]}>
          <h4>
            process to use the app <FaLevelDownAlt />{" "}
          </h4>
          <div className={styles["processToUSeTheApp"]}>
            {howItWorks.map((wroks) => (
              <li key={wroks.num}>
                <span>
                  {wroks.num} . {wroks.val}
                </span>
              </li>
            ))}
          </div>
        </div>
      </div>
      {/* <ChartSection expenseData={expenseData} /> */}
      <Footer />
    </div>
  );
}

// ₹
