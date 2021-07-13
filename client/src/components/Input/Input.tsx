import styles from "./Input.module.scss";


interface InputProps
{
    message: string;
    set_message: Function;
    send_message: Function;
}

const Input: React.FC<InputProps> = ({ message, set_message, send_message}) => 
{
    return (
        <form className={`${styles.form}`}>
            <input 
                className={`${styles.input}`}
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={e => set_message(e.target.value)}
                onKeyPress={e => e.key === 'Enter' ? send_message(e) : null}
            />
            <button 
                className={`${styles.send_button}`}
                onClick={e => send_message(e)}
            >
                Send
            </button>
        </form>
    );
}

export default Input;