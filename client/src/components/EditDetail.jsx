import { useState } from 'react'
import { Box, Text, TextArea, TextInput } from 'grommet'
import styled from 'styled-components'
import { color, payStatus, trackingStatus, variable } from '../masterdata'
import { Loader } from './Loader'
import { Checkmark } from 'grommet-icons'
const PayStatusFilter = styled(Box)`
  border-radius: 6px; 
  ${props => props.name === props.payFilter ?
    `background-color : ${color.activate}; color : ${color.fontActivate}; `
    :
    `border : 1px solid ${color.activate}; color :${color.fontColor};`}
  `

const EditDetail = ({ address, cost, setCost, paymethod, trackingNo, trackmethod, setPaymethod, settrackmethod, setAddress, settrackingNo, errorMsg, submitEditDetail }) => {

  return (
    <div style={{ height: 350, overflow: 'scroll' }}>
      <Box pad={{ horizontal: 'medium' }} animation={['fadeIn']}>
        <Box direction="row" gap="small" pad={{ vertical: 'small' }}>
          <Text size="small" color={color.subfont}>{`${variable.paymentStatus.label} : `} </Text>
          <PayStatusFilter payFilter={paymethod} name={payStatus["มัดจำ"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => setPaymethod(payStatus["มัดจำ"].value)}><Text size="13px">{payStatus["มัดจำ"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={paymethod} name={payStatus["จ่ายเต็ม"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => setPaymethod(payStatus["จ่ายเต็ม"].value)}><Text size="13px">{payStatus["จ่ายเต็ม"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={paymethod} name={payStatus["ยังไม่จ่าย"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => setPaymethod(payStatus["ยังไม่จ่าย"].value)}><Text size="13px">{payStatus["ยังไม่จ่าย"].value}</Text></PayStatusFilter>
        </Box>
        <hr style={{ width: '80%' }}></hr>
        <Box direction="row" gap="small" pad={{ vertical: 'small' }}>
          <Text size="small" color={color.subfont}>{`${variable.productStatus.label}  : `} </Text>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["รอกด"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["รอกด"].value)}><Text size="13px">{trackingStatus["รอกด"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["กดแล้ว"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["กดแล้ว"].value)}><Text size="13px">{trackingStatus["กดแล้ว"].value}  </Text></PayStatusFilter>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["ส่งแล้ว"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["ส่งแล้ว"].value)}><Text size="13px">{trackingStatus["ส่งแล้ว"].value} </Text></PayStatusFilter>
        </Box>
        <Box direction="row" gap="small" pad={{ vertical: 'small' }}>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["รับของแล้ว"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["รับของแล้ว"].value)}><Text size="13px">{trackingStatus["รับของแล้ว"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["รอส่ง"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["รอส่ง"].value)}><Text size="13px">{trackingStatus["รอส่ง"].value} </Text></PayStatusFilter>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["ของถึงบ้านเกา"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["ของถึงบ้านเกา"].value)}><Text size="13px">{trackingStatus["ของถึงบ้านเกา"].value} </Text></PayStatusFilter>
        </Box>
        <Box direction="row" gap="small" pad={{ vertical: 'small' }}>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["กดแล้ว+รอของถึงบ้านเกา"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["กดแล้ว+รอของถึงบ้านเกา"].value)}><Text size="13px">{trackingStatus["กดแล้ว+รอของถึงบ้านเกา"].value} </Text></PayStatusFilter>
          <PayStatusFilter payFilter={trackmethod} name={trackingStatus["ส่งแล้ว+รอของถึงบ้านเกา"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => settrackmethod(trackingStatus["ส่งแล้ว+รอของถึงบ้านเกา"].value)}><Text size="13px">{trackingStatus["ส่งแล้ว+รอของถึงบ้านเกา"].value} </Text></PayStatusFilter>
        </Box>
        <hr style={{ width: '80%' }}></hr>
        <Box pad={{ vertical: 'small' }} direction="row">
          <Box style={{ width: '50px' }}>
            <Text size="small" color={color.subfont}>{`${variable.address.label}  : `} </Text>
          </Box>
          <TextArea
            placeholder={variable.address.placeholder}
            resize={false}
            value={address}
            size="xsmall"
            onChange={event => setAddress(event.target.value)}
            style={{ color: color.subfont, height: '85px', padding: '5px 5px' }}
          />
        </Box>
        <hr style={{ width: '80%' }}></hr>
        <Box direction="row" gap="small" pad={{ vertical: 'small' }}>
          <Box style={{ width: '140px' }}>
            <Text size="small" color={color.subfont}>{`${variable.trackingNo.label}  : `} </Text>
          </Box>
          <TextInput
            placeholder={variable.trackingNo.placeholder}
            value={trackingNo}
            onChange={event => settrackingNo(event.target.value)}
            style={{ color: color.subfont, padding: '5px 5px' }}
            size="small"
          />
        </Box>
        <Box direction="row" gap="small" pad={{ vertical: 'small' }}>
          <Box style={{ width: '140px' }}>
            <Text size="small" color={color.subfont}>{`${variable.cost.label}  : `} </Text>
          </Box>
          <TextInput
            placeholder={variable.cost.placeholder}
            value={cost}
            onChange={event => setCost(event.target.value)}
            style={{ color: color.subfont, padding: '5px 5px' }}
            size="small"
          />
        </Box>
      </Box>
    </div>
  )
}

export default EditDetail