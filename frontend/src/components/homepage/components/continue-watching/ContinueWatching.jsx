
import Navbar from "../NavBar/NavBar";
import Item from "./components/Item";
import styles from  './styles.module.scss';

function ContinueWatching() {
  return (
    <div className={styles.container}>
      <Navbar />
      <h2>Continue watching</h2>
      <div className={styles.wrapper}>
        <Item index={0}/>
        <Item index={1}/>
        <Item index={2}/>
        <Item index={3}/>
        <Item index={4}/>
        <Item index={5}/>
        <Item index={6}/>
        <Item index={7}/>
        <Item index={8}/>
        <Item index={9}/>
      </div>
    </div>
  );
}

export default ContinueWatching;
