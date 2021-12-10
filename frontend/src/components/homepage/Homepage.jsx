import Navbar from "./components/NavBar/NavBar";
import Featured from "./components/Featured/Featured";
import homepage from  './homepage.module.scss';
import List from "./components/List/List";

const Home = () => {
  return (
    <div className={homepage.home}>
      <Navbar />
      <Featured type={"movie"}/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;
