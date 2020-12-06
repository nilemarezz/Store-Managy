import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Text,
  TextInput,
  Menu
} from 'grommet';
import { useEffect, useState } from 'react'
import Mock from '../mock.json'
import { TrackingStatus, PayStatus } from '../components/ItemStatus.jsx'
import { Loader } from '../components/Loader'
import styled from 'styled-components'

const PayStatusFilter = styled(Box)`
  border-radius: 6px; 
  ${props => props.name === props.payFilter ?
    `background-color : white; color : black; `
    :
    'border : 1px solid white; color : white;'}
 
`
const List = () => {
  const [lists, setList] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [searchFilter, setSearchFilter] = useState([])
  const [selectDate, setSelectDate] = useState('12_20');
  const [payFilter, setPayFilter] = useState('ทั้งหมด')
  const [orderFilter, setOrderFilter] = useState('ทั้งหมด')
  useEffect(() => {
    const sort = Mock.sort(function (a, b) {
      return b.id - a.id;
    });
    setList(sort)
  }, [])

  const onSearch = (value) => {
    setSearchText(value)
    if (payFilter === "ทั้งหมด") {
      const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(value.toLowerCase()) || item["@twitter"].toLowerCase().includes(value.toLowerCase()));
      setSearchFilter(nerList)
    } else {
      const newData = lists.filter(item => item.สถานะ === payFilter)
      const nerList = newData.filter(item => item.รายการ.toLowerCase().includes(value.toLowerCase()) || item["@twitter"].toLowerCase().includes(value.toLowerCase()));
      setSearchFilter(nerList)
    }

  }
  const onPayFilter = (value) => {
    setPayFilter(value)
    if (value === "ทั้งหมด") {
      if (searchText === '') {
        // กด ทั้งหมดโดยที่ไม่ search
        const newData = lists.filter(item => item.สถานะ === value)
        setSearchFilter(newData)
      } else {
        // กดทั้งหมดโดย search
        const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item["@twitter"].toLowerCase().includes(searchText.toLowerCase()));
        setSearchFilter(nerList)
      }
    } else {
      if (searchText === '') {
        // กดโดยไม่ serch
        const newData = lists.filter(item => item.สถานะ === value)
        console.log(newData)
        setSearchFilter(newData)
      } else {
        const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item["@twitter"].toLowerCase().includes(searchText.toLowerCase()));
        const newData = nerList.filter(item => item.สถานะ === value)
        setSearchFilter(newData)
      }
    }
  }
  const onOrderFilter = (value) => {
    setOrderFilter(value)
  }
  const getList = () => {
    if (searchText === '') {
      if (payFilter === 'ทั้งหมด') {
        return lists
      } else {
        return searchFilter
      }

    } else {
      if (searchFilter.length > 0) {
        console.log(searchFilter)
        return searchFilter
      } else {
        return false
      }
    }
  }
  if (lists.length > 0) {
    return (
      <>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: 120, height: 80 }}></div>
          <TextInput
            placeholder="สินค้า หรือ @Twitter"
            style={{ width: '94%', marginTop: 20, backgroundColor: 'white' }}
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Box gap="small" direction="column" >
          <Box gap="small" direction="row" justify="end" pad={{ horizontal: 'medium' }}>
            <PayStatusFilter payFilter={payFilter} name="ทั้งหมด" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('ทั้งหมด')}><Text size="xxsmall">ทั้งหมด</Text></PayStatusFilter>
            <PayStatusFilter payFilter={payFilter} name="มัดจำ" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('มัดจำ')}><Text size="xxsmall">มัดจำ</Text></PayStatusFilter>
            <PayStatusFilter payFilter={payFilter} name="จ่ายเต็ม" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('จ่ายเต็ม')}><Text size="xxsmall">จ่ายเต็ม</Text></PayStatusFilter>
            <PayStatusFilter payFilter={payFilter} name="ยังไม่จ่าย" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('ยังไม่จ่าย')}><Text size="xxsmall">ยังไม่จ่าย</Text></PayStatusFilter>
          </Box>

          <Box gap="small" direction="row" justify="end" pad={{ horizontal: 'medium' }}>
            <PayStatusFilter payFilter={orderFilter} name="ทั้งหมด" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ทั้งหมด')}><Text size="xxsmall">ทั้งหมด</Text></PayStatusFilter>
            <PayStatusFilter payFilter={orderFilter} name="รอกด" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('รอกด')}><Text size="xxsmall">รอกด</Text></PayStatusFilter>
            <PayStatusFilter payFilter={orderFilter} name="ของถึงไทยแล้ว" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ของถึงไทยแล้ว')}><Text size="xxsmall">ถึงไทยแล้ว</Text></PayStatusFilter>
            <PayStatusFilter payFilter={orderFilter} name="ส่งแล้ว(เกาหลี)" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ส่งแล้ว(เกาหลี)')}><Text size="xxsmall">ส่งแล้ว-เกา</Text></PayStatusFilter>
            <PayStatusFilter payFilter={orderFilter} name="ส่งแล้ว(ไทย)" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ส่งแล้ว(ไทย)')}><Text size="xxsmall">ส่งแล้ว-ไทย</Text></PayStatusFilter>
          </Box>
        </Box>
        <div div style={{ overflow: "scroll", height: 'calc(100vh - 150px)' }
        }>
          {
            getList() ? getList().map(item => {
              return <CardComponent item={item} key={item.id} />
            }) : <center style={{ marginTop: 100 }} ><Text size="large" color="white">Item Not Found</Text></center>
          }
        </div >
      </>
    )
  } else {
    return <center style={{ marginTop: '50%' }}><Loader /></center>
  }

}

const CardComponent = ({ item }) => {
  return (
    <Card background="light-1" margin={{ horizontal: "10px", vertical: "large" }}>
      <CardBody pad={{ horizontal: "small", vertical: "medium" }}><Text truncate={true}>{item["รายการ"]}</Text></CardBody>
      <CardFooter pad={{ horizontal: "medium", vertical: "10px" }} background="light-2">
        <Text size="small">{item["@twitter"]}</Text>
        <Box gap="small" direction="row">
          <TrackingStatus status={item["Tracking no."]} />
          <PayStatus status={item["สถานะ"]} />
        </Box>
      </CardFooter>
    </Card>
  )
}
export default List