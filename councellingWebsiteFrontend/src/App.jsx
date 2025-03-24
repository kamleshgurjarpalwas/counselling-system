import Layout from "./Layout/Layout.jsx";
import { CollegeProvider } from "./context/CollegeContext";
import "./App.css";

function App() {
  return (
    <>
      <CollegeProvider>
        <Layout />;
      </CollegeProvider>
    </>
  );
}

export default App;
