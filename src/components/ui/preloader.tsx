'use client';
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Preloader = () => {
    const pathControls = useAnimation();
    const preloaderControls = useAnimation();

    useEffect(() => {
        const animateSequence = async () => {
            // Curve animation
            await pathControls.start({
                d: "M0 502S175 272 500 272s500 230 500 230V0H0Z",
                transition: { duration: 1.6, ease: "easeIn" },
            });

            // Flat animation
            await pathControls.start({
                d: "M0 2S175 1 500 1s500 1 500 1V0H0Z",
                transition: { duration: 0.5, ease: "easeOut" },
            });

            // Slide the preloader out of view
            await preloaderControls.start({
                y: -1500,
                transition: { duration: 0.8, ease: "easeInOut" },
            });

            // Hide the preloader after the animation
            await preloaderControls.start({
                zIndex: -1,
                display: "none",
                transition: { duration: 0 },
            });
        };

        animateSequence();
    }, [pathControls, preloaderControls]);

    return (
        <motion.div
            className="preloader h-[100vh] top-0 left-0 right-0 flex justify-center items-center bg-white z-50"
            animate={preloaderControls}
            initial={{ y: 0, display: "flex" }}
        >
            <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
                <motion.path
                    d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
                    animate={pathControls}
                    initial={{
                        d: "M0,1005S175,995,500,995s500,5,500,5V0H0Z",
                    }}
                    className="fill-black"
                />
            </svg>

            {/* Center the "Loading" text with the CSS animation */}
            <div className="preloader-heading flex justify-center items-center w-full h-full">
                <div className="load-text flex text-4xl font-bold text-black">
                    {/* Letters with CSS animations applied */}
                    <motion.span>P</motion.span>
                    <motion.span>R</motion.span>
                    <motion.span>O</motion.span>
                    <motion.span>P</motion.span>
                    <motion.span>O</motion.span>
                    <motion.span>U</motion.span>
                    <motion.span>N</motion.span>
                    <motion.span>D</motion.span>
                </div>
            </div>
        </motion.div>
    );
};

export default Preloader;
