import React, { useRef, useState, useEffect } from 'react';
import Circle from './Circle';

let circles = [];
const mouse = {};
const colors = [
    '#02AFC5',
    '#5CE802',
    '#FFAE0F',
    '#E80224',
    '#1603FF'
]

const init = ({ context, mouse }) => {
    circles = [];
    for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 3 + 1;
        const circle = new Circle({
            radius,
            x: Math.random() * (window.innerWidth - 2 * radius) + radius,
            y: Math.random() * (window.innerHeight - 2 * radius) + radius,
            dx: (Math.random() - 0.5),
            dy: (Math.random() - 0.5),
            context,
            mouse,
            color: (colors[Math.floor(Math.random() * colors.length)])
        })
        circles.push(circle);
    }
}

const Canvas = (props) => {
    const canvas = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        const context = canvas.current.getContext('2d');
        const animate = () => {
            requestAnimationFrame(animate);
            context.clearRect(0, 0, window.innerWidth, window.innerHeight)
            circles.forEach(circle => circle.update())
        }
        window.addEventListener('mousemove', e => {
            mouse.x = e.x;
            mouse.y = e.y;
        })

        window.addEventListener('resize', e => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            init({ context, mouse });
        })

        init({ context, mouse });
        animate();
    }, [])

    return (
        <canvas width={width} height={height} ref={canvas} {...props} />
    )
}

export default Canvas;