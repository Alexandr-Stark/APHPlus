import Navbar from "./components/NavBar/NavBar";
import Featured from "./components/Featured/Featured";
import styles from  './styles.module.scss';
import List from "./components/List/List";

const Home = ({type}) => {
  return (
    <div className={styles.home}>
      <Navbar />
      <Featured type={type}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;
