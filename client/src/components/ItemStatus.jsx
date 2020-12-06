import {
  Text,
  Box
} from 'grommet';

const getPayColor = (status) => {
  if (status === "จ่ายเต็ม") {
    return "#00C781"
  } else if (status === "มัดจำ") {
    return "#FFAA15"
  } else {
    return "#FF4040"
  }
}

const getTrackingColor = (status) => {
  if (status === "กดแล้ว") {
    return "#00739D"
  } else if (status === "รอกด") {
    return "#CCCCCC"
  } else if (status === "ของถึงไทยแล้ว") {
    return "#7D4CDB"
  } else if (status === "ส่งแล้ว(เกาหลี)") {
    return "#A2423D"
  } else if (status === "ส่งแล้ว(ไทย)") {
    return "#FD6FFF"
  } else {
    return "#00C781"
  }
}
const TrackingStatus = ({ status }) => {
  return <Box size="small" style={{ backgroundColor: getTrackingColor(status), color: 'white', borderRadius: 6 }} pad={{ horizontal: "small", vertical: 'xxsmall' }}>{status || "-"}</Box>
}
const PayStatus = ({ status }) => {
  return <Box size="small" style={{ backgroundColor: getPayColor(status), color: 'white', borderRadius: 6 }} pad={{ horizontal: "small", vertical: 'xxsmall' }}>{status || "-"}</Box>
}
export {
  TrackingStatus,
  PayStatus
}