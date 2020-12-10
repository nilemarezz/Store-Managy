
import { Box, Text } from 'grommet'
import { TrackingStatus, PayStatus, LogisStatus } from '../components/ItemStatus.jsx'
import { variable, color } from '../masterdata'
const ItemDetail = ({ selectList }) => {
  return (
    <Box pad={{ horizontal: "medium" }} animation={['fadeIn']}>
      <Box pad={{ vertical: 'small' }} direction="row">
        <Text size="medium" color={color.subfont}>{`${variable.paymentStatus.label} : `} </Text>
        <Box pad={{ horizontal: 'small' }} >
          <PayStatus status={selectList[variable.paymentStatus.value]} />
        </Box>
      </Box>
      <Box pad={{ vertical: 'small' }} direction="row">
        <Text size="medium" color={color.subfont}>{`${variable.productStatus.label} : `} </Text>
        <Box pad={{ horizontal: 'small' }} >
          <TrackingStatus status={selectList[variable.productStatus.value]} />
        </Box>

      </Box>
      <Box pad={{ vertical: 'small' }} direction="row">
        <Text size="medium" color={color.subfont}>{`${variable.logist.label} : `} </Text>
        <Box pad={{ horizontal: 'small' }} >
          <LogisStatus status={selectList[variable.logist.value]} />
        </Box>
      </Box>
      <Box pad={{ vertical: 'small' }} direction="row" justify="between" gap="medium">
        <Text size="medium" color={color.subfont}>{`${variable.amount.label}  : ${selectList[variable.amount.value]}`} </Text>
        <Text size="medium" color={color.subfont} style={{ border: '1px solid white', padding: '4px', borderRadius: '5px' }}>{`${variable.price.label}   : ${selectList[variable.price.value]} ฿`} </Text>
      </Box>
      <Box pad={{ vertical: 'small' }} direction="row">
        <Box style={{ width: '130px' }}>
          <Text size="small" color={color.subfont}>{`${variable.address.label}  : `} </Text>
        </Box>
        <Text size="small" color={color.subfont}>{` ${selectList[variable.address.value]}`} </Text>
      </Box>
      <Box pad={{ vertical: 'small' }} direction="row" gap="small">
        <Text size="small" color={color.subfont}>{`${variable.note.label}  : `} </Text>
        <Text size="small" color={color.subfont}>{` ${selectList[variable.note.value]}`} </Text>
      </Box>
      <Box pad={{ vertical: 'small' }} direction="row" gap="small">
        <Text size="small" color={color.subfont}>{`${variable.trackingNo.label} : `} </Text>
        <Text size="small" color={color.subfont}>{` ${selectList[variable.trackingNo.value]}`} </Text>
      </Box>
      <hr style={{ width: '80%' }}></hr>
      <Box pad={{ vertical: 'small' }} direction="row" gap="medium" justify="center">
        <Text size="small" color={color.subfont}>{`${variable.cost.label}  : ${selectList[variable.cost.value]}`} </Text>
        <Text size="small" color={color.subfont}>{`${variable.salePrice.label}  : ${selectList[variable.salePrice.value]}`} </Text>
      </Box>
      <Box pad={{ vertical: 'xxsmall' }} direction="row" gap="medium" justify="center">
        <Text size="small" color={color.subfont}>{`${variable.deliveryCostPay.label}  : ${selectList[variable.deliveryCostPay.value]}`} </Text>
      </Box>
    </Box>
  )
}

export default ItemDetail