//@ts-ignore
import ReactEmoji from "react-emoji";
import styles from "./Message.module.scss";


interface MessageProps
{
    name: string
    message: any;
}

const Message: React.FC<MessageProps> = ({ name, message: { user, text } }: any) => 
{
    if (name === undefined)
    {
        return null;
    }

    let is_sent_by_current_user: boolean = false;

    const trimmed_name = name.trim().toLowerCase();

    if (user === trimmed_name) is_sent_by_current_user = true;

    return (
        is_sent_by_current_user
        ? (
            <div className={`${styles.message_container} ${styles.justify_end}`}>
                <p className={`${styles.sent_text} ${styles.pr_10}`}>
                    {trimmed_name}
                </p>
                <div className={`${styles.message_box} ${styles.bg_dark}`}>
                    <p className={`${styles.message_text} ${styles.color_light}`}>
                        {ReactEmoji.emojify(text)}
                    </p>
                </div>
            </div>
        )
        : (
            <div className={`${styles.message_container} ${styles.justify_start}`}>
                <div className={`${styles.message_box} ${styles.bg_light}`}>
                    <p className={`${styles.message_text} ${styles.color_dark}`}>
                        {ReactEmoji.emojify(text)}
                    </p>
                </div>
                <p className={`${styles.sent_text} ${styles.pl_10}`}>
                    {user}
                </p>
            </div>
        )
    );
}

export default Message;