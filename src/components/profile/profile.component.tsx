import type { FC } from "react";
import React from "react";
import Link from "next/link";
import styles from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle as ProfileIcon } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/client";
import linkStyles from "../../styles/link.module.scss";
import classNames from "classnames";

const Profile: FC = () => {
  const [session] = useSession();

  const profileIcon = <FontAwesomeIcon icon={ProfileIcon} size={"2x"} className={styles.icon} />;

  return (
    <>
      {!session && (
        <Link href="/api/auth/signin">
          <a className={classNames(linkStyles.link, styles.content)}>
            {profileIcon}
            <span className={styles.label}>Sign in</span>
          </a>
        </Link>
      )}
      {session && (
        <div className={classNames(styles.content)}>
          {session.user.image ? <img src={session.user.image} alt={session.user.name ?? "user"} /> : profileIcon}
          <span className={styles.label}>{session.user.name ?? session.user.email}</span>
        </div>
      )}
    </>
  );
};

export { Profile };
