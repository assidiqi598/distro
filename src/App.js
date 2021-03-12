import { Switch, Route} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shoppage.component';

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

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={ShopPage} />
      </Switch>
    </div>
  )
}

export default App;
