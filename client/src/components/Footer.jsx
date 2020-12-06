import { Twitter, AddCircle, Analytics, List, Notes } from 'grommet-icons';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const FooterItem = styled.div`
  flex : 1;
  height: 50px ;
  display: flex  ;
  justify-content: center; 
  align-items: center; 
  ${props => props.path === props.location ? 'background-color : #957DAD;' : 'background-color : none;'}
`
const Footer = (props) => {
  return (
    <div style={{
      backgroundColor: '#D291BC', height: 50, width: '100%', position: 'fixed', bottom: 0, left: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
    }}>
      <FooterItem path="/list" location={props.location.pathname} onClick={() => props.history.push("/list")}  >
        <List color="white" />
      </FooterItem>
      <FooterItem path="/add" location={props.location.pathname} onClick={() => props.history.push("/add")} >
        <AddCircle color="white" />
      </FooterItem>
      <FooterItem path="/analyze" location={props.location.pathname} onClick={() => props.history.push("/analyze")} >
        <Analytics color="white" />
      </FooterItem>
      <FooterItem path="/twitter" location={props.location.pathname} >
        <Twitter color="white" path="/list" />
      </FooterItem>

    </div>
  )
}

export default withRouter(Footer)