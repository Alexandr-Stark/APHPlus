/* eslint no-console: "off" */
import { ArrowBackOutlined } from "@material-ui/icons";
import styles from "./styles.module.scss";
import {Link} from "react-router-dom";

function Video() {
  const goBack = ()=>{
    //change later to server quary for stop watching time
    console.log(document.getElementById("#player").currentTime);
  }
    const pause = ()=>{
      console.log(document.getElementById("#player").currentTime);
    }
  return (
    <div className={styles.watch}>
      <div className={styles.back} onClick={goBack}>
        <Link to={"/browse"}>
        <ArrowBackOutlined />
        Home
        </Link>
      </div>
      <video
        className={styles.video}
        id="#player"
        src="//storage.googleapis.com/media-session/caminandes/short.mp4#t=60.335772"
        controls
        onPause={pause}
        controlsList="nodownload"
        />
    </div>
  );
}
export default Video;