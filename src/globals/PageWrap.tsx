import { motion } from "framer-motion"

const pageVariants = {
  initial: { opacity: 0},
  animate: { opacity: 1},
  exit: { opacity: 0 }
}

const PageWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrap