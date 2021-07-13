import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Join.module.scss";


const Join: React.FC = () => 
{
    const [name, set_name] = useState('');
    const [room, set_room] = useState('');

    return (
        <div className={styles.join_outer_container}>
            <div className={styles.join_inner_container}>
                <h1 className={styles.heading}>Join</h1>
                <div>
                    <input 
                        placeholder="Name" 
                        className={styles.join_input} 
                        type="text" 
                        onChange={e => set_name(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        placeholder="Room" 
                        className={`${styles.join_input} ${styles.mt_20}`} 
                        type="text" 
                        onChange={e => set_room(e.target.value)}
                    />
                </div>
                <Link 
                    onClick={
                        e => (!name || !room) ? e.preventDefault() : null
                    }
                    to={`/chat?name=${name}&room=${room}`}
                >
                    <button
                        className={`${styles.button} ${styles.mt_20}`}
                        type="submit"
                    >
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Join;