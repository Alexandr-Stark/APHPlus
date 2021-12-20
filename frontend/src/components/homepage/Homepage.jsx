import Navbar from "./components/NavBar/NavBar";
import Featured from "./components/Featured/Featured";
import styles from  './styles.module.scss';
import List from "./components/List/List";
import {useState} from "react";

const Home = ({type}) => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className={styles.home}>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Featured type={type}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;
