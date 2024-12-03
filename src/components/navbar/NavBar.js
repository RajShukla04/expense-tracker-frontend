import React from "react";

import styles from "./Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
const NavBar = (props) => {
  return (
    <div className={styles["nav-main"]}>
      <div className={styles["nav-content"]}>
        <Image
          src={"/DDlogo.png"}
          alt="logo"
          height={50}
          color="#fff"
          width={50}
        />
        <div className={styles["nav-links"]}>
          <Link href={`/${props.dashboard}`}>{props.dashboard}</Link>
          <Link href={`/${props.register}`}>{props.register}</Link>
          <Link href={`/${props.login}`}>{props.login}</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
