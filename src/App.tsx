import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkflowFormPage from "./pages/WorkflowFormPage";
import Workflow from "./pages/Workflow";
import "./translation/i18n";
import Header from "./components/header/Header";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Workflow />} />
          <Route path="/workflow-form" element={<WorkflowFormPage />} />

          {/* Catch-all route for 404 page */}
          <Route path="*" element={<>Page Not Found</>} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
