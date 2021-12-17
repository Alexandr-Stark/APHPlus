import {
    ArrowBackIosOutlined,
    ArrowForwardIosOutlined,
  } from "@material-ui/icons";
  import { useRef, useState } from "react";
  import ListItem from "../ListItem/ListItem";
  import list from "./list.module.scss";
  import { Link } from 'react-router-dom';
  
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
      <div className={list.list}>
        <span className={list.listTitle}>Continue to watch</span><Link to="/continue-watching" className={list.link}>watch all</Link>
        <div className={list.wrapper}>
          <ArrowBackIosOutlined
            className={`${list.sliderArrow} ${list.left}`}
            onClick={() => handleClick("left")}
            style={{ display: !isMoved && "none" }}
          />
          <div className={list.container} ref={listRef}>
            <ListItem index={0} />
            <ListItem index={1} />
            <ListItem index={2} />
            <ListItem index={3} />
            <ListItem index={4} />
            <ListItem index={5} />
            <ListItem index={6} />
            <ListItem index={7} />
            <ListItem index={8} />
            <ListItem index={9} />
          </div>
          <ArrowForwardIosOutlined
            className={`${list.sliderArrow} ${list.right}`}
            onClick={() => handleClick("right")}
          />
        </div>
      </div>
    );
  }
  