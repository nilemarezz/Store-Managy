import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Text } from 'grommet'
import { Close, Edit, LinkPrevious } from 'grommet-icons'
import ItemDetail from '../components/ItemDetail'
import EditDetail from '../components/EditDetail'
import { color, variable } from '../masterdata'
import editDetailService from '../services/editDetail'
import { Loader } from '../components/Loader'
const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}
const modal = {
  hidden: { y: "-100vh", opacity: 0, transition: { delay: 0.1 } },
  visible: {
    y: "40px",
    opacity: 1,
    transition: { delay: 0.3 }
  },
}

const Modal = ({ showModal, onCloseModal, selectList }) => {
  const [onEdit, setOnEdit] = useState(false)
  const [paymethod, setPaymethod] = useState(null)
  const [trackmethod, settrackmethod] = useState(null)
  const [trackingNo, settrackingNo] = useState(null)
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, seterrorMsg] = useState('')
  const closeModal = () => {
    setPaymethod(null)
    settrackmethod(null)
    settrackingNo(null)
    setAddress(null)
    setOnEdit(false)
    seterrorMsg('')
    onCloseModal()
  }
  const backClick = () => {
    setPaymethod(null)
    settrackmethod(null)
    settrackingNo(null)
    setAddress(null)
    seterrorMsg('')
    setOnEdit(false)
  }
  const submitEditDetail = async () => {
    setLoading(true)
    let data = selectList
    data[variable.paymentStatus.value] = paymethod === null ? selectList[variable.paymentStatus.value] : paymethod
    data[variable.productStatus.value] = trackmethod === null ? selectList[variable.productStatus.value] : trackmethod
    data[variable.trackingNo.value] = trackingNo === null ? selectList[variable.trackingNo.value] : trackingNo
    data[variable.address.value] = address === null ? selectList[variable.address.value] : address
    const res = await editDetailService(data)
    console.log(res)
    if (res) {
      setLoading(false)
      backClick()
    } else {
      seterrorMsg('Something Went Wrong , Try again')
      setLoading(false)
    }

  }
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <>
          <motion.div className="backdrop" variants={backdrop} initial="hidden" animate="visible" onClick={() => closeModal()} exit="hidden">
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <motion.div className="modal"
              variants={modal}
              initial="hidden" animate="visible" exit="hidden"
            >
              <Box justify="between" direction="row" pad="medium">
                {onEdit ? <LinkPrevious color={color.fontColor} onClick={() => backClick()} /> : <Edit color={color.fontColor} onClick={() => setOnEdit(true)} />}
                <Close size="medium" color={color.fontColor} onClick={() => closeModal()} />
              </Box>
              <Box pad={{ vertical: "small", horizontal: 'medium' }}>
                <Text color={color.fontColor} size="large"><center><strong>{selectList[variable.product.value]}</strong></center></Text>
                <Box pad={{ vertical: 'small' }}>
                  <Text color={color.fontColor} size="medium" color={color.subfont}>{selectList[variable.twitter.value]}</Text>
                </Box>
              </Box>
              {onEdit ?
                loading ? <div style={{ marginTop: '20vh' }}><center><Loader /></center></div> :
                  <EditDetail
                    selectList={selectList}
                    paymethod={paymethod === null ? selectList[variable.paymentStatus.value] : paymethod}
                    trackmethod={trackmethod === null ? selectList[variable.productStatus.value] : trackmethod}
                    trackingNo={trackingNo === null ? selectList[variable.trackingNo.value] : trackingNo}
                    address={address === null ? selectList[variable.address.value] : address}
                    setPaymethod={(value) => setPaymethod(value)}
                    settrackmethod={(value => settrackmethod(value))}
                    setAddress={value => setAddress(value)}
                    settrackingNo={value => settrackingNo(value)}
                    backClick={backClick}
                    submitEditDetail={submitEditDetail}
                    errorMsg={errorMsg}
                  /> : <ItemDetail selectList={selectList} />}
            </motion.div>
          </div>
        </>

      )}
    </AnimatePresence>
  )
}

export default Modal