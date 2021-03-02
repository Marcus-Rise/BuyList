import type { FC } from "react";
import React from "react";
import styles from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt as SignOutIcon, faUserCircle as ProfileIcon } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/client";
import classNames from "classnames";
import { Avatar } from "../avatar";

const Profile: FC<{
  className?: string;
}> = (props) => {
  const [session] = useSession();

  const profileIcon = <FontAwesomeIcon icon={ProfileIcon} className={classNames(styles.icon, styles.avatar)} />;

  return (
    <>
      {!session?.user && (
        <button onClick={() => signIn()} className={classNames(styles.root, props.className)}>
          {profileIcon}
          <span className={styles.text}>Sign in</span>
        </button>
      )}
      {session?.user && (
        <button onClick={() => signOut()} className={classNames(styles.root, props.className)}>
          {session.user.image ? (
            <Avatar className={styles.avatar} src={session.user.image} alt={session.user.name ?? "user"} />
          ) : (
            profileIcon
          )}
          <span className={styles.text}>{session.user.name ?? session.user.email}</span>
          <FontAwesomeIcon icon={SignOutIcon} size={"lg"} />
        </button>
      )}
    </>
  );
};

export { Profile };
