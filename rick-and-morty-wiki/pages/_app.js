import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Canvas from '../components/Canvas/Canvas'
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence>
      <motion.div exit='pageExit' key={router.route} initial='pageInitial' animate='pageAnimation' variants={{
        pageInitial: {
          opacity: 0
        },
        pageAnimation: {
          opacity: 1
        },
        pageExit: {
          backgroundColor: 'white',
          filter: 'invert()',
          opacity: 0
        }
      }}>
        <Canvas />
        <Component {...pageProps} style={{zIndex: '2'}} />
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp
