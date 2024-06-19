import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid'; // uuid 모듈 가져오기

const userAvatars = {
  user1: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
  user2: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
};

function Chat() {
  const username = "user1"; // 테스트용 사용자 이름
  const room = "default-room"; // 테스트용 방 이름
  const inputRef = useRef();
  const [messageList, setMessageList] = useState([]);
  const messageBottomRef = useRef(null);

  const sendMessage = () => {
    const currentMsg = inputRef.current.value;
    if (currentMsg !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: userAvatars[username],
      };
      setMessageList((list) => [...list, messageData]);
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    messageBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const otherUser =
    messageList.find((msg) => msg.author !== username)?.author || "상대방";

  return (
    <PageContainer>
      <RoomContainer>
        <RoomHeader>
          <RoomTitle>{otherUser}</RoomTitle>
        </RoomHeader>
        <RoomBody>
          <MessageBox>
            {messageList.map((messageContent) => (
              <Message
                messageContent={messageContent}
                username={username}
                key={uuidv4()}
              />
            ))}
            <div ref={messageBottomRef} />
          </MessageBox>
        </RoomBody>
        <ChatInputBox>
          <ChatInput
            ref={inputRef}
            type="text"
            placeholder="메세지를 입력해주세요"
            onKeyPress={(event) => {
              event.key === 'Enter' && sendMessage();
            }}
          />
          <ChatButton onClick={sendMessage}>▹</ChatButton>
        </ChatInputBox>
      </RoomContainer>
    </PageContainer>
  );
}

export default Chat;

const PageContainer = styled.div`
  background-color: #eeefee; /* 웹페이지 전체 배경색 */
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomContainer = styled.div`
  width: 500px; /* 채팅방 너비 */
  height: 600px; /* 채팅방 높이 */
  background-color: #ffffff; /* 채팅방 내 배경색 */
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RoomHeader = styled.div`
  height: 50px;
  border-radius: 6px 6px 0 0;
  background: #ffffff;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* 사방으로 그림자 효과 추가 */
  border-bottom: 1px solid #eeefee;
`;

const RoomTitle = styled.p`
  margin: 0;
  display: block;
  padding: 0 1em;
  color: #000000;
  font-weight: 700;
  line-height: 50px;
`;

const RoomBody = styled.div`
  flex: 1;
  border: 1px solid #ffffff;
  background: #ffffff;
  position: relative;
  overflow-y: auto;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-top: 5px;
`;

const ChatInputBox = styled.div`
  height: 50px;
  border-top: 1px solid #eeefee;
  display: flex;
  border-radius: 0 0 6px 6px;
  background-color: #ffffff; 
`;

const ChatInput = styled.input`
  height: 100%;
  flex: 85%;
  border: 0;
  padding: 0 0.7em;
  font-size: 1em;
  border-right: 1px solid #eeefee;
  outline: none;
  background: transparent;
`;

const ChatButton = styled.button`
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  flex: 15%;
  height: 100%;
  background: transparent;
  outline: none;
  font-size: 25px;
  transition: all 0.5s;
  color: lightgray;
  opacity: 0.5;
  &:hover {
    background: #3d4a79;
    transition: all 0.5s;
  }
  &:active {
    background: darkblue;
    font-size: 0.5rem;
  }
`;
