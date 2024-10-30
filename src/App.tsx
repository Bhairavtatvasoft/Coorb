import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WorkflowFormPage from "./pages/WorkflowFormPage";
import Workflow from "./pages/Workflow";
import "./translation/i18n";
import Layout from "./components/Layout/layout";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme.tsx";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import "react-datepicker/dist/react-datepicker.css";
import "./translation/i18n";
import "./App.css";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: i18n.language === "ar" ? [prefixer, rtlPlugin] : [prefixer],
  });

  return (
    <>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Workflow />} />
                <Route path="/workflow-form/:taskInstanceId?/:tokenId?" element={<WorkflowFormPage />} />
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
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default App;
