import { motion, AnimatePresence } from 'framer-motion'
import { Box, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { TrackingStatus, PayStatus, LogisStatus } from '../components/ItemStatus.jsx'
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
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <>
          <motion.div className="backdrop" variants={backdrop} initial="hidden" animate="visible" onClick={() => onCloseModal()} exit="hidden">
          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <motion.div className="modal"
              variants={modal}
              initial="hidden" animate="visible" exit="hidden"
            >
              <Box justify="end" direction="row" pad="medium"><Close color="black" size="medium" color="white" onClick={() => onCloseModal()} /></Box>
              <Box pad="medium">
                <Text color="white" size="large"><center><strong>{selectList["รายการ"]}</strong></center></Text>
                <Box pad={{ vertical: 'small' }}>
                  <Text color="white" size="medium" color="lightgray">{selectList["@twitter"]}</Text>
                </Box>
                <Box pad={{ vertical: 'small' }} direction="row">
                  <Text color="white" size="medium" color="lightgray">{`สถานะสินค้า : `} </Text>
                  <Box pad={{ horizontal: 'small' }} >
                    <TrackingStatus status={selectList["Tracking no."]} />
                  </Box>

                </Box>
                <Box pad={{ vertical: 'small' }} direction="row">
                  <Text color="white" size="medium" color="lightgray">{`สถานะการจ่าย : `} </Text>
                  <Box pad={{ horizontal: 'small' }} >
                    <PayStatus status={selectList["สถานะ"]} />
                  </Box>
                </Box>
                <Box pad={{ vertical: 'small' }} direction="row">
                  <Text color="white" size="medium" color="lightgray">{`ส่งพัศดุ : `} </Text>
                  <Box pad={{ horizontal: 'small' }} >
                    <LogisStatus status={selectList["การจัดส่ง"]} />
                  </Box>
                </Box>
                <Box pad={{ vertical: 'small' }} direction="row" justify="between" gap="medium">
                  <Text color="white" size="medium" color="lightgray">{`จำนวน : ${selectList["จำนวน"]}`} </Text>
                  <Text color="white" size="medium" color="lightgray" style={{ border: '1px solid white', padding: '4px', borderRadius: '5px' }}>{`ยอดที่โอน : ${selectList["ยอดที่โอน"]} ฿`} </Text>
                </Box>
                <Box pad={{ vertical: 'small' }} direction="row">
                  <Box style={{ width: '130px' }}>
                    <Text color="white" size="small" color="lightgray">{`ที่อยู่ : `} </Text>
                  </Box>
                  <Text color="white" size="small" color="lightgray">{` ${selectList["ที่อยู่"]}`} </Text>
                </Box>
                <Box pad={{ vertical: 'small' }} direction="row" gap="small">
                  <Text color="white" size="small" color="lightgray">{`Note : `} </Text>
                  <Text color="white" size="small" color="lightgray">{` ${selectList["Note"]}`} </Text>
                </Box>
                <hr style={{ width: '80%' }}></hr>
                <Box pad={{ vertical: 'small' }} direction="row" gap="medium" justify="center">
                  <Text color="white" size="small" color="lightgray">{`ต้นทุน : ${selectList["ต้นทุน"]}`} </Text>
                  <Text color="white" size="small" color="lightgray">{`ราคาขาย : ${selectList["ราคาขาย"]}`} </Text>
                </Box>
                <Box pad={{ vertical: 'small' }} direction="row" gap="medium" justify="center">
                  <Text color="white" size="small" color="lightgray">{`ค่าส่งที่เก็บ : ${selectList["ค่าส่งที่เก็บ"]}`} </Text>
                </Box>
              </Box>
            </motion.div>
          </div>
        </>

      )}
    </AnimatePresence>
  )
}

export default Modal