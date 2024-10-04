export default function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    // 3초 지연 후 응답 // 테스트용
    // setTimeout(() => {
    //   res.status(200).json({
    //     ...req.body,
    //     message: `You said: ${message}`,
    //     originalMessage: message,
    //     timestamp: new Date().toISOString(),
    //   });
    // }, 3000); // 3000 밀리초 = 3초

    // 에코 응답
    res.status(200).json({ ...req.body,
      message: `You said: ${message}`,
      originalMessage: message,
      timestamp: new Date().toISOString(),
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}