'use client';

import { useRef, useState } from 'react';

interface OllamaResponse {
  response: string;
  done: boolean;
}

interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}

//
interface OllamaModelsResponse {
  models: OllamaModel[];
}

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>(`// Tab 키를 눌러 코드 자동완성을 시도해보세요!
function fibonacci(n: number): number {
  if (n <= 1) return n;
  `);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('준비됨');
  const [apiUrl, setApiUrl] = useState<string>('http://localhost:11434');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>): Promise<void> => {
    if (e.key === 'Tab') {
      e.preventDefault();
      await handleTabCompletion();
    }
  };

  const handleTabCompletion = async (): Promise<void> => {
    if (isLoading || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const cursorPosition = textarea.selectionStart;
    const prefix = code.substring(0, cursorPosition);

    setIsLoading(true);
    setStatus('AI가 코드를 생성 중...');

    try {
      const response = await fetch(`${apiUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-coder:6.7b',
          prompt: `Complete this code. Only return the completion without any explanation or markdown formatting:

${prefix}`,
          stream: false,
          options: {
            temperature: 0.1,
            top_p: 0.9,
            max_tokens: 150,
            stop: ['\n\n', '```', 'Complete this', "Here's the completion"],
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      let completion = data.response.trim();

      // 응답 정리
      completion = completion.replace(/^```[\w]*\n?/, '').replace(/\n?```$/, '');

      // 첫 번째 의미있는 줄만 사용
      const lines = completion.split('\n');
      completion = lines.find((line) => line.trim().length > 0) || lines[0] || '';

      if (completion && completion.length > 0) {
        // 자동완성 텍스트 삽입
        const newCode =
          code.substring(0, cursorPosition) + completion + code.substring(cursorPosition);
        setCode(newCode);

        // 커서 위치 업데이트
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = textarea.selectionEnd = cursorPosition + completion.length;
            textarea.focus();
          }
        }, 0);

        const previewText =
          completion.length > 30 ? `${completion.substring(0, 30)}...` : completion;
        setStatus(`완성됨: "${previewText}"`);
      } else {
        setStatus('완성할 내용이 없습니다');
      }
    } catch (error) {
      console.error('자동완성 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      setStatus(`오류: ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus('준비됨'), 3000);
    }
  };

  const testConnection = async (): Promise<void> => {
    setIsLoading(true);
    setStatus('연결 테스트 중...');

    try {
      const response = await fetch(`${apiUrl}/api/tags`);
      if (response.ok) {
        const data: OllamaModelsResponse = await response.json();
        const hasDeepseek = data.models?.some((model: OllamaModel) =>
          model.name.includes('deepseek-coder')
        );
        setStatus(hasDeepseek ? '✅ deepseek-coder 연결됨' : '⚠️ deepseek-coder 모델이 없습니다');
      } else {
        setStatus('❌ 올라마 서버에 연결할 수 없습니다');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '연결 실패';
      setStatus(`❌ 연결 실패: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCode(e.target.value);
  };

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setApiUrl(e.target.value);
  };

  return (
    <div className="mx-auto w-full max-w-6xl rounded-lg bg-gray-900 p-4 text-white">
      <div className="mb-4">
        <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold">
          ⚡ AI 코드 자동완성 에디터
        </h1>

        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>⚙️</span>
            <input
              type="text"
              value={apiUrl}
              onChange={handleApiUrlChange}
              placeholder="올라마 서버 URL"
              className="rounded border border-gray-600 bg-gray-800 px-3 py-1 text-sm text-white"
            />
            <button
              onClick={testConnection}
              disabled={isLoading}
              className="rounded bg-blue-600 px-3 py-1 text-sm transition-colors hover:bg-blue-700 disabled:bg-gray-600"
              type="button"
            >
              연결 테스트
            </button>
          </div>

          <div className="flex items-center gap-2">
            {isLoading && <span className="animate-spin">🔄</span>}
            <span className="text-sm text-gray-300">{status}</span>
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-400">
          💡 <strong>사용법:</strong> 코드를 작성하다가{' '}
          <kbd className="rounded bg-gray-700 px-2 py-1 font-mono">Tab</kbd> 키를 누르면 AI가 코드를
          자동완성합니다.
          <br />
          🎯 <strong>모델:</strong> deepseek-coder:6.7b
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        className="h-96 w-full resize-none rounded border border-gray-700 bg-gray-800 p-4 font-mono text-sm text-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          fontFamily: 'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          tabSize: 2,
        }}
        spellCheck={false}
        placeholder="여기에 코드를 작성하고 Tab 키를 누르세요..."
      />

      <div className="mt-4 text-xs text-gray-500">
        <p className="mb-2">
          🔧 <strong>설치 방법:</strong>
        </p>
        <div className="rounded bg-gray-800 px-3 py-2 font-mono">
          <div>ollama serve</div>
          <div>ollama pull deepseek-coder:6.7b</div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
