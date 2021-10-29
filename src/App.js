import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import "./App.css";
import Login from "./components/Login";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        let mounted = true;
        auth.onAuthStateChanged((userObject) => {
            if (mounted) {
                setUser(userObject);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    {user === null ? <Login /> : <Tasks />}
                </Route>
                <Route path="/add">
                    <AddTask />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
