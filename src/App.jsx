import React from 'react'
import CodeComplexityAnalyzer from './component/CodeComplexityAnalyzer'
import Navbar from './component/navbar'
import CodeTime from './component/CodeTime'
import Foot from './component/Foot'

const App = () => {
  return (
    <div>
        
          <Navbar/>
          <CodeTime/>
          <Foot/>
        
    </div>

    // <CodeComplexityAnalyzer/>
    // <CodeTime/>
  )
}

export default App
