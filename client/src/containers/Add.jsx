import { useState } from 'react'
import { Box, Form, FormField, TextInput, TextArea, Text } from 'grommet';
import styled from 'styled-components'
import Select from 'react-select'
import { Checkmark, ClearOption } from 'grommet-icons';
import { color, variable, logisStatus, payStatus } from '../masterdata'
import AddListService from '../services/addList'
import { Loader } from '../components/Loader'
const PayStatusFilter = styled(Box)`
  border-radius: 6px; 
  ${props => props.name === props.payFilter ?
    `background-color : ${color.activate}; color : ${color.fontActivate}; `
    :
    `border : 1px solid ${color.activate}; color :${color.fontColor};`}
  `

const StyledField = styled(TextInput)`
  ::placeholder{
    color : ${color.placeholder};
  }
 `
const StyledArea = styled(TextArea)`
 ::placeholder{
   color :${color.placeholder};
 }
`
const Add = () => {
  const [twitter, setTwitter] = useState('')
  const [productInput, setproductInput] = useState('')
  const [logist, setLogist] = useState('ลทบ.')
  const [paystatus, setPaystatus] = useState('จ่ายเต็ม')
  const [price, setPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [deliveryCostPay, setdeliveryCostPay] = useState('')
  const [salePrice, setsalePrice] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cost, setCost] = useState('')

  const onClear = () => {
    setTwitter('')
    setproductInput('')
    setLogist('ลทบ.')
    setPaystatus('จ่ายเต็ม')
    setPrice('')
    setAmount('')
    setdeliveryCostPay('')
    setsalePrice('')
    setAddress('')
    setNote('')
    setLoading('')
    setError('')
    setCost('')
  }

  const onSubmit = async () => {
    setLoading(true)
    if (twitter === '' || productInput === '' || amount === '' || price === '' || salePrice === '' || deliveryCostPay === '' || cost === '') {
      setError('Please fill the form')
      setLoading(false)
    } else {
      setError('')
      const data = {
        "@Twitter": twitter,
        "รายการ": productInput,
        "จำนวน": amount,
        "การจัดส่ง": logist,
        "สถานะการจ่ายเงิน": paystatus,
        "ยอดที่โอน": price,
        "Note": note === '' ? '-' : note,
        "ที่อยู่": address === '' ? '-' : address,
        "ราคาขาย": salePrice,
        "ค่าส่งที่เก็บ": deliveryCostPay,
        "สถานะสินค้า": 'รอกด',
        "Tracking no.": '-',
        "ต้นทุน": cost
      }
      const res = await AddListService(data)
      if (res) {
        onClear()
        setLoading(false)
      } else {
        setError('Something Wrong , Please Try again')
        setLoading(false)
      }

    }
  }
  return (
    <>
      <Box pad={{ horizontal: "large", vertical: "medium" }} justify="between" direction="row">
        <ClearOption color={loading ? null : 'white'} onClick={() => loading ? null : onClear()} />
        <Checkmark color={loading ? null : 'white'} onClick={() => loading ? null : onSubmit()} />
      </Box>
      {loading ? <div style={{ marginTop: '20vh' }}><center><Loader /></center></div> :
        <>
          <Box pad={{ horizontal: "medium", vertical: "small" }} justify="center" direction="row">
            <Text color={"red"} size="small">{error}</Text>
          </Box>
          <Box pad={{ horizontal: "medium", vertical: "small" }} gap="medium" >
            <Text color={color.fontColor} size="small">{variable.product.label}&nbsp;*</Text>
            <StyledField name="value" placeholder={variable.product.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={productInput} onChange={(e) => setproductInput(e.target.value)} />
          </Box>
          <Box pad={{ horizontal: "medium", vertical: "small" }} gap="medium" >
            <Text color={color.fontColor} size="small">{variable.twitter.label}&nbsp;*</Text>
            <StyledField name="value" placeholder={variable.twitter.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={twitter} onChange={(e) => setTwitter(e.target.value)} />
          </Box>
          <Box pad={{ horizontal: "medium", vertical: "small" }} gap="large" direction="row">
            <Box gap="small" direction="column">
              <Text color={color.fontColor} size="small">{variable.logist.label}</Text>
              <Box direction="row" gap="small">
                <PayStatusFilter payFilter={logist} name={logisStatus["ลทบ."].value} size="small" pad={{ horizontal: "small", vertical: 'xxsmall' }}
                  onClick={() => setLogist(logisStatus["ลทบ."].value)}>
                  <Text size="13px">{logisStatus["ลทบ."].value} </Text>
                </PayStatusFilter>
                <PayStatusFilter payFilter={logist} name={logisStatus["EMS"].value} size="small" pad={{ horizontal: "small", vertical: 'xxsmall' }}
                  onClick={() => setLogist(logisStatus["EMS"].value)}>
                  <Text size="13px">{logisStatus["EMS"].value} </Text>
                </PayStatusFilter>
                <PayStatusFilter payFilter={logist} name={logisStatus["นัดรับ"].value} size="small" pad={{ horizontal: "small", vertical: 'xxsmall' }}
                  onClick={() => setLogist(logisStatus["นัดรับ"].value)}>
                  <Text size="13px">{logisStatus["นัดรับ"].value} </Text>
                </PayStatusFilter>
              </Box>
            </Box>
            <Box gap="small" direction="column">
              <Text color={color.fontColor} size="small">{variable.paymentStatus.label}</Text>
              <Box direction="row" gap="small">
                <PayStatusFilter payFilter={paystatus} name={payStatus["จ่ายเต็ม"].value} size="small" pad={{ horizontal: "small", vertical: 'xxsmall' }}
                  onClick={() => setPaystatus(payStatus["จ่ายเต็ม"].value)}>
                  <Text size="13px">{payStatus["จ่ายเต็ม"].value} </Text>
                </PayStatusFilter>
                <PayStatusFilter payFilter={paystatus} name={payStatus["มัดจำ"].value} size="small" pad={{ horizontal: "small", vertical: 'xxsmall' }}
                  onClick={() => setPaystatus(payStatus["มัดจำ"].value)}>
                  <Text size="13px">{payStatus["มัดจำ"].value} </Text>
                </PayStatusFilter>
                <PayStatusFilter payFilter={paystatus} name={payStatus["ยังไม่จ่าย"].value} size="small" pad={{ horizontal: "small", vertical: 'xxsmall' }}
                  onClick={() => setPaystatus(payStatus["ยังไม่จ่าย"].value)}>
                  <Text size="13px">{payStatus["ยังไม่จ่าย"].value} </Text>
                </PayStatusFilter>
              </Box>
            </Box>

          </Box>
          <Box pad={{ horizontal: "medium", vertical: "small" }} gap="medium" direction="row">
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.price.label}&nbsp;*</Text>
              <StyledField name="value" type="number" placeholder={variable.price.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={price} onChange={(e) => setPrice(e.target.value)} />
            </Box>
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.amount.label}&nbsp;*</Text>
              <StyledField name="value" type="number" placeholder={variable.amount.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Box>
          </Box>
          <Box pad={{ horizontal: "medium", vertical: "small" }} gap="medium" direction="row">
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.salePrice.label}&nbsp;*</Text>
              <StyledField name="value" type="number" placeholder={variable.salePrice.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={salePrice} onChange={(e) => setsalePrice(e.target.value)} />
            </Box>
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.cost.label}&nbsp;*</Text>
              <StyledField name="value" type="number" placeholder={variable.cost.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={cost} onChange={(e) => setCost(e.target.value)} />
            </Box>
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.deliveryCostPay.label}&nbsp;*</Text>
              <StyledField name="value" type="number" placeholder={variable.deliveryCostPay.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={deliveryCostPay} onChange={(e) => setdeliveryCostPay(e.target.value)} />
            </Box>
          </Box>
          {/* <Box pad={{ horizontal: "medium", vertical: "small" }} gap="medium" direction="row">
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.cost.label}&nbsp;*</Text>
              <TextInput name="value" type="number" placeholder={variable.cost.placeholder} style={{ color: color.subfont }} value={cost} onChange={(e) => setCost(e.target.value)} />
            </Box>
          </Box> */}
          <Box pad={{ horizontal: "medium", vertical: "small" }} gap="medium" direction="row">
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.address.label}</Text>
              <StyledArea name="value" placeholder={variable.address.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={address} onChange={(e) => setAddress(e.target.value)} />
            </Box>
            <Box direction="column" gap="small" >
              <Text color={color.fontColor} size="small">{variable.note.label}</Text>
              <StyledArea name="value" placeholder={variable.note.placeholder} style={{ color: color.subfont, border: '1px solid white' }} value={note} onChange={(e) => setNote(e.target.value)} />
            </Box>
          </Box>
        </>
      }
    </>
  )
}

export default Add