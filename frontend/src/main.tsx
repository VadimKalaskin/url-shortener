import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import "./App.css"
import { ToastContainer } from 'react-toastify';
import App from "./App.tsx";

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <App />
            <ToastContainer position={"top-center"} autoClose={2000}/>
        </StrictMode>,
    )
}