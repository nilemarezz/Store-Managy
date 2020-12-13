import { useEffect, useState } from 'react'
import { Box, Text, Card } from 'grommet';
import { color } from '../masterdata'
import { Trophy, History, Currency, LineChart } from 'grommet-icons'
import getAnalyze from '../services/getAnalyze'
import { Loader } from '../components/Loader'
import Select from 'react-select'
import Chart from "react-apexcharts";
import styled from 'styled-components'
const PayStatusFilter = styled(Box)`
  border-radius: 6px; 
  ${props => props.name === props.payFilter ?
    `background-color : ${color.activate}; color : ${color.fontActivate}; `
    :
    `border : 1px solid ${color.activate}; color :${color.fontColor};`}
  `
const Analyze = () => {
  const [topPrice, setTopPrice] = useState([])
  const [topAmount, setTopAmount] = useState([])
  const [loading, setLoading] = useState(false)
  const [month, setMonth] = useState([])
  const [select, setSelect] = useState('ทั้งหมด')
  const [filter, setFilter] = useState([])
  const [selectField, setSelectField] = useState([])
  const [xaxis, setxaxis] = useState([])
  const [filterChart, setFilterChart] = useState([])
  const [filterChartLabel, setFilterChartLabel] = useState('จำนวน')
  const [error, setError] = useState('')
  useEffect(async () => {
    setLoading(true)
    const data = await getAnalyze()
    if (data) {
      setTopPrice(data.toprank.sortByPrice)
      setTopAmount(data.toprank.sortByAmount)
      setMonth(data.filterByMonth)
      setFilter(...data.filterByMonth.filter(item => item["เดือน"] === "ทั้งหมด"))
      const selectField = []
      const xasis = []
      const filterCharts = []
      data.filterByMonth.map((item, i) => {
        selectField.push({ value: item["เดือน"], label: item["เดือน"] })
        if (i != 0) {
          xasis.push(item["เดือน"])
          filterCharts.push(item["จำนวน"])
        }
      })
      setFilterChart(filterCharts)
      setxaxis(xasis)
      setSelectField(selectField)
      setLoading(false)
    } else {
      setError('Something went wrong')
      setLoading(false)
    }
  }, [])

  const onChangeMonth = (value) => {
    const data = [...month]
    const filter = data.filter(item => {
      return item["เดือน"] === value
    })
    setFilter(...filter)
  }

  const onChangeChart = (value) => {
    setFilterChartLabel(value)
    const data = []
    month.map((item, i) => {
      if (i !== 0) {
        data.push(item[value])
      }

    })
    setFilterChart(data)
  }
  if (loading) {
    return <center style={{ marginTop: 100 }} ><Loader /></center>
  } else {

    return (
      <>
        {error === '' ?
          <Box pad="medium" gap="small">
            <Box direction="row" justify="end">
              <div style={{ width: 150 }}>
                <Select
                  placeholder={select}
                  options={selectField}
                  onChange={(e) => onChangeMonth(e.value)}
                />
              </div>
            </Box>
            <Box direction="row" justify="around" pad={{ vertical: "medium" }}>
              <Box direction="column" gap="small" align="center" style={{ paddingTop: 15 }}>
                <Text color={color.fontColor}>{filter["จำนวน"]}</Text>
                <Box direction="row" gap="small" align="center">
                  <History size="small" color={color.subfont} />
                  <Text color={color.subfont} size="small">จำนวน</Text>
                </Box>
              </Box>
              <Box direction="column" gap="small" align="center">
                <Text color={color.fontColor} size="large">{filter["กำไร"]} ฿</Text>
                <Box direction="row" gap="small" align="center">
                  <LineChart size="small" color={color.subfont} />
                  <Text color={color.subfont} size="small">กำไร</Text>
                </Box>
              </Box>
              <Box direction="column" gap="small" align="center" style={{ paddingTop: 15 }}>
                <Text color={color.fontColor}>{filter["ยอดที่โอน"]} ฿</Text>
                <Box direction="row" gap="small" align="center">
                  <Currency size="small" color={color.subfont} />
                  <Text color={color.subfont} size="small">ยอดที่โอน</Text>
                </Box>
              </Box>
            </Box>
            <hr style={{ color: 'white', width: '85%' }}></hr>
            <Box pad={{ vertical: "medium" }} gap="medium" direction="row" justify="around">
              <Box gap="small">
                <Text size="small" color={color.fontColor}>จำนวนครั้งที่ซื้อสูงสุด</Text>
                {topAmount.length === 0 ? "" : topAmount.map((item, i) => {
                  return (
                    <Card background="light-1">
                      <Box pad="small" justify="around" direction="row" gap="small">
                        <Trophy color={i === 0 ? "" : "light-1"} size="medium" />
                        <Text>{item["@Twitter"]}</Text>
                        <Text>{item["จำนวน"]}</Text>
                      </Box>
                    </Card>
                  )
                })}
              </Box>
              <Box gap="small">
                <Text size="small" color={color.fontColor}>ยอดการโอนสะสมสูงสุด</Text>
                {topPrice.length === 0 ? "" : topPrice.map((item, i) => {
                  return (
                    <Card background="light-1">
                      <Box pad="small" justify="around" direction="row" gap="small">
                        <Trophy color={i === 0 ? "" : "light-1"} size="medium" />
                        <Text>{item["@Twitter"]}</Text>
                        <Text>{item["ยอดที่โอน"]}</Text>
                      </Box>
                    </Card>
                  )
                })}
              </Box>

            </Box>
            <Box gap="small" direction="row">
              <PayStatusFilter payFilter={filterChartLabel} name="จำนวน" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onChangeChart("จำนวน")}><Text size="xxsmall">จำนวน</Text></PayStatusFilter>
              <PayStatusFilter payFilter={filterChartLabel} name="กำไร" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onChangeChart("กำไร")}><Text size="xxsmall">กำไร</Text></PayStatusFilter>
              <PayStatusFilter payFilter={filterChartLabel} name="ยอดที่โอน" size="small" pad={{ horizontal: "xsmall", vertical: 'xxsmall' }} onClick={() => onChangeChart("ยอดที่โอน")}><Text size="xxsmall">ยอดที่โอน</Text></PayStatusFilter>
            </Box>
            <Box justify="center">
              <Chart
                options={{
                  chart: {
                    id: "basic-bar",
                    color: 'white',
                    background: '#15202b'
                  },
                  xaxis: {
                    categories: xaxis
                  },
                  theme: {
                    mode: 'dark',
                  }
                }}
                series={[
                  {
                    name: filterChartLabel,
                    data: filterChart
                  }
                ]}
                type="bar"
                width="330"

              />
            </Box>
          </Box> : <center style={{ marginTop: 100 }} >{error}</center>}

      </>
    )
  }
}

export default Analyze