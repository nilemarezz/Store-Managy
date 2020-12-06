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
import Select from 'react-select'
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
  const [payFilter, setPayFilter] = useState('ทั้งหมด')
  const [orderFilter, setOrderFilter] = useState('ทั้งหมด')
  const [placeholderDate, setPlaceHolderData] = useState('DEC 2020')
  useEffect(() => {
    const sort = Mock.sort(function (a, b) {
      return b.id - a.id;
    });
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    const date = new Date()
    setList(sort)
    setPlaceHolderData(`${monthNames[date.getMonth()]} ${date.getFullYear()}`)
  }, [])

  const onSelectSheet = (value) => {
    // fetch
    setSearchText('')
    setSearchFilter([])
    setPayFilter('ทั้งหมด')
    setOrderFilter('ทั้งหมด')
  }

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
        if (lists.length > 0) {
          return lists
        } else {
          return false
        }

      } else {
        return searchFilter
      }

    } else {
      if (searchFilter.length > 0) {
        return searchFilter
      } else {
        return false
      }
    }
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
        <div style={{ width: 300 }}>
          <TextInput
            placeholder="สินค้า หรือ @Twitter"
            style={{ backgroundColor: 'white' }}
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div style={{ width: 200, paddingLeft: 10 }}>
          <Select
            style={{ width: 100 }}
            placeholder={placeholderDate}
            onChange={(e) => onSelectSheet(e.value)}
            options={[
              { value: '10_20', label: 'OCT 2020' },
              { value: '11_20', label: 'NOV 2020' },
              { value: '12_20', label: 'DEC 2020' },
              { value: '01_21', label: 'JAN 2021' },
              { value: '02_21', label: 'FEB 2021' },
              { value: '03_21', label: 'MAR 2021' },
              { value: '04_21', label: 'APR 2021' },
              { value: '05_21', label: 'MAY 2021' },
              { value: '06_21', label: 'JUN 2021' },
              { value: '07_21', label: 'JUL 2021' },
            ]} />
        </div>
      </div>
      <Box direction="column" >
        <Box gap="small" direction="row" pad={{ horizontal: 'medium' }}>
          <PayStatusFilter payFilter={payFilter} name="ทั้งหมด" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('ทั้งหมด')}><Text size="xxsmall">ทั้งหมด</Text></PayStatusFilter>
          <PayStatusFilter payFilter={payFilter} name="มัดจำ" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('มัดจำ')}><Text size="xxsmall">มัดจำ</Text></PayStatusFilter>
          <PayStatusFilter payFilter={payFilter} name="จ่ายเต็ม" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('จ่ายเต็ม')}><Text size="xxsmall">จ่ายเต็ม</Text></PayStatusFilter>
          <PayStatusFilter payFilter={payFilter} name="ยังไม่จ่าย" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('ยังไม่จ่าย')}><Text size="xxsmall">ยังไม่จ่าย</Text></PayStatusFilter>
        </Box>
        {/* <Box style={{ width: 125 }} pad={{ horizontal: 'small' }} justify="end" >
            <Select
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' }
              ]} />
          </Box> */}
        <Box gap="small" direction="row" pad={{ horizontal: 'medium', vertical: 'small' }}>
          <PayStatusFilter payFilter={orderFilter} name="ทั้งหมด" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ทั้งหมด')}><Text size="xxsmall">ทั้งหมด</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name="รอกด" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('รอกด')}><Text size="xxsmall">รอกด</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name="ของถึงไทยแล้ว" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ของถึงไทยแล้ว')}><Text size="xxsmall">ถึงไทยแล้ว</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name="ส่งแล้ว(เกาหลี)" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ส่งแล้ว(เกาหลี)')}><Text size="xxsmall">ส่งแล้ว-เกา</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name="ส่งแล้ว(ไทย)" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('ส่งแล้ว(ไทย)')}><Text size="xxsmall">ส่งแล้ว-ไทย</Text></PayStatusFilter>
        </Box>
      </Box>
      <div div style={{ overflow: "scroll", height: 'calc(100vh - 200px)', marginTop: 10 }}>
        {
          getList() ? getList().map(item => {
            return <CardComponent item={item} key={item.id} />
          }) : <center style={{ marginTop: 100 }} ><Text size="large" color="white">Item Not Found</Text></center>
        }
      </div >
    </>
  )
}


const CardComponent = ({ item }) => {
  return (
    <Card background="light-1" margin={{ horizontal: "10px", vertical: "large" }} animation={['fadeIn']}>
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