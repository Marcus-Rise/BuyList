import React from "react";
import styles from "./header.module.scss";
import humburger from "../../assets/icons/humburger.svg";
import logo from "../../assets/icons/logo.svg";
import Link from "next/link";
import classNames from "classnames";

const Header: React.FC<{ appName: string }> = (props) => {
  return (
    <header className={classNames(styles.root)}>
      <div className="container">
        <div className={classNames("row", "justify-content-between", "align-items-center")}>
          <div className="col">
            <Link href={"/"}>
              <a className={styles.link}>
                <div className={classNames("d-flex", "align-items-center", "justify-content-start")}>
                  <img className={classNames(styles.menu, "mr-2")} src={logo} alt={props.appName} />
                  <h1 className={styles.title}>{props.appName}</h1>
                </div>
              </a>
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

export { Header };
