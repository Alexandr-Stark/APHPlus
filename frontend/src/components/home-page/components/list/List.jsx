import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from '@material-ui/icons';
import { useRef, useState } from 'react';
import ListItem from '../list-item/ListItem';
import { useLocation } from 'react-router-dom';
import styles from './styles.module.scss';

function List({ movies, label }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
  const search = useLocation().search;
  const genreName = new URLSearchParams(search).get('genre');
  const SLIDER_ITEMS_COUNT = handleGenre(movies).length;

  window.addEventListener(
    'resize',
    () => {
      setClickLimit(window.innerWidth / 230);
    },
    true,
  );
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === 'left' && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (
      direction === 'right' &&
      slideNumber < SLIDER_ITEMS_COUNT - clickLimit
    ) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  function handleGenre(arr) {
    if (genreName === null) return movies;
    const moviesByGenre = [];
    arr.forEach ( (item) => {
      const genres = item.genres.map( (genre) => genre.title);
      if(genres.includes(genreName)) moviesByGenre.push(item);
    });
    return moviesByGenre;
  }

  const handleUnavalibleContent = () => handleGenre(movies).length === 0;

  const renderItemList = (list) => {
    const arr = [];
    const sortedByGenre = handleGenre(list);
    let counter = 0;

    if (handleUnavalibleContent()) return;

    for (let i = 0; i < SLIDER_ITEMS_COUNT; i++) {
      arr.push(
        <ListItem
          key={i + '_' + new Date()}
          movie={sortedByGenre[counter]}
          index={i}
        />,
      );
      if (counter < sortedByGenre.length) counter++;
    }
    return arr;
  };

  return (
    <div className={styles.list}>
      {handleUnavalibleContent() ? (
          <span style={{color: "#ffffff52"}} className={styles.listTitle}>
          {genreName} for {label} not found
        </span>
      ) : (
        <>
        <span className={styles.listTitle}>{label}</span>
        <div className={styles.wrapper}>
          <ArrowBackIosOutlined
            className={`${styles.sliderArrow} ${styles.left}`}
            onClick={() => handleClick('left')}
            style={{ display: !isMoved && 'none' }}
          />
          <div className={styles.container} ref={listRef}>
            {renderItemList(movies)}
          </div>
          <ArrowForwardIosOutlined
            className={`${styles.sliderArrow} ${styles.right}`}
            onClick={() => handleClick('right')}
          />
        </div>
      </>
      )}
    </div>
  );
}

export default List;
