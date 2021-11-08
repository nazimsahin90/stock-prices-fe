import React, {useContext} from "react";

import Search from "./components/controllers/Search";
import Chart from "./components/controllers/ChartContainer";
import classes from './App.module.css';
import HttpContext from './shared/http-context';
import LoadingSpinner from './components/view/LoadingSpinner';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { isLoading } = useContext(HttpContext);

  return (
    <>
      <div className={isLoading ? classes.disableHack : ""}>
        <Search />
        <Chart />
      </div>
      {isLoading && <LoadingSpinner />}
    </>
  );
}

export default App;
