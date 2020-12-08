
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ListComponent from './containers/List'
import Add from './containers/Add'
import Analzye from './containers/Analyze'
import { Grommet } from 'grommet';
import "./styles.css";
import Footer from './components/Footer'
import Header from './components/Header'
const theme = {
  global: {
    themeMode: 'dark',
    colors: {
      focus: '#1f2342' // added focus color
    },
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
        <Header />
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