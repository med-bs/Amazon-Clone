import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import "./App.css";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe("pk_test_51KeQYcIlPEqhutrS3vZUUKloMWISY0DVYMIeEl691vQe6BM0xjcox8EHBd9i5I7MqVl7p82PxXr4MfNMKykfVy6i00JQQX5kjr");

function App() {
  const [{},dispatch] = useStateValue();
  useEffect(()=>{
    //run une seul foi au load du page
    auth.onAuthStateChanged(authUser =>{
      //console.log('the uers <<<',authUser)
      if(authUser){
        // user
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else{
        // no user
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/checkout" element={<><Header /><Checkout /></>} />
          <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
          <Route path="/" element={<><Header /><Home /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
