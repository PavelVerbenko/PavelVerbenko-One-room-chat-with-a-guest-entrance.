import Main from "./components/Main/main";
import Chat from "./components/Chat/chat";
import { Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Main/> }/>
                <Route path="/chat" element={ <Chat/> }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;