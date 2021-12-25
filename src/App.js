import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch, Route  } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { News } from './components/News';
import UserPosts from './components/UserPosts';
import { auth } from './Firebase';
// import logo from './logo.svg';

function App() {

  const [user, loading] = useAuthState(auth)

  return (
    <div className='Content'>
      {
        loading ? <p>Loading...</p> :
        <>
        <Router>
        <NavBar user={user} />
            <Switch>
                <Route exact path='/'>
                    <Home user={user} />
                </Route>
                <Route exact path='/news'>
                    <News />
                </Route>
                <Route exact path='/yourPosts'>
                    <UserPosts />
                </Route>
                <Route exact path='/login'>
                    <Login user={user} />
                </Route>
            </Switch>
        </Router>
        <Footer />
        </>
      }
    </div>
  );
}

export default App;