import Mock from './mock.json'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import List from './containers/List'
import Add from './containers/Add'
import Analzye from './containers/Analyze'
import { Grommet, Box } from 'grommet';
import styled from 'styled-components'
import { NavBar } from './containers/NavBar/NavBar'
import "./styles.css";
const Footer = styled.div`
  position : fixed;
  height : 8vh;
  width : 100%;
  background-color : red;
  bottom: 0;
  left : 0;
`
const theme = {
  global: {
    themeMode: 'dark',
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};
const App = () => {
  return (
    <Grommet theme={theme}>
      <Router>
        <NavBar />
        <Switch>
          <Route path="/add" strict>
            <Add />
          </Route>
          <Route path="/analyze" strict>
            <Analzye />
          </Route>
          <Route path="/" strict>
            <List />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  )
}

export default App