import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import appStore from './utils/store';
import Connections from './components/Connections';
import ExploreProfile from './components/ExploreProfile';

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename='/'>
          <Routes>
            <Route path='/' element={<Body/>}>
              <Route path='/' element={<Feed/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/connections' element={<Connections/>}></Route>
              <Route path='/explore/profile/:id' element={<ExploreProfile/>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
