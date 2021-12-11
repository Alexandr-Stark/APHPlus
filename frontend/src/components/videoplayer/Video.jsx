import { ArrowBackOutlined } from "@material-ui/icons";
import video from "./video.module.scss";

export default function Video() {
  return (
    <div className={video.watch}>
      <div className={video.back}>
        <ArrowBackOutlined />
        Home
      </div>
      <iframe
        className={video.video}
        src="https://www.youtube.com/embed/wvO4b-CYdTQ?autoplay=1&mute=1"
        frameBorder="0" 
        allow="autoplay; encrypted-media"
        allowFullScreen 
      />
    </div>
  );
}