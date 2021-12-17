import faqs from "../../common/faqs.json";
import React from "react";
import styles from "./styles.module.scss";
import {Item, Header, Body} from "./components/Item";

function Faq() {
    return(
        <div className={styles.container}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Frequently Asked Questions</h1>
                <div className={styles.frame}>
                    {faqs.map((item)=>(
                        <Item className={styles.item} key={item.id}>
                            <Header className={styles.header}>{item.header}</Header>
                            <Body>{item.body}</Body>
                        </Item>
                    ))
                    }
                </div>

                <div className={styles.optForm}>
                    <input className={styles.input} placeholder="Email address" />
                    <button className={styles.button}>Try it now</button>
                    <p className={styles.text}>
                        Ready to watch? Enter your email to create or restart your
                        membership.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default Faq;