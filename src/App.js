import "normalize.css";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import Test1 from "./components/test/test1";

const App = () => {
  console.log(process.env.REACT_APP_TEST);
  return (
    <BrowserRouter>
      <Link to="/">GotoMain</Link>
      <br />
      <Routes>
        <Route exact path="/" element={Test1} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
