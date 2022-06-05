import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home";
import store from "./store";
import { Provider } from "react-redux";
import Layout from "./Components/Layout";
import Country from "./Pages/Country";
import NotFound from "./Pages/NotFound";
import NoConnection from "./Pages/NoConnection";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Router>
          <div className={`App`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/region/:filter" element={<Home />} />
              <Route path="/region/404" element={<NotFound />} />
              <Route path="/region/" element={<NotFound />} />
              <Route path="/country/:name" element={<Country />} />
              <Route path="/country/404" element={<NotFound />} />
              <Route path="/country/" element={<NotFound />} />
              <Route path="/no-connection" element={<NoConnection />} />
            </Routes>
          </div>
        </Router>
      </Layout>
    </Provider>
  );
}

export default App;
