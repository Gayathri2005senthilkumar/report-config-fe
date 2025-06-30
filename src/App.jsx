import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Your nested routes go here */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
