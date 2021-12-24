import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
  import { useRef, useState } from "react";
  import SeasonItem from "../season-item/SeasonItem";
  import styles from "./styles.module.scss";

  export default function Season({movieId, season}) {
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
        <span className={styles.listTitle}>Season {season?.seasonNumber}</span>
        <div className={styles.wrapper}>
          <ArrowBackIosOutlined
            className={`${styles.sliderArrow} ${styles.left}`}
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className={styles.container} ref={listRef}>
            {season?.episodes.map( (episode, index) => <SeasonItem key={episode?._id} index={index} movieId={movieId} episode={episode}/>)}
          </div>
          <ArrowForwardIosOutlined
            className={`${styles.sliderArrow} ${styles.right}`}
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }