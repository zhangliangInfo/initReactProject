import React, { useEffect, useState } from "react"
import './index.css'
import './App.less'

const App = () => {
  const [renderCount, setRenderCount] = useState(0)
  useEffect(() => {
    // setRenderCount(renderCount + 1)
    
  }, [])
  return <div className="App">
    <p>App Render Count: {renderCount}</p>
    <button onClick={() => setRenderCount(renderCount + 1)}>Increment</button>
  </div>
}

export default App
