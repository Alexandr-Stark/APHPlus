import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import navbar from "./navbar.module.scss";
import { Link } from 'react-router-dom';

const Navbar = ({searchTerm, setSearchTerm}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? `${navbar.navbar} ${navbar.scrolled}` : navbar.navbar}>
      <div className={navbar.container}>
        <div className={navbar.left}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <div className={navbar.menu}>
            <div className={navbar.menuTrigger}>
              <span>Watch</span>
              <ArrowDropDown className={navbar.icon} />
            </div>
            <div className={navbar.menuLinks}>
              <Link to="/browse">
                <span>Homepage</span>
              </Link>
              <Link to="/serial">
                <span>Series</span>
              </Link>
              <Link to="/movie">
                <span>Movies</span>
              </Link>
              <span>New and Popular</span>
              <Link to="/my-list">
                <span>My List</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={navbar.right}>
          <div className={navbar.search}>
            <Search className={navbar.icon} onClick={() => setSearchActive((searchActive) => !searchActive)}/>
            <input type="text" className={searchActive ? navbar.searchInput: navbar.searchInputHidden} value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)} placeholder="Search films and series"/>
          </div>
          <span>Kids</span>
          <Notifications className={navbar.icon} />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className={navbar.profile}>
            <ArrowDropDown className={navbar.icon} />
            <div className={navbar.options}>
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
