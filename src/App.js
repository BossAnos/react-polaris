import { AppProvider } from "@shopify/polaris";
import { BrowserRouter as Routes, Route, Router } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import { Dashboard, Product } from "./pages";
import "./App.css"

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/product" element={<Product />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
