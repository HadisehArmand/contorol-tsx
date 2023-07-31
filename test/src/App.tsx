import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import Main from "./pages/Login";
import View from "./pages/View";
import Login from "./pages/Main";
import Add from "./pages/Add";
import Sigin from "./pages/Sign";
import Log from "./pages/Log";
import Edit from "./pages/Edit";

interface EditParams {
  id: string;
  [key: string]: string | undefined;
}
const EditComponent: React.FC = () => {
  const params = useParams<EditParams>();
  const { id } = params;

  // Handle the case when id is undefined or not a valid number
  const parsedId = id ? parseInt(id, 10) : undefined;
  const isValidId = !isNaN(parsedId as number);

  return isValidId ? <Edit id={parsedId as number} /> : <div>Invalid ID</div>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/view" element={<View />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<Add />} />
        <Route path="/log" element={<Log />} />
        <Route path="/sign" element={<Sigin />} />
        <Route path="/edit/:id" element={<EditComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
