"use client"

import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Jobs from "./pages/Jobs";
import PostJobs from "./pages/PostJobs";
import Blogs from "./pages/Blogs";
import Projects from "./pages/Projects";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/profile";
import TokenPurchase from "./pages/Purchase";
import WriteBlog from "./pages/WriteBlog";
import CreateResume from "./pages/CreateResume";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
    <Toaster/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/postjobs" element={<PostJobs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/purchase" element={<TokenPurchase />} />
        <Route path="/write" element={<WriteBlog />} />
        <Route path="/create/resume" element={<CreateResume />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;