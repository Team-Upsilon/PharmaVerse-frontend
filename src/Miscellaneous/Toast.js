import React from 'react';
import { message } from 'antd';

const ToastComponent = ({ type, title, description, duration }) => {
  React.useEffect(() => {
    const key = message[type]({
      content: (
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
      ),
      duration: duration / 1000, // Convert to seconds
    });

    return () => {
      message.destroy(key);
    };
  }, [type, title, description, duration]);

  return null;
};

export default ToastComponent;
