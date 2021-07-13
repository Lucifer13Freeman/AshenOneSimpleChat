
import styles from "./InfoBar.module.scss";
import online_icon from "../../icons/online_icon.png";
import close_icon from "../../icons/close_icon.png";


interface InfoBarProps
{
    room: string;
}

const InfoBar: React.FC<InfoBarProps> = ({ room }) => 
{
    return (
        <div className={`${styles.info_bar}`}>
            <div className={`${styles.left_inner_container}`}>
                <img 
                    className={`${styles.online_icon}`} 
                    src={online_icon} 
                    alt="online"
                />
                <h3>{room}</h3>
            </div>
            <div className={`${styles.right_inner_container}`}>
                <a href="/">
                    <img 
                        src={close_icon} 
                        alt="close"
                    />
                </a>
            </div>
        </div>
    );
}

export default InfoBar;