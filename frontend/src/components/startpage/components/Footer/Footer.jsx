import React from 'react';
import styles from "./styles.module.scss";

function Footer(){
    return (
        <div className={styles.container}>
            <p className={styles.title}>Questions? Contact us.</p>
            <div className={styles.row}>
                <div className={styles.column}>
                    <a href="">FAQ</a>
                    <a href="">Investor Relations</a>
                    <a href="">Ways to Watch</a>
                    <a href="">Corporate Information</a>
                    <a href="">APH+ Originals</a>
                </div>
                <div className={styles.column}>
                    <a href="">Help Centre</a>
                    <a href="">Jobs</a>
                    <a href="">Terms of Use</a>
                    <a href="">Contact Us</a>
                </div>
                <div className={styles.column}>
                    <a href="">Account</a>
                    <a href="">Redeem gift cards</a>
                    <a href="">Privacy</a>
                    <a href="">Speed Test</a>
                </div>
                <div className={styles.column}>
                    <a href="">Media Centre</a>
                    <a href="">Buy gift cards</a>
                    <a href="">Cookie Preferences</a>
                    <a href="">Legal Notices</a>
                </div>
            </div>
            <p className={styles.text}>APH+ Ukraine</p>
        </div>
    )
}
export default Footer;