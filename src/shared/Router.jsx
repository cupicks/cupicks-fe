import { Route, Routes, BrowserRouter } from "react-router-dom";
import Recipe from "../pages/Recipe";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
