# CSO Engine Demo

이 프로젝트는 데모 챗봇 애플리케이션입니다. 사용자가 입력한 메시지를 서버로 보내고, 서버로부터 응답을 받아서 화면에 표시합니다.

## 기능

- 사용자 메시지 입력 및 전송
- 서버 응답 메시지 수신 및 표시
- 서버 응답 JSON 데이터 조회
- 초기화 버튼을 통해 대화 기록 초기화 및 새로운 세션 시작

## 시작하기

### 필수 구성 요소

- Node.js (>=14)
- npm

### 설치

1. 리포지토리를 클론합니다:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. 필요한 패키지를 설치합니다:

   ```sh
   npm install
   ```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:

```env
REACT_APP_API_ENDPOINT=/api/echo
```

### 실행

### 개발 서버 실행

개발 모드에서 앱을 실행합니다:

```sh
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

### 빌드

프로덕션 모드로 애플리케이션을 빌드합니다:

```sh
npm run build
```

`build` 폴더에 빌드된 파일이 생성됩니다.

## 사용된 주요 라이브러리

- React: 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리
- axios: HTTP 요청을 보내기 위한 라이브러리
- @mui/material: UI 컴포넌트 라이브러리
- react-json-view-lite: JSON 데이터를 보기 좋게 렌더링해주는 라이브러리
- uuid: 유일한 식별자를 생성하기 위한 라이브러리

## 코드 설명

### 주요 컴포넌트

- `ChatBox`: 사용자와 시스템의 대화 내용을 보여주는 컴포넌트
- `ChatInput`: 사용자 메시지를 입력하고 전송할 수 있는 컴포넌트

### `Home` 컴포넌트

챗봇 애플리케이션의 메인 컴포넌트입니다. 이 컴포넌트는 상태 관리를 처리하고, 사용자 입력을 서버로 전송하고, 서버로부터의 응답을 화면에 표시합니다.

#### 상태 변수

- `message`: 사용자가 입력한 메시지
- `chatLog`: 대화 내용을 저장하는 배열
- `selectedResponse`: 선택된 시스템 응답 JSON 데이터
- `sessionId`: 각 세션을 구분하는 ID

#### 함수

- `handleSend`: 사용자가 메시지를 전송하면 호출되는 함수입니다. 서버에 메시지를 전송하고 응답을 받아서 화면에 표시합니다.
- `handleSelectMessage`: 특정 메시지를 선택하면 해당 메시지의 상세 JSON 데이터를 화면에 표시합니다.
- `handleReset`: 초기화 버튼을 클릭하면 대화 내용을 초기화하고 새로운 `sessionId`를 생성합니다.

## 기여

기여를 환영합니다! 코드를 포크하고 풀 리퀘스트를 보내주세요.

1. 프로젝트를 포크하세요
2. 새로운 브랜치를 만드세요 (`git checkout -b feature/AmazingFeature`)
3. 커밋하세요 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/AmazingFeature`)
5. 풀 리퀘스트를 여세요

## 라이선스

이 프로젝트는 MIT 라이선스로 라이선스가 부여되어 있습니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.