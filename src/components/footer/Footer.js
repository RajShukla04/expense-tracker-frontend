// import React from "react";
// import styles from "./Footer.module.css";
// const Footer = () => {
//   return (
//     <div className={styles.footerMain}>
//       <span>About || Contact || Privacy Policy </span>
//     </div>
//   );
// };

// export default Footer;
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerMain}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>
            We are committed to providing a seamless experience for managing
            your finances. Our platform is designed to help you track, analyze,
            and optimize your expenses effectively.
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <p>Email: rajshukla031@proton.me</p>
          <p>Address: india</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 ExpenseTracker Inc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
