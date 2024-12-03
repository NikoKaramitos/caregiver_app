import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import EditMember from "./routes/EditMember";
import Contract from "./routes/Contract";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/editmember" element={<EditMember />} />
        <Route path="/contract" element={<Contract />} />
      </Routes>
    </Router>
  );
}

// function App() {
//   return <p>Hello</p>;
// }
export default App;
