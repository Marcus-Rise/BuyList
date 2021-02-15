import React from "react";
import styles from "./footer.module.scss";

interface IProps {
  year: string | number;
  author: string;
  authorLink: string;
}

const Footer: React.FC<IProps> = (props) => {
  return (
    <footer className={styles.footer}>
      <span className="mr-1">&#9400; {props.year}</span>
      <a href={props.authorLink} target={"_blank"} rel="noreferrer">
        {props.author}
      </a>
    </footer>
  );
};

export { Footer };
