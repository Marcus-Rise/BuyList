import React from "react";
import styles from "./header.module.scss";
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
      <Link href={"/"}>
        <a className={classNames(styles.logo)}>
          <Logo />
          <h1 className={styles.title}>{props.appName}</h1>
        </a>
      </Link>
      <Profile className={styles.profile} />
      {session?.user && <Synchronize className={styles.sync} />}
    </header>
  );
};

export { Header };
