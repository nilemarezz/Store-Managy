import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Text } from 'grommet'
import { Close, Edit, LinkPrevious, Checkmark, Alert } from 'grommet-icons'
import { color, variable } from '../masterdata'
import styled from 'styled-components'
import { Loader } from './Loader'
const ButtonDelete = styled.div`
  background-color : #f16d83;
  color : white;
  width: 100%;
  display : flex;
  flex-direction: row;
  justify-content : center;
  align-items : center;
  border-radius: 5px;
`
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

const ConfirmDelete = ({ deleteId, onCloseDeletemodal, onDeleteListModal, deleteName, deleteError, loadingDelete }) => {

  return (
    <AnimatePresence exitBeforeEnter>
      {deleteId &&
        <>
          <motion.div className="backdropdelete" variants={backdrop} initial="hidden" animate="visible" exit="hidden"
            onClick={() => loadingDelete ? null : onCloseDeletemodal()}>

          </motion.div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <motion.div className="modaldelete"
              variants={modal}
              initial="hidden" animate="visible" exit="hidden"
            >
              {loadingDelete ? <center style={{ marginTop: 100 }} ><Loader color={color.background} /></center>
                :
                <>
                  <Box justify="end" pad="small" direction="row">
                    <Close color={color.text} onClick={() => onCloseDeletemodal()} />
                  </Box>
                  <Box pad="small" direction="row" justify="center">
                    <Alert color="#FFAA15" size="xlarge" />
                  </Box>
                  <Box pad="small" direction="column" align="center">
                    <Text>Are you sure to delete</Text>
                    <Text> <strong>{deleteName} ?</strong></Text>
                  </Box>
                  <Box pad="xsmall" direction="column" align="center">
                    <Text size="xsmall" color="red">{deleteError}</Text>
                  </Box>
                  <Box pad="medium" direction="row" >
                    <ButtonDelete onClick={() => onDeleteListModal()}><Text size="small" style={{ padding: 3 }}>DELETE</Text></ButtonDelete>
                  </Box>
                </>
              }

            </motion.div>
          </div>
        </>
      }
    </AnimatePresence>
  )

}

export default ConfirmDelete