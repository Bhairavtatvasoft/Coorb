import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WorkflowFormPage from "./pages/WorkflowFormPage";
import Workflow from "./pages/Workflow";
import "./translation/i18n";
import Layout from "./components/Layout/layout";

import "react-datepicker/dist/react-datepicker.css";
import "./translation/i18n";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Workflow />} />
            <Route path="/workflow-form" element={<WorkflowFormPage />} />
            <Route path="*" element={<>Page Not Found</>} />
          </Routes>
        </Layout>
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
