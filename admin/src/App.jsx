import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import HashLoader from 'react-spinners/HashLoader'
import {useSelector} from 'react-redux'
import './app.scss'
import { useEffect } from "react";
const App = () => {
  const routing = useRoutes(Themeroutes);
  const {isShowOverlay} =  useSelector(state => state.app); 
  return <div className="dark" id="app">
       {
        isShowOverlay === true && (
          <div className='overlay'>       
            <HashLoader color="#36d7b7" />
          </div>
        )
      }
      {routing}
    
    </div>;
};

export default App;
