import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { routesAuth } from "./routes/authRoutes";


function App() {
  const [isLogggedin, setLoggedin] = useState(false);
  const checkUser = useSelector((state: RootState) => state.authState.authState);

  useEffect(() => {
    if (Object.keys(checkUser).length > 0) {
      setLoggedin(true);
    }
    else {
      setLoggedin(false);
    }
  }, [checkUser])


  
  return (
    <BrowserRouter>
      <Routes>
        {
          isLogggedin ? (
            <Route path="/" element={<MainLayout />}>
              {routes}
            </Route>
          )
            : (
              <Route path="/">
                {routesAuth}
              </Route>
            )
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
