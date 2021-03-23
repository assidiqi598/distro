import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props; // this.props is automatically initialized?

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });


      }

      setCurrentUser(userAuth);

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin'
            render={() => this.props.currentUser ?
              <Redirect to='/' /> :
              <SignInAndSignUpPage />}
          />
        </Switch>
      </div>
    )
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

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


