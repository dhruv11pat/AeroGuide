import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Schools }from "./pages/Schools";
import { SignIn } from "./pages/SignIn";
import Navbar from "./components/Navbar";
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/schools/:schoolId" element={<Schools />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </>
  );
}
