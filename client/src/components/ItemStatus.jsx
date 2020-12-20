import {
  Box
} from 'grommet';
import { payStatus, logisStatus, trackingStatus } from '../masterdata'

const TrackingStatus = ({ status }) => {
  return <Box size="small" style={{ backgroundColor: trackingStatus[status] ? trackingStatus[status].color : 'grey', color: 'white', borderRadius: 6 }} pad={{ horizontal: "small", vertical: 'xxsmall' }}>{status || "-"}</Box>
}
const PayStatus = ({ status }) => {
  return <Box size="small" style={{ backgroundColor: payStatus[status] ? payStatus[status].color : 'grey', color: 'white', borderRadius: 6 }} pad={{ horizontal: "small", vertical: 'xxsmall' }}>{status || "-"}</Box>
}
const LogisStatus = ({ status }) => {
  return <Box size="small" style={{ backgroundColor: logisStatus[status] ? logisStatus[status].color : 'grey', color: 'white', borderRadius: 6 }} pad={{ horizontal: "small", vertical: 'xxsmall' }}>{status || "-"}</Box>
}
export {
  TrackingStatus,
  PayStatus,
  LogisStatus
}