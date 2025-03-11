import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

const [loder,setloder] = useState(false)

  const [ review, setReview ] = useState(``)

 

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setloder(true)
    const response = await axios.post('https://ai-code-reviewer-plum.vercel.app/ai/get-review', { code })
    setReview(response.data)
    setloder(false)
  }

  return (
    <>
       <h3 className="mobile-heading">Get AI Code Feedback </h3>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        {/* <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div> */}
        <div className="right">
          {loder ? (
            <div className="loader">Loading...</div> // Loader shown while fetching data
          ) : (
            <Markdown rehypePlugins={[ rehypeHighlight ]}>
              {review}
            </Markdown>
          )}
        </div>
      </main>
    </>
  )
}



export default App
