import { keyframes } from "styled-components";
import { ToastPosition } from "../types";

export const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const entranceFromRight = keyframes`
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
    }
`;
const entranceFromLeft = keyframes`
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }`;

const entranceFromTop = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const entranceFromBottom = keyframes`
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0);
    }
`;

export const entranceFrom = new Map<ToastPosition, any>();
entranceFrom.set("top-left", entranceFromLeft);
entranceFrom.set("top-center", entranceFromTop);
entranceFrom.set("top-right", entranceFromRight);
entranceFrom.set("bottom-left", entranceFromLeft);
entranceFrom.set("bottom-center", entranceFromBottom);
entranceFrom.set("bottom-right", entranceFromRight);
