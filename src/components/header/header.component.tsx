import React from "react";
import styles from "./header.module.scss";
import gridStyles from "../../styles/grid.module.scss";
import humburger from "../../assets/icons/humburger.svg";
import logo from "../../assets/icons/logo.svg";
import Link from "next/link";
import classNames from "classnames";

const Header: React.FC<{ appName: string }> = (props) => {
  return (
    <header className={classNames(styles.root)}>
      <div className={classNames(gridStyles.container, styles.content)}>
        <Link href={"/"}>
          <a className={styles.link}>
            <img className={classNames(styles.menu)} src={logo} alt={props.appName} />
            <h1 className={styles.title}>{props.appName}</h1>
          </a>
        </Link>
        <img className={styles.menu} src={humburger} alt={"menu"} />
      </div>
    </header>
  );
};

export { Header };
