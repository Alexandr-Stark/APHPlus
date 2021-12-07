import Navbar from "./components/NavBar/NavBar";
import Featured from "./components/Featured/Featured";
import './homepage.scss';
import List from "./components/List/List";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured/>
      <List/>
      <List/>
      <List/>
      <List/>
    </div>
  );
};

export default Home;
