
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ListComponent from './containers/List'
import Add from './containers/Add'
import Analzye from './containers/Analyze'
import { Grommet, Box } from 'grommet';
import "./styles.css";
import Footer from './components/Footer'
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
        {/* <NavBar /> */}
        <Switch>
          <Route path="/add" strict>
            <Add />
          </Route>
          <Route path="/analyze" strict>
            <Analzye />
          </Route>
          <Route path="/" strict>
            <ListComponent />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Grommet >
  )
}

export default App