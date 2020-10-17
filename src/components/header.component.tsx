import React from "react";
import styles from "./header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={["py-3", styles.header].join(" ")}>
      <div className="container-fluid">
        <a className={styles.link} href={"/"}>
          <h1 className={styles.title}>BuyList</h1>
        </a>
      </div>
    </header>
  );
};
