import { Refresh, Twitter } from 'grommet-icons';
import { withRouter } from 'react-router-dom'
import { Box } from 'grommet';
const Header = (props) => {
  return (
    <Box pad={"medium"} style={{ height: 50 }} justify="between" direction="row">
      <Twitter color="#1da1f3" onClick={() => window.location.href = "https://twitter.com/"} />
      {props.location.pathname === "/add" ? null : <Refresh color="white" onClick={() => window.location.reload()} style={{}} />}
    </Box>
  )
}

export default withRouter(Header)