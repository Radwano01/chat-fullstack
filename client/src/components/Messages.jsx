import React, { useEffect, useState } from 'react';
import "../styles/messages.scss";
import userImage from "../assets/useraccount.png";
import { gql, useQuery } from '@apollo/client';
import ChatInput from './ChatInput';
import Loading from './Loading';

const GET_SENDER_MESSAGES = gql`
    query messages($input: messagesInput) {
        senderMessages(input: $input) {
            sender_id
            receiver_id
            message_text
            sent_at
        }
    }
`;

const GET_RECEIVER_MESSAGES = gql`
    query messages($input: messagesInput) {
        receiverMessages(input: $input) {
            sender_id
            receiver_id
            message_text
            sent_at
        }
    }
`;

const Messages = () => {
    const sender = window.localStorage.getItem("username");
    const receiver = window.localStorage.getItem("receiver");

    const { data: senderdata, loading: senderLoading } = useQuery(GET_SENDER_MESSAGES, { variables: { input: { sender_id: sender, receiver_id: receiver } } });
    const { data: receiverdata, loading: receiverLoading } = useQuery(GET_RECEIVER_MESSAGES, { variables: { input: { sender_id: receiver, receiver_id: sender } } });

    const senderMessages = senderdata?.senderMessages || [];
    const receiverMessages = receiverdata?.receiverMessages || [];

    return (
        <div className='messages'>
            {senderLoading || receiverLoading ? <Loading /> : null}
            <div className="messages-container">
                <div className="card">
                    <div className="text">
                        {/* <div className="left">
                            <img src={userImage} alt="" />
                        </div> */}
                        {senderMessages.length > 0 ? (
                            senderMessages.map((message, index) => (
                                <div className='mapped-message' key={index}>
                                    <div className="right">
                                        <h4>{message.sender_id}</h4>
                                        <h4>{message.message_text}</h4>
                                        <h6>{new Date(Number(message.sent_at)).toLocaleString('en-US', { hour12: false })}</h6>
                                    </div>
                                </div>
                            ))
                        ) : (
                            "No sender messages"
                        )}
                    </div>
                </div>
                <div className="card">
                    <div className="text">
                        {/* <div className="left">
                            <img src={userImage} alt="" />
                        </div> */}
                        {receiverMessages.length > 0 ? (
                            receiverMessages.map((message, index) => (
                                <div className='mapped-message' key={index}>
                                    <div className="right">
                                        <h4>{message.sender_id}</h4>
                                        <h4>{message.message_text}</h4>
                                        <h6>{new Date(Number(message.sent_at)).toLocaleString('en-US', { hour12: false })}</h6>
                                    </div>
                                </div>
                            ))
                        ) : (
                            "No receiver messages"
                        )}
                    </div>
                </div>
            </div>
            <ChatInput />
        </div>
    );
}

export default Messages;
