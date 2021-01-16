import React from "react";
import styles from "./header.module.scss";
import gridStyles from "../../styles/grid.module.scss";
import { ReactComponent as MenuIcon } from "../../assets/icons/humburger.svg";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import Link from "next/link";
import classNames from "classnames";

const Header: React.FC<{ appName: string }> = (props) => {
  return (
    <header className={classNames(styles.root)}>
      <div className={classNames(gridStyles.container, styles.content)}>
        <Link href={"/"}>
          <a className={styles.link}>
            <Logo />
            <h1 className={styles.title}>{props.appName}</h1>
          </a>
        </Link>
        <MenuIcon />
      </div>
    </header>
  );
};

export { Header };
