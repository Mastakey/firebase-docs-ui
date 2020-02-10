import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/nav/Navbar";
import Alerts from "./components/alerts/Alerts";

//Routes
import Home from "./routes/Home";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signup from "./routes/Signup";
    
//Mdoc
import mdocAll from "./routes/mdoc/mdocAll";
import mdocByTag from "./routes/mdoc/mdocByTag";
import mdocAllLimit from "./routes/mdoc/mdocAllLimit";
import mdocView from "./routes/mdoc/mdocView";
import mdocCreate from "./routes/mdoc/mdocCreate";
import mdocEdit from "./routes/mdoc/mdocEdit";

//Tag
import tagAll from "./routes/tag/tagAll";
import tagHome from "./routes/tag/tagHome";
import tagView from "./routes/tag/tagView";
import tagCreate from "./routes/tag/tagCreate";
import tagEdit from "./routes/tag/tagEdit";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTH } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

//Auth
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL = "https://us-central1-docs-4834c.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    //window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/mdoc" component={mdocAll} />
              <Route exact path="/mdoc/tag/:tag" component={mdocByTag} />
              <Route exact path="/mdoc/limit/:limit" component={mdocAllLimit} />
              <Route exact path="/mdoc/create" component={mdocCreate} />
              <Route exact path="/mdoc/:id" component={mdocView} />
              <Route exact path="/mdoc/edit/:id" component={mdocEdit} />
              <Route exact path="/tag" component={tagAll} />
              <Route exact path="/tag/create" component={tagCreate} />
              <Route exact path="/tag/:tag" component={mdocByTag} />
              <Route exact path="/tag/view/:id" component={tagView} />
              <Route exact path="/tag/edit/:id" component={tagEdit} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
