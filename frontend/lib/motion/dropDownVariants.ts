import { Variants } from "framer-motion";

export const dropdownVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -10,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};