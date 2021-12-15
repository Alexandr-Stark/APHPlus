import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
  import { useRef, useState } from "react";
  import SeasonItem from "../SeasonItem/SeasonItem";
  import styles from "./styles.module.scss";
  
  export default function List() {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
    window.addEventListener('resize', ()=>{
      setClickLimit(window.innerWidth / 230)
    }, true);
    const listRef = useRef();
  
    const handleClick = (direction) => {
      setIsMoved(true);
      let distance = listRef.current.getBoundingClientRect().x - 50;
      if (direction === "left" && slideNumber > 0) {
        setSlideNumber(slideNumber - 1);
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
      }
      if (direction === "right" && slideNumber < 10 - clickLimit) {
        setSlideNumber(slideNumber + 1);
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      }
    };
    return (
      <div className={styles.list}>
        <span className={styles.listTitle}>Season №</span>
        <div className={styles.wrapper}>
          <ArrowBackIosOutlined
            className={`${styles.sliderArrow} ${styles.left}`}
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className={styles.container} ref={listRef}>
            
            <SeasonItem index={0} />
            <SeasonItem index={1} />
            <SeasonItem index={2} />
            <SeasonItem index={3} />
            <SeasonItem index={4} />
            <SeasonItem index={5} />
            <SeasonItem index={6} />
            <SeasonItem index={7} />
            <SeasonItem index={8} />
            <SeasonItem index={9} />
          </div>
          <ArrowForwardIosOutlined
            className={`${styles.sliderArrow} ${styles.right}`}
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }
  