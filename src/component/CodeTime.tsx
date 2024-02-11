import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const CodeTime = () => {
  const [code, setCode] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch API key from environment variables or a secure storage mechanism
  const API_KEY = "";
  console.log(API_KEY);
  const genAI = new GoogleGenerativeAI(API_KEY);

  async function handleRun() {
    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = "Analyze the time complexity of this code: response should be like : first line mention the time complexity and then leave a line and explaination" + code;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();

      setResponse(responseText);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Code Time Complexity Analyzer</h1>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="mb-4">
          <textarea
            name="code"
            id="code"
            className="w-full border-2 border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:border-blue-400"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          onClick={handleRun}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Run Analysis'}
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            <p className="font-semibold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        {response && (
          <div className="mt-4">
            <p className="font-semibold">Response:</p>
            <pre className="w-full text-sm">{response}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeTime;
