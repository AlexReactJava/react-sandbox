import React, { Component, Suspense } from 'react';
import Home from './Home'
import { BrowserRouter as Router, Route, Redirect, NavLink } from 'react-router-dom'
import GMap from './gmap.jsx';
import Timer from './timer.jsx';
import CounterContainer from './CounterContainer.jsx';
import { Provider } from 'react-redux';
import store from './store/store'
import SimpleFunc from './simpleFunction.jsx'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box';

const Sheet = React.lazy(() => import('./sheet.jsx'))
const Firebase = React.lazy(() => import('./firebase.jsx'))
const Small = React.lazy(() => import('./small.jsx'))
const Weather = React.lazy(() => import('./wc.jsx'))
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});


class App extends Component {
    render() {
      const { history } = this.props

      return (
        <ThemeProvider theme={theme}>
          <Container maxWidth="sm">
          <Box sx={{ my: 8 }} lg={{my:12}}>
        <Provider store={store}>
        <div className="App">
          <Router>
            <li><NavLink to="/home">Home</NavLink></li>
            <li><NavLink to="/gmap">GMap</NavLink></li>
            <li><NavLink to="/timer">Timer</NavLink></li>
            <li><NavLink to="/sheet">Sheet</NavLink></li>
            <li><NavLink to="/counter">Counter</NavLink></li>
            <li><NavLink to="/counterRedux">CounterRedux</NavLink></li>
            <li><NavLink to="/simpleFunc">SimpleFunc</NavLink></li>
            <li><NavLink to="/firebase">Firebase</NavLink></li>
            <li><NavLink to="/small">Small</NavLink></li>
            <li><NavLink to="/wc">Weather</NavLink></li>
            <hr/> 
            <Redirect from='/' to='/home'/> 
            <Route history={history} path='/home' component={Home} />
            <Route history={history} path='/gmap' component={GMap} />
            <Route history={history} path='/timer' component={Timer} name="fromRoute" />
            <Suspense fallback={<div>Loading...</div>}>
               <Route history={history} path='/sheet' component={Sheet} />
               <Route history={history} path='/firebase' component={Firebase} />
               <Route history={history} path='/small' component={Small} />
               <Route history={history} path='/wc' component={Weather} />
            </Suspense>
            <Route history={history} path='/counterRedux' component={CounterContainer} />
            <Route history={history} path='/simpleFunc' component={SimpleFunc} />
          </Router>
          <CssBaseline />
          FOOTER
        </div>
        </Provider>
        </Box>
        </Container>
        </ThemeProvider>
      );
    }
  }

  export default App