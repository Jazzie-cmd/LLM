import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import "./globals/style.css"
import Main from "./globals/components/Main"
import Welcome from "./globals/components/Welcome"
import Result from "./globals/components/Result"

function AnimatedRoutes() {
    const location = useLocation();

    // Animation variants
    const pageVariants = {
        initial: {
            opacity: 0,
            x: "-100%"
        },
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: "100%"
        }
    };

    const pageTransition = {
        type: "tween",
        ease: "anticipate",
        duration: 0.3
    };

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route 
                    path="/" 
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Welcome />
                        </motion.div>
                    } 
                />
                <Route 
                    path="/main" 
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Main />
                        </motion.div>
                    } 
                />
                <Route 
                    path="/result" 
                    element={
                        <motion.div
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Result />
                        </motion.div>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
}

function IndexSidePanel() {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
}

export default IndexSidePanel;