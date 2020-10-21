import React from "react";
import styles from "./header.module.scss";
import humburger from "../assets/icons/humburger.svg";
import logo from "../assets/icons/logo_icon.svg";

export const Header: React.FC = () => {
  const title = "BuyList";

  return (
    <header className={["py-3 px-1", styles.header].join(" ")}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <a className={`${styles.link} d-flex align-items-center justify-content-start`} href={"/"}>
              <img className={`${styles.logo} mr-2`} src={logo} alt={title} />
              <h1 className={styles.title}>{title}</h1>
            </a>
          </div>
          <div className="col-auto">
            <img src={humburger} alt={"menu"} />
          </div>
        </div>
      </div>
    </header>
  );
};
