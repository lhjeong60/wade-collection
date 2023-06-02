import { keyframes } from "styled-components";
import { ToastPosition } from "../types";

const entranceFromRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0);
        opacity: 1;
    }
`;
entranceFromRight.name = "entranceFromRight";

const entranceFromLeft = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }`;
entranceFromLeft.name = "entranceFromLeft";

const entranceFromTop = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
entranceFromTop.name = "entranceFromTop";

const entranceFromBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(100%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;
entranceFromBottom.name = "entranceFromBottom";

export const entranceFrom = new Map<ToastPosition, any>();
entranceFrom.set("top-left", entranceFromLeft);
entranceFrom.set("top-center", entranceFromTop);
entranceFrom.set("top-right", entranceFromRight);
entranceFrom.set("bottom-left", entranceFromLeft);
entranceFrom.set("bottom-center", entranceFromBottom);
entranceFrom.set("bottom-right", entranceFromRight);

export const decreaseWidth = keyframes`
    0% {
        width: 100%;
    }
    100% {
        width: 0;
    }
`;
decreaseWidth.name = "decreaseWidth";
