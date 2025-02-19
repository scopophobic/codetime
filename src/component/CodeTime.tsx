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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Code Time Complexity Analyzer
        </h1>
        <div className="backdrop-blur-sm bg-white/80 rounded-2xl shadow-2xl p-8 border border-gray-200">
          <div className="mb-6">
            <textarea
              name="code"
              id="code"
              placeholder="Paste your code here..."
              className="w-full h-64 border-2 border-indigo-200 rounded-xl p-4 text-lg font-mono 
                         focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200
                         transition-all duration-300 ease-in-out
                         bg-white/50 backdrop-blur-sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button
            onClick={handleRun}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold 
                     py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700
                     transform hover:scale-[1.02] transition-all duration-200 ease-in-out
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                Analyzing...
              </div>
            ) : 'Analyze Complexity'}
          </button>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 font-semibold mb-2">Error Occurred:</p>
              <p className="text-red-500">{error}</p>
            </div>
          )}
          
          {response && (
            <div className="mt-6 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
              <p className="text-indigo-800 font-semibold mb-3">Analysis Result:</p>
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 bg-white/50 p-4 rounded-lg">
                {response}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeTime;
