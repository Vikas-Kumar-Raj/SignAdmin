import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashbord";
import Users from "./pages/Users";
import Signatures from "./pages/Signatures";
import Transactions from "./pages/Transactions";
import Plans from "./pages/Plans";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/users" element={<Users />} />

        <Route path="/signatures" element={<Signatures />} />

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/plans" element={<Plans />} />

        <Route path="/settings" element={<Settings />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
