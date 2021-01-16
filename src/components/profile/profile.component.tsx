import type { FC } from "react";
import React from "react";
import Link from "next/link";
import styles from "./profile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle as ProfileIcon } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt as SignOutIcon } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/client";
import linkStyles from "../../styles/link.module.scss";
import classNames from "classnames";
import { Avatar } from "../avatar";
import { Button } from "../button";

const Profile: FC = () => {
  const [session] = useSession();

  const profileIcon = <FontAwesomeIcon icon={ProfileIcon} size={"2x"} className={styles.icon} />;

  return (
    <div className={styles.root}>
      {!session && (
        <Link href="/api/auth/signin">
          <a className={classNames(linkStyles.link, styles.content)}>
            {profileIcon}
            <span>Sign in</span>
          </a>
        </Link>
      )}
      {session && (
        <div className={classNames(styles.content)}>
          {session.user.image ? (
            <Avatar src={session.user.image} alt={session.user.name ?? "user"} size={"32px"} />
          ) : (
            profileIcon
          )}
          <span>{session.user.name ?? session.user.email}</span>
          <Link href="/api/auth/signout">
            <a className={linkStyles.link} title={"Signout"}>
              <FontAwesomeIcon icon={SignOutIcon} size={"lg"} />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export { Profile };
