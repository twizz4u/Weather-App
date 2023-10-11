import classes from "./Days.module.css";

const Days = (prop) => {
  return <div className={classes.container}>{prop.children}</div>;
};

export default Days;
