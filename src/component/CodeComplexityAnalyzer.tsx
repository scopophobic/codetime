// CodeComplexityAnalyzer.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CodeComplexityAnalyzer = () => {
  const [code, setCode] = useState('');
  const [complexityResult, setComplexityResult] = useState('');
  const [loading, setLoading] = useState(false);

  const analyzeCodeComplexity = async () => {
    setLoading(true);

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual code complexity analysis API endpoint
      const response = await axios.post('YOUR_API_ENDPOINT', { code });

      // Assuming the API response has a 'result' field
      setComplexityResult(response.data.result);
    } catch (error) {
      console.error('Error analyzing code:', error);
      setComplexityResult('Error analyzing code. Please try again.');
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

      {complexityResult && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Analysis Result:</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="whitespace-pre-line">{complexityResult}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeComplexityAnalyzer;
