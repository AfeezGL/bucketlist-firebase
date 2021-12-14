import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import "./App.css";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    auth.onAuthStateChanged((userObject) => {
      if (mounted) {
        setUser(userObject);
        setLoaded(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // return a loading spinner if authentication state is not yet determined
  if (!loaded)
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );

  // return the login page if user is not authenticated
  if (loaded && !user) return <Login />;

  // return the normal ui when user is authenticated
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Tasks />
        </Route>
        <Route path="/add">
          <AddTask />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
