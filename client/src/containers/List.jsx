import {
  Card,
  CardBody,
  CardFooter,
  Box,
  Text,
  TextInput
} from 'grommet';
import { useEffect, useState, useRef } from 'react'
import Mock from '../mock.json'
import { TrackingStatus, PayStatus } from '../components/ItemStatus.jsx'
import { Loader } from '../components/Loader'
import styled from 'styled-components'
import Select from 'react-select'
import getListService from '../services/getlist'
import Header from '../components/Header'
import { getDateNow, getFullyDateNow } from '../utilities/getDate'
import { selectData, color, payStatus, trackingStatus, serchInput, Notfound, variable } from '../masterdata'
import ModalDetail from '../components/ModalDetail'
const PayStatusFilter = styled(Box)`
  border-radius: 6px; 
  ${props => props.name === props.payFilter ?
    `background-color : ${color.activate}; color : ${color.fontActivate}; `
    :
    `border : 1px solid ${color.activate}; color :${color.fontColor};`}
  `
const List = () => {
  const selectInputRef = useRef();
  const [lists, setList] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [searchFilter, setSearchFilter] = useState([])
  const [payFilter, setPayFilter] = useState('ทั้งหมด')
  const [orderFilter, setOrderFilter] = useState('ทั้งหมด')
  const [placeholderDate, setPlaceHolderData] = useState('DEC 2020')
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectList, setSelectList] = useState(null)
  const fetchList = async (date) => {
    setLoading(true)
    const data = await getListService(date)
    const sort = data.sort(function (a, b) {
      return b.id - a.id;
    })
    setList(sort)
    setLoading(false)
  }
  useEffect(async () => {
    setPlaceHolderData(getFullyDateNow())
    await fetchList(getDateNow())
  }, [])


  const onSelectSheet = async (value) => {
    await fetchList(value)
    setSearchText('')
    setSearchFilter([])
    setPayFilter('ทั้งหมด')
    setOrderFilter('ทั้งหมด')
  }

  const onSearch = (value) => {
    setSearchText(value)
    const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(value.toLowerCase()) || item[variable.twitter.value].toLowerCase().includes(value.toLowerCase()));
    if (payFilter === "ทั้งหมด" && orderFilter === "ทั้งหมด") {
      setSearchFilter(nerList)
    } else {
      if (payFilter === "ทั้งหมด" && orderFilter !== "ทั้งหมด") {
        const newData = nerList.filter(item => item[variable.productStatus.value].includes(orderFilter))
        setSearchFilter(newData)
      } else if (payFilter !== "ทั้งหมด" && orderFilter === "ทั้งหมด") {
        const newData = nerList.filter(item => item[variable.paymentStatus.value] === payFilter)
        setSearchFilter(newData)
      } else {
        const newData = nerList.filter(item => item[variable.paymentStatus.value] === payFilter)
        const filter = newData.filter(item => item[variable.productStatus.value].includes(orderFilter))
        setSearchFilter(filter)
      }

    }
  }

  const onPayFilter = (value) => {
    setPayFilter(value)
    if (value === "ทั้งหมด") {
      if (searchText === '') {
        if (orderFilter === 'ทั้งหมด') {
          setSearchFilter([])
        } else {
          const newData = lists.filter(item => item[variable.productStatus.value].includes(orderFilter))
          setSearchFilter(newData)
        }
        // กด ทั้งหมดโดยที่ไม่ search

      } else {
        // กดทั้งหมดโดย search
        const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item[variable.twitter.value].toLowerCase().includes(searchText.toLowerCase()));
        if (orderFilter !== 'ทั้งหมด') {
          const newData = nerList.filter(item => item[variable.productStatus.value].includes(orderFilter))
          setSearchFilter(newData)
        } else {
          setSearchFilter(nerList)
        }


      }
    } else {
      if (searchText === '') {
        // กดโดยไม่ serch
        if (orderFilter === 'ทั้งหมด') {
          const newData = lists.filter(item => item[variable.paymentStatus.value] === value)
          setSearchFilter(newData)
        } else {
          const filter = lists.filter(item => item[variable.productStatus.value].includes(orderFilter))
          const newData = filter.filter(item => item[variable.paymentStatus.value] === value)
          setSearchFilter(newData)
        }

      } else {
        const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item[variable.twitter.value].toLowerCase().includes(searchText.toLowerCase()));
        if (orderFilter === "ทั้งหมด") {
          const newData = nerList.filter(item => item[variable.paymentStatus.value] === value)
          setSearchFilter(newData)
        } else {
          const newData = nerList.filter(item => item[variable.productStatus.value].includes(orderFilter))
          const filter = newData.filter(item => item[variable.paymentStatus.value] === value)
          setSearchFilter(filter)
        }

      }
    }
  }
  const onOrderFilter = (value) => {
    setOrderFilter(value)
    if (value === "ทั้งหมด") {
      if (searchText === '') {
        if (payFilter === 'ทั้งหมด') {
          setSearchFilter(lists)
        } else {
          const newData = lists.filter(item => item[variable.paymentStatus.value] === payFilter)
          setSearchFilter(newData)
        }
        // กด ทั้งหมดโดยที่ไม่ search
      } else {
        const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item[variable.twitter.value].toLowerCase().includes(searchText.toLowerCase()));
        if (payFilter !== 'ทั้งหมด') {
          const newData = nerList.filter(item => item[variable.paymentStatus.value] === payFilter)
          setSearchFilter(newData)
        } else {
          setSearchFilter(nerList)
        }
      }
    } else {
      if (searchText === '') {
        // กดโดยไม่ serch
        if (payFilter === 'ทั้งหมด') {
          const newData = lists.filter(item => item[variable.productStatus.value].includes(value))
          setSearchFilter(newData)
        } else {
          const newData = lists.filter(item => item[variable.paymentStatus.value] === payFilter)
          const filter = newData.filter(item => item[variable.productStatus.value].includes(value))
          setSearchFilter(filter)
        }
      } else {
        if (payFilter === 'ทั้งหมด') {
          const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item[variable.twitter.value].toLowerCase().includes(searchText.toLowerCase()));
          const newData = nerList.filter(item => item[variable.productStatus.value].includes(value))
          setSearchFilter(newData)
        } else {
          const nerList = lists.filter(item => item.รายการ.toLowerCase().includes(searchText.toLowerCase()) || item[variable.twitter.value].toLowerCase().includes(searchText.toLowerCase()));
          const newData = nerList.filter(item => item[variable.paymentStatus.value] === payFilter)
          const filter = newData.filter(item => item[variable.productStatus.value].includes(value))
          setSearchFilter(filter)
        }

      }
    }
  }
  const getList = () => {
    if (searchText === '') {
      if (payFilter === 'ทั้งหมด' && orderFilter === 'ทั้งหมด') {
        if (lists.length > 0) {
          return lists
        } else {
          return false
        }
      } else {
        if (searchFilter.length === 0) {
          return false
        } else {
          return searchFilter
        }

      }

    } else {
      if (searchFilter.length > 0) {
        return searchFilter
      } else {
        return false
      }
    }
  }
  const onRefresh = () => {
    setPlaceHolderData(getFullyDateNow())
    fetchList(getDateNow())
    selectInputRef.current.select.clearValue();
  }
  const onSelectModal = (data) => {
    setShowModal(true)
    setSelectList(data)
  }
  const onCloseModal = () => {
    setShowModal(false)
  }
  const onDeleteList = (id) => {
    onRefresh()
  }
  return (
    <>
      <ModalDetail showModal={showModal} onCloseModal={onCloseModal} selectList={selectList} onDeleteList={onDeleteList} />
      <Header onRefresh={() => onRefresh()} />
      <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}>
        <div style={{ width: 300 }}>
          <TextInput
            placeholder={serchInput.placeholder}
            style={{ backgroundColor: serchInput.background }}
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div style={{ width: 200, paddingLeft: 10 }}>
          <Select
            ref={selectInputRef}
            style={{ width: 100 }}
            placeholder={placeholderDate}
            onChange={(e) => onSelectSheet(e ? e.value : getDateNow())}
            options={selectData} />
        </div>
      </div>
      <Box direction="column" >
        <Box gap="small" direction="row" pad={{ horizontal: 'medium' }}>
          <PayStatusFilter payFilter={payFilter} name={payStatus["ทั้งหมด"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter(payStatus["ทั้งหมด"].value)}><Text size="xxsmall">{payStatus["ทั้งหมด"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={payFilter} name={payStatus["มัดจำ"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('มัดจำ')}><Text size="xxsmall">{payStatus["มัดจำ"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={payFilter} name={payStatus["จ่ายเต็ม"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('จ่ายเต็ม')}><Text size="xxsmall">{payStatus["จ่ายเต็ม"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={payFilter} name={payStatus["ยังไม่จ่าย"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onPayFilter('ยังไม่จ่าย')}><Text size="xxsmall">{payStatus["ยังไม่จ่าย"].value} </Text></PayStatusFilter>
        </Box>
        <Box gap="small" direction="row" pad={{ horizontal: 'medium', vertical: 'small' }}>
          <PayStatusFilter payFilter={orderFilter} name={trackingStatus["ทั้งหมด"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter(trackingStatus["ทั้งหมด"].value)}><Text size="xxsmall">{trackingStatus["ทั้งหมด"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name={trackingStatus["รอกด"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter(trackingStatus["รอกด"].value)}><Text size="xxsmall">{trackingStatus["รอกด"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name={trackingStatus["กดแล้ว"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter(trackingStatus["กดแล้ว"].value)}><Text size="xxsmall">{trackingStatus["กดแล้ว"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name={trackingStatus["รอส่ง"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter(trackingStatus["รอส่ง"].value)}><Text size="xxsmall">{trackingStatus["รอส่ง"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name={trackingStatus["ส่งแล้ว"].value} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter(trackingStatus["ส่งแล้ว"].value)}><Text size="xxsmall">{trackingStatus["ส่งแล้ว"].value}</Text></PayStatusFilter>
          <PayStatusFilter payFilter={orderFilter} name={"บ้านเกา"} size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onOrderFilter('บ้านเกา')}><Text size="xxsmall">บ้านเกา</Text></PayStatusFilter>
        </Box>
      </Box>
      {loading ? <center style={{ marginTop: 100 }} ><Loader /></center> :
        <div div style={{ overflow: "scroll", height: 'calc(100vh - 260px)', marginTop: 10 }}>
          {
            getList() ? getList().map(item => {
              return <CardComponent item={item} key={item.id} onSelectModal={onSelectModal} onDeleteList={onDeleteList} />
            }) : <center style={{ marginTop: 100 }} ><Text size="large" color={color.fontColor}>{Notfound}</Text></center>
          }
        </div >
      }
    </>
  )
}


const CardComponent = ({ item, onSelectModal }) => {
  return (
    <Card margin={{ horizontal: "10px", vertical: "large" }} animation={['fadeIn']} onClick={() => onSelectModal(item)}>
      <CardBody pad={{ horizontal: "small", vertical: "medium" }} background={color.cardBody}>
        <Text truncate={true} color={color.fontColor} style={{ paddingLeft: 5 }}>{item[variable.product.value]}</Text></CardBody>
      <CardFooter pad={{ horizontal: "medium", vertical: "10px" }} background={color.cardFooter}>
        <Text size="small" color={color.fontColor}>{item[variable.twitter.value]}</Text>
        <Box gap="small" direction="row">
          <TrackingStatus status={item[variable.productStatus.value]} />
          <PayStatus status={item[variable.paymentStatus.value]} />
        </Box>
      </CardFooter>
    </Card>
  )
}
export default List