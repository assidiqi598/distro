import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => {console.log(this.state);});
        });
      } else {
        this.setState({ currentUser: userAuth })
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    )
  }

}

/* const HomePage = (props) => {
  console.log(props);
  return (
    <div>
      <Link to='/topics'>TOPICS</Link>
      <br/>
      <button onClick={() => props.history.push('/topics')}>To Topics</button>
      <h1>Home Page</h1>
    </div>
  )
}

const TopicsList = (props) => (
  <div>
    <h1>Topic List Page</h1>
    <Link to={`${props.match.url}/13`}>TO TOPICS 13</Link>
    <Link to={`${props.match.url}/115`}>TO TOPICS 115</Link>
    <Link to={`${props.match.url}/53`}>TO TOPICS 53</Link>
  </div>
)

const TopicDetail = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Topic Detail Page: {props.match.params.topicID}</h1>
    </div>
  )
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/topics' component={TopicsList} />
        <Route path='/topics/:topicID' component={TopicDetail} />
      </Switch>

    </div>
  );
} */

export default App;
