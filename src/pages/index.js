import React from 'react';
import axios from 'axios';
import { Container, Box, Typography, Grid, Paper, IconButton } from '@mui/material';
import { Refresh, Code } from '@mui/icons-material'; // Refresh 및 Code 아이콘 임포트
import ChatBox from '../components/ChatBox';
import ChatInput from '../components/ChatInput';
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { v4 as uuidv4 } from 'uuid';

// 환경 변수에서 API 엔드포인트 가져오기
const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || '/api/echo'; // 기본값 설정 가능

export default function Home() {
  const [message, setMessage] = React.useState('');
  const [chatLog, setChatLog] = React.useState([]);
  const [selectedResponse, setSelectedResponse] = React.useState(null);
  const [sessionId, setSessionId] = React.useState(uuidv4);
  const [isLoading, setIsLoading] = React.useState(false); // 로딩 상태 추가
  const [showJsonView, setShowJsonView] = React.useState(true); // JSON 뷰어 표시 상태 추가
  const [loadingMessage, setLoadingMessage] = React.useState('');

  React.useEffect(() => {
    if (isLoading) {
      const loadingStages = ['.', '..', '...'];
      let currentStage = 0;
      const interval = setInterval(() => {
        setLoadingMessage(loadingStages[currentStage]);
        currentStage = (currentStage + 1) % loadingStages.length;
      }, 500); // 500 밀리초마다 업데이트

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // 메시지 전송 처리 함수
  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { sessionId: sessionId, text: message, sender: 'user' };
      setChatLog((prev) => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true); // 로딩 시작
      try {
        const response = await axios.post(apiEndpoint, { message, sessionId });
        const systemMessage = {
          sessionId: sessionId,
          sender: 'system',
          text: response.data.message,
          json: response.data
        };
        setChatLog((prev) => [...prev, systemMessage]);
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }
  };

  // 메시지 선택 처리 함수
  const handleSelectMessage = (index) => {
    const selectedMessage = chatLog[index];
    if (selectedMessage.sender === 'system') {
      setSelectedResponse(selectedMessage.json);
    } else {
      setSelectedResponse(null);
    }
  };

  // 초기화 버튼 클릭 처리 함수
  const handleReset = () => {
    setChatLog([]);
    setSelectedResponse(null);
    setSessionId(uuidv4()); // 새로운 sessionId 생성
    setMessage(''); // 메시지 입력란 초기화
  };

  // JSON 뷰어 표시 상태 토글 함수
  const toggleJsonView = () => {
    setShowJsonView((prev) => !prev);
  };

  return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4, position: 'relative', textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            CSO Engine demo
          </Typography>
          <IconButton
              color="secondary"
              onClick={handleReset}
              sx={{
                position: 'absolute',
                right: '45px', // 오른쪽 오프셋 설정
                top: '50%',
                transform: 'translateY(-50%)' }}
          >
            <Refresh />
          </IconButton>
          <IconButton
              color="primary"
              onClick={toggleJsonView}
              sx={{
                position: 'absolute',
                right: '0', // 오른쪽 오프셋 설정
                top: '50%',
                transform: 'translateY(-50%)'
              }}
          >
            <Code />
          </IconButton>
        </Box>
        <Grid container spacing={2} sx={{ mt: 2, justifyContent: showJsonView ? 'flex-start' : 'center' }}>
          <Grid item xs={6}>
            <ChatBox
                chatLog={chatLog}
                onSelectMessage={handleSelectMessage}
                isLoading={isLoading} // 로딩 상태 전달
                loadingMessage={loadingMessage} // 로딩 메시지 전달
            />
            <ChatInput message={message} setMessage={setMessage} handleSend={handleSend} />
          </Grid>
          {showJsonView && ( // JSON 뷰어 표시 상태에 따라 렌더링
              <Grid item xs={6}>
                <Paper sx={{ p: 2, minHeight: '400px', overflowY: 'auto' }}>
                  {selectedResponse ? (
                      <JsonView data={selectedResponse} shouldExpandNode={allExpanded} style={defaultStyles} />
                  ) : (
                      <Typography variant="body2" color="textSecondary">
                        시스템 메시지를 클릭하면 해당 응답이 여기에 표시됩니다.
                      </Typography>
                  )}
                </Paper>
              </Grid>
          )}
        </Grid>
      </Container>
  );
}