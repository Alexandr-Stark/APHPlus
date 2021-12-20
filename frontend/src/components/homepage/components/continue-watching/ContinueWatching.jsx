import Navbar from "../NavBar/NavBar";
import ListItem from "../ListItem/ListItem";
import styles from  './styles.module.scss';

function ContinueWatching({title}) {
  return (
    <div className={styles.container}>
      <Navbar />
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        <ListItem index={0}/>
        <ListItem index={1}/>
        <ListItem index={2}/>
        <ListItem index={3}/>
        <ListItem index={4}/>
        <ListItem index={5}/>
        <ListItem index={6}/>
        <ListItem index={7}/>
        <ListItem index={8}/>
        <ListItem index={9}/>
      </div>
    </div>
  );
}

export default ContinueWatching;
