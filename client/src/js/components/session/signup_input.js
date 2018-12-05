import React from "react";

import styles from "../../../css/register.module.scss";

const SignUpInput = ({ type, update, error, placeholder, name, value }) => {
  const style = error
    ? `${styles.field} ${styles.hasError}`
    : styles.field;

  const err = error
    ? <span className={`${styles.errorMessage} animated fadeIn`}>* {error}</span>
    : null;

  return (
    <>
      <input 
        type={type}
        className={style}
        onChange={update(name)}
        value={value}
        placeholder={placeholder} />
      {err}
    </>
  );
};

export default SignUpInput;