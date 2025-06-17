'use client';

import { useState } from 'react';

import { supabase } from '../../lib/supabase/supabase';

const SupabaseTestPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleInsert = async () => {
    const { data, error } = await supabase
      .from('Chwee-up-hajah')
      .insert([{ title: title, content: content }])
      .select();

    if (error) {
      setResult(`❌ Error: ${error.message}`);
    } else {
      setResult(`✅ Inserted: ${JSON.stringify(data)}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Supabase Insert Test</h2>
      <input
        type="text"
        className="border px-2 py-1 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해세요"
      />
      <input
        type="text"
        className="border px-2 py-1 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요"
      />
      <button onClick={handleInsert} className="ml-2 px-4 py-1 bg-blue-500 text-white rounded">
        Insert
      </button>
      {result && <div className="mt-4">{result}</div>}
    </div>
  );
};

export default SupabaseTestPage;
