import { AddCircle, Analytics, List, Notes } from 'grommet-icons';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const FooterItem = styled.div`
  flex : 1;
  height: 70px ;
  display: flex  ;
  justify-content: center; 
  padding-top : 15px;
  ${props => props.path === props.location ? 'background-color : #394551;' : 'background-color : none;'}
`
const Footer = (props) => {
  return (
    <div style={{
      backgroundColor: '#15202b', height: 70, width: '100%', position: 'fixed', bottom: 0, left: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', borderTop: '1px solid lightgrey'
    }}>
      <FooterItem path="/" location={props.location.pathname} onClick={() => props.history.push("/")}  >
        <List color="white" />
      </FooterItem>
      <FooterItem path="/add" location={props.location.pathname} onClick={() => props.history.push("/add")} >
        <AddCircle color="white" />
      </FooterItem>
      <FooterItem path="/analyze" location={props.location.pathname} onClick={() => props.history.push("/analyze")} >
        <Analytics color="white" />
      </FooterItem>
      <FooterItem path="/twitter" location={props.location.pathname} onClick={() => window.location.href = "https://docs.google.com/spreadsheets/d/1r1jCInlqAQqOrJ1sPUmslu1MT4KuQHB06Y1X93eB2a4/edit#gid=395009118"}>
        <Notes color="white" path="/list" />
      </FooterItem>

    </div>
  )
}

export default withRouter(Footer)