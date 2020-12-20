import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Text } from 'grommet'
import { Close, Edit, LinkPrevious, Checkmark } from 'grommet-icons'
import ItemDetail from '../components/ItemDetail'
import EditDetail from '../components/EditDetail'
import { color, variable } from '../masterdata'
import editDetailService from '../services/editDetail'
import { Loader } from '../components/Loader'
import ConfirmDelete from '../components/ConfirmDelete'
import deleteList from '../services/deleteList'
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

const Modal = ({ showModal, onCloseModal, selectList, onDeleteList }) => {
  const [onEdit, setOnEdit] = useState(false)
  const [paymethod, setPaymethod] = useState(null)
  const [trackmethod, settrackmethod] = useState(null)
  const [trackingNo, settrackingNo] = useState(null)
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, seterrorMsg] = useState('')
  const [cost, setCost] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteError, setDeleteError] = useState(null)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const closeModal = () => {
    setPaymethod(null)
    settrackmethod(null)
    settrackingNo(null)
    setAddress(null)
    setOnEdit(false)
    setCost(null)
    seterrorMsg('')
    onCloseModal()
  }
  const backClick = () => {
    setPaymethod(null)
    settrackmethod(null)
    settrackingNo(null)
    setAddress(null)
    setCost(null)
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
    data[variable.cost.value] = cost === null ? selectList[variable.cost.value] : cost
    const res = await editDetailService(data)
    if (res) {
      setLoading(false)
      backClick()
    } else {
      seterrorMsg('Something Went Wrong , Try again')
      setLoading(false)
    }

  }

  const selectDeleteList = (id) => {
    setDeleteId(id)
    setDeleteError(null)
  }
  const onCloseDeletemodal = () => {
    setDeleteId(null)
    setDeleteError(null)
  }
  const onDeleteListModal = async () => {
    // call api
    setLoadingDelete(true)
    const res = await deleteList(selectList.id, selectList.sheet)
    if (res) {
      setLoadingDelete(false)
      await setDeleteId(null)
      await closeModal()
      onDeleteList(selectList.id)
    } else {
      setLoadingDelete(false)
      setDeleteError('something went wrong!')
    }
  }
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {showModal && (
          <>
            <ConfirmDelete deleteId={deleteId} deleteName={selectList.รายการ} onCloseDeletemodal={onCloseDeletemodal} onDeleteListModal={onDeleteListModal} deleteError={deleteError} loadingDelete={loadingDelete} />
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
                  <Text color={color.fontColor} size="medium"><center><strong>{selectList[variable.product.value]}</strong></center></Text>
                  <Box pad={{ vertical: 'small' }}>
                    <Text color={color.fontColor} size="small" color={color.subfont}>{selectList[variable.twitter.value]}</Text>
                  </Box>
                </Box>
                {onEdit ?
                  loading ? <div style={{ marginTop: '20vh' }}><center><Loader /></center></div> :
                    <EditDetail
                      selectList={selectList}
                      id={selectList.id}
                      paymethod={paymethod === null ? selectList[variable.paymentStatus.value] : paymethod}
                      trackmethod={trackmethod === null ? selectList[variable.productStatus.value] : trackmethod}
                      trackingNo={trackingNo === null ? selectList[variable.trackingNo.value] : trackingNo}
                      address={address === null ? selectList[variable.address.value] : address}
                      cost={cost === null ? selectList[variable.cost.value] : cost}
                      setPaymethod={(value) => setPaymethod(value)}
                      settrackmethod={(value => settrackmethod(value))}
                      setAddress={value => setAddress(value)}
                      settrackingNo={value => settrackingNo(value)}
                      setCost={value => setCost(value)}
                      backClick={backClick}
                      submitEditDetail={submitEditDetail}
                      errorMsg={errorMsg}
                      selectDeleteList={selectDeleteList}

                    /> : <ItemDetail selectList={selectList} />}
                {onEdit ?
                  loading ? null :
                    <Box justify="between" direction="row" pad={{ vertical: 'medium', horizontal: "medium" }} gap="small" align="center" >
                      <Text size="small" color={"red"} >{errorMsg} </Text>
                      <Checkmark color={color.fontColor} onClick={() => submitEditDetail()} />
                    </Box>
                  : null
                }
              </motion.div>
            </div>

          </>

        )}
      </AnimatePresence>
    </>
  )
}

export default Modal