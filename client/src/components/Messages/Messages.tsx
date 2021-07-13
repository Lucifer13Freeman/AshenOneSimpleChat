import styles from "./Messages.module.scss";
//@ts-ignore
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";


interface MessagesProps
{
    name: string
    messages: any[];
}

const Messages: React.FC<MessagesProps> = ({ name, messages }) => 
{
    return (
        <ScrollToBottom className={`${styles.messages}`}>
            { messages.map((message, i) => 
                <div key={i}>
                    <Message
                        name={name}
                        message={message}
                    />
                </div>
            )}
        </ScrollToBottom>
    );
}

export default Messages;