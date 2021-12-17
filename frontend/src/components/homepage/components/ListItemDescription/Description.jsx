/* eslint-disable no-unused-vars */
import { ArrowBackOutlined,
    PlayArrow,
    Add,
    ThumbUpAltOutlined,
    ThumbDownOutlined, } from "@material-ui/icons";
import styles from "./styles.module.scss";
import Season from "./components/Season/Season";
import { Link } from 'react-router-dom';

export default function Description({ index, type }) {
    const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
    const isSerial = type==="serial";
    return (
    <div className={styles.desc}>
      <Link to="/browse">
      <ArrowBackOutlined className={styles.backicon}/>
      </Link>
      <div className={styles.videoWrapper}>
        <video src={trailer} autoPlay={true} loop className={styles.player} />
        <div className={styles.icons}>
          <Link to="/watch">
          <PlayArrow className={styles.icon}/>
          </Link>
          <Add className={styles.icon}/>
          <ThumbUpAltOutlined className={styles.icon} />
          <ThumbDownOutlined className={styles.icon} />
        </div>
      </div>
      <div className={styles.content}>
          <div className={styles.titledesc}>
            <div className={styles.itemInfoTop}>
              <span>1 hour or count of seasons</span>
              <span className={styles.limit}>+16</span>
              <span>1999</span>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. In, laborum? Tempora, laudantium optio maxime reiciendis veritatis at exercitationem perferendis excepturi</p>
          </div>
          <div className={styles.SecondaryInfo}>
            <div>
                <p><span className={styles.grey}>Casting:   </span>
                Some People, Some Woman, Some Man, Some Dude, Some Child
                </p>
            </div>
            <div>
            <p><span className={styles.grey}>Ganres:   </span>
                Serials, fantasy, drama
                </p>
            </div>
            <div>
            <p><span className={styles.grey}>About:   </span>
                Exciting
                </p>
            </div>
          </div>
      </div>
      {isSerial &&(<>
        <Season/>
        <Season/>
        <Season/>
        <Season/>
      </>)}
      
    </div>
  );
}
