{/*fade this it doesn't work*/}
import React, { useState } from 'react';
import {
  Webchat,
  WebchatProvider,
  Fab,
  getClient,
} from '@botpress/webchat';

const clientId = "ff43df44-7d36-4401-b673-736e9633a08d";

const configuration = {
  color: '#000',
};

export const ChatComponent = () => {
  const client = getClient({
    clientId,
  });

  const [isWebchatOpen, setIsWebchatOpen] = useState(false);

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <WebchatProvider client={client} configuration={configuration}>
        <Fab onClick={toggleWebchat} />
        {isWebchatOpen && <Webchat />}
      </WebchatProvider>
    </div>
  );
}; 