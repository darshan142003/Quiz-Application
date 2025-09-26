import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
