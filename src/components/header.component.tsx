import React from "react";
import styles from "./header.module.scss";
import humburger from "../assets/icons/humburger.svg";
import logo from "../assets/icons/logo.svg";
import Link from "next/link";

export const Header: React.FC = () => {
  const title = "BuyList";

  return (
    <header className={["py-3 px-1", styles.header].join(" ")}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <Link href={"/"}>
              <div className={`${styles.link} d-flex align-items-center justify-content-start`}>
                <img className={`${styles.menu} mr-2`} src={logo} alt={title} />
                <h1 className={styles.title}>{title}</h1>
              </div>
            </Link>
          </div>
          <div className="col-auto">
            <img className={styles.menu} src={humburger} alt={"menu"} />
          </div>
        </div>
      </div>
    </header>
  );
};
