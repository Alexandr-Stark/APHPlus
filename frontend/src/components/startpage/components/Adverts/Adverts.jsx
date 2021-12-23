/* eslint-disable no-unused-vars */
import React from 'react';
import adverts from '../../common/adverts.json';
import styles  from './styles.module.scss';

function Adverts() {
  return (
    <div className={styles.container}>
      {adverts.map((item) => (
        <div className={styles.item} key={item.id} >
            <div className={item.direction==="row" ? styles.inner: styles.innerReverse}>
                <div className={styles.pane}>
                    <h1 className={styles.title}>{item.title}</h1>
                    <h2 className={styles.subTitle}>{item.subTitle}</h2>
                </div>
                <div className={styles.pane}>
                    <img className={styles.image} src={item.image} alt={item.alt} />
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}
export default Adverts;