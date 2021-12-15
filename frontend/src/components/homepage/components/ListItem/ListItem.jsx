/* eslint-disable no-unused-vars */
import listitem from "./listitem.module.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
  ArrowDropDown
} from "@material-ui/icons";
import { useState } from "react";

export default function ListItem({ index }) {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
  return (
    <div
      className={listitem.listItem}
      style={{ left: isHovered && index * 225  + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
        alt=""
      />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop />
          <div className={listitem.itemInfo}>
            <div className={listitem.icons}>
              <PlayArrow className={listitem.icon}/>
              <Add className={listitem.icon}/>
              <ThumbUpAltOutlined className={listitem.icon} />
              <ThumbDownOutlined className={listitem.icon} />
              <ArrowDropDown className={listitem.openIcon}/>
            </div>
            <div className={listitem.itemInfoTop}>
              <span>1 hour 14 mins</span>
              <span className={listitem.limit}>+16</span>
              <span>1999</span>
            </div>
            <div className={listitem.desc}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium hic rem eveniet error possimus, neque ex doloribus.
            </div>
            <div className={listitem.genre}>Action</div>
          </div>
        </>
      )}
    </div>
  );
}
