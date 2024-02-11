// CodeComplexityAnalyzer.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { AxiosError } from 'axios';

const CodeComplexityAnalyzer = () => {
  const [code, setCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [loading, setLoading] = useState(false);
  const env = import.meta as any;

  const analyzeCodeComplexity = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/gpt-4/completions',
        {
          prompt: `
          Analyzing the time complexity of the following code:

          \`\`\`python
          ${code}
          \`\`\`
        `,
          temperature: 0,
          max_tokens: 1024,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      setAnalysisResult(response.data.choices[0].text);
    } catch (error) {
      console.error('Error analyzing code:', error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error('Error response:', axiosError.response);
      }
      setAnalysisResult('Error analyzing code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Code Complexity Analyzer</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Enter Your Code:</label>
        <textarea
          className="w-full h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-700"
        onClick={analyzeCodeComplexity}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Code'}
      </button>

      {loading && <p className="mt-2">Analyzing, please wait...</p>}

      {analysisResult && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Analysis Result:</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="whitespace-pre-line">{analysisResult}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeComplexityAnalyzer;
