import * as React from "react";
import { motion } from "framer-motion";
import { Twitter, AddCircle, Analytics, List, Notes } from 'grommet-icons';
import { withRouter } from 'react-router-dom'
import { defaultProps } from "grommet";
const variantsli = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};
const variantsul = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};


const Navigation = (props) => {
  const onNavigate = (value) => {
    if (props.isOpen) {
      props.toggle()
      props.history.push(value)
    } else {
      return
    }

  }
  return (
    <>
      <motion.ul variants={variantsul}>
        <motion.li
          variants={variantsli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('/list')}
        >
          <List />
        </motion.li>
        <motion.li
          onClick={() => onNavigate('/add')}
          variants={variantsli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: 20 }}
        >
          <AddCircle />
        </motion.li>
        <motion.li
          onClick={() => onNavigate('/analyze')}
          variants={variantsli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: 20 }}
        >
          <Analytics />
        </motion.li>
        <motion.li
          variants={variantsli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: 20 }}
        >
          <Twitter />
        </motion.li>
        <motion.li
          variants={variantsli}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: 20 }}
        >
          <Notes />
        </motion.li>
      </motion.ul>
    </>
  )
}

export default withRouter(Navigation)