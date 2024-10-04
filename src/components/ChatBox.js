import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage';

const ChatBox = ({ chatLog, onSelectMessage, isLoading }) => {
    const [loadingMessage, setLoadingMessage] = useState('...');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (isLoading) {
            const loadingStages = ['⌛', '🔄', '⏳', '🔃'];
            let currentStage = 0;
            const interval = setInterval(() => {
                setLoadingMessage(loadingStages[currentStage]);
                currentStage = (currentStage + 1) % loadingStages.length;
            }, 500); // 500밀리초마다 업데이트
            return () => clearInterval(interval); // 정리 함수
        }
    }, [isLoading]);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatLog, isLoading]);

    return (
        <Box
            sx={{
                minHeight: '600px',
                maxHeight: '800px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                p: 2,
                mb: 2,
                backgroundColor: '#f5f5f5',
            }}
        >
            {chatLog.map((chat, index) => (
                <motion.div
                    key={index}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                >
                    <ChatMessage
                        sender={chat.sender}
                        text={chat.text}
                        onClick={() => onSelectMessage(index)}
                    />
                </motion.div>
            ))}
            {isLoading && (
                <motion.div
                    key={'loading'}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.3, delay: 0.1}}
                >
                    <ChatMessage sender={'system'} text={loadingMessage} onClick={() => {
                    }}/>
                </motion.div>
            )}
            <div ref={bottomRef}/>
        </Box>
    );
};

export default ChatBox;