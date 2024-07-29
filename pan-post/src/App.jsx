import Home from "./components/Home";
import ListOfUsers from "./components/ListOfUsers";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/List" element={<ListOfUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
