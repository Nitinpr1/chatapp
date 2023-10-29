import Room from "./components/Room";
import Header from "./components/Header";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Authprovider } from "./utils/AuthContext";
import SignUp from "./components/SignUp";

function App() {
  return (
    <main>
      <Router>
        <section className="pb-[110px]">
          <Header />
        </section>
        <Authprovider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Room />} />
            </Route>
          </Routes>
        </Authprovider>
      </Router>
    </main>
  );
}

export default App;
