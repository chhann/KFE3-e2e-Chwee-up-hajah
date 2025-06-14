const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function generateComponent(name, description) {
  const prompt = `
너는 React/Next.js + TypeScript + Tailwind CSS + Zustand + Supabase를 쓰는 프론트엔드 개발자야.
아래 조건에 맞는 컴포넌트 코드를 만들어줘.

- 컴포넌트 이름: ${name}
- TypeScript interface로 props 정의
- Tailwind CSS 스타일 적용
- default export
- apps/web/AI/${name}.tsx 파일에 들어갈 코드
- 필요하면 Zustand, Supabase 예시도 포함

설명: ${description}
`;

  const response = await axios.post('http://localhost:11434/api/generate', {
    model: 'llama3',
    prompt,
    stream: false
  });

  const filePath = path.join(__dirname, 'apps', 'web', 'AI', `${name}.tsx`);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, response.data.response, 'utf-8');
  console.log(`✅ ${filePath} 생성 완료!`);
}

// 사용 예시: node generate-component-ollama.js Vibe "로그인, 회원가입 기능 포함, 설명 없이 코드만"
const [,, name, ...descArr] = process.argv;
const description = descArr.join(' ') || '';
if (!name) {
  console.log('사용법: node generate-component-ollama.js 컴포넌트이름 "설명"');
  process.exit(1);
}
generateComponent(name, description); 