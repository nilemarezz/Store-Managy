import { motion, AnimatePresence } from 'framer-motion'
import { Box, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { TrackingStatus, PayStatus, LogisStatus } from '../components/ItemStatus.jsx'
import ItemDetail from '../components/ItemDetail'
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
              <ItemDetail selectList={selectList} />
            </motion.div>
          </div>
        </>

      )}
    </AnimatePresence>
  )
}

export default Modal