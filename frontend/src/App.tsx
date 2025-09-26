import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import AppBar from "./components/AppBar";


function App() {

  return (
    <>

      <BrowserRouter>
        <AppBar />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/quiz/:id" element={<Quiz />} />
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App
