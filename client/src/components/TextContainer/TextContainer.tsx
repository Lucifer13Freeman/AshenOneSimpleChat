import React from 'react';
import online_icon from '../../icons/online_icon.png';
import styles from './TextContainer.module.scss';

interface TextContainerProps
{
  users: any;
}

const TextContainer: React.FC<TextContainerProps> = ({ users }) => 
(
  <div className={`${styles.text_container}`}>
    <div>
      <h1>Realtime Chat Application 
        <span role="img" aria-label="emoji">💬</span>
      </h1>
      <h2>Created with React, Express, Node and Socket.IO
        <span role="img" aria-label="emoji">💎</span>
      </h2>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className={`${styles.active_container}`}>
              <h2>
                {users.map(({ name }: any) => (
                  <div key={name} className={`${styles.active_item}`}>
                    {name}
                    <img alt="Online Icon" src={online_icon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;