import { useState } from 'react';
import axios from 'axios';
import { OpenAI } from 'openai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CodeComplexityApp: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [code, setCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');


  const analyzeCodeComplexity = async () => {
    if (!apiKey || !code) {
        toast.error('Please enter an API key and code to analyze.');
        return;
      }
  
      try {
        const openai = new OpenAI({
          apiKey: apiKey,
        });
  
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You will be provided with Python code, and your task is to calculate its time complexity." },
            { role: "user", content: code },
          ],
          temperature: 0,
          max_tokens: 256,
        });
  
        if (response.choices && response.choices.length > 0) {
          setAnalysisResult(response.choices[0].text);
        } else {
          toast.error('Analysis result not found.');
        }
      } catch (error) {
        toast.error('Error analyzing code. Please check your API key and code.');
      }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Code Complexity Analyzer</h1>
      <input
        type="text"
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <textarea
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border rounded w-full py-40 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
      />
      <button
        onClick={analyzeCodeComplexity}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Analyze Code
      </button>
      {analysisResult && <div className="mt-4">Analysis Result: {analysisResult}</div>}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnHover />
    </div>
  );
};

export default CodeComplexityApp;
