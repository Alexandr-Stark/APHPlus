import React, { useState, useContext, createContext } from 'react';
import {Add, Close} from '@material-ui/icons';
import styles from "../styles.module.scss"

const ToggleContext = createContext();

export function Item({children, ...restProps}){
    const [toggleShow, setToggleShow] = useState(false);
    return (
        <ToggleContext.Provider value={{toggleShow, setToggleShow}}>
            <div {...restProps}>{children}</div>
        </ToggleContext.Provider>
    );
}
export function Header({ children, ...restProps }) {
    const { toggleShow, setToggleShow } = useContext(ToggleContext);
  
    return (
      <div onClick={() => setToggleShow(!toggleShow)} {...restProps}>
        {children}
        {toggleShow ? (
          <Close className={styles.ico}/>
        ) : (
          <Add className={styles.ico} />
        )}
      </div>
    );
  }
  
export function Body({ children, ...restProps }) {
    const { toggleShow } = useContext(ToggleContext);
    return (
      <div className={toggleShow ? `${styles.body} ${styles.open}` : `${styles.body} ${styles.closed}`} {...restProps}>
        <span>{children}</span>
      </div>
    );
  }