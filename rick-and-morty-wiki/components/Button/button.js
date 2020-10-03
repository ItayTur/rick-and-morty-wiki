import React from 'react';
import { motion } from 'framer-motion';
import styles from '../../styles/Home.module.css';

const button = ({ onClick, value }) => {
    return (
        <motion.button
            className={styles.button}
            onClick={e => onClick ? onClick(e) : ''}
            whileHover={{
                filter: [
                    'hue-rotate(0)',
                    'hue-rotate(360deg)',
                    'hue-rotate(45deg)',
                ],
                transition: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2,
                    repeatDelay: 0
                }
            }}
            onHoverEnd={() => console.log('hover ended')}
        >
            {value}
        </motion.button>
    )
}

export default button;