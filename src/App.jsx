import Layout from "../src/common/Layout";
import RouteChangeTracker from "./shared/RouteChangeTracker";

const App = () => {
  RouteChangeTracker();

  return (
    <div className="App">
      <Layout />
    </div>
  );
};

export default App;
