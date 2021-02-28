import React from "react";
import styles from "./header.module.scss";
import gridStyles from "../../styles/grid.module.scss";
import linkStyles from "../../styles/link.module.scss";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import Link from "next/link";
import classNames from "classnames";
import { Profile } from "../profile";
import { Synchronize } from "../synchronize";
import { useSession } from "next-auth/client";

interface IProps {
  appName: string;
}

const Header: React.FC<IProps> = (props) => {
  const [session] = useSession();

  return (
    <header className={classNames(styles.root)}>
      <div className={classNames(gridStyles.container, styles.content)}>
        <Link href={"/"}>
          <a className={classNames(styles.logo, linkStyles.link)}>
            <Logo />
            <h1 className={styles.title}>{props.appName}</h1>
          </a>
        </Link>
        <Profile />
        {session && <Synchronize />}
      </div>
    </header>
  );
};

export { Header };
