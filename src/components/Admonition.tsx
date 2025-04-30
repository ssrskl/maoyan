import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleQuestion } from "react-icons/fa6";
import type { ReactNode } from "react";

const admonitionType = {
    success: {
        icon: <FaCircleCheck className="text-[#009400]" />,
        color: '#009400',
        bgColor: '#E6F6E6',
        textColor: '#2A552A',
    },
    info: {
        icon: <FaCircleInfo className="text-[#52b1d2]" />,
        color: '#52b1d2',
        bgColor: '#eef9fd',
        textColor: '#24434e',
    },
    warning: {
        icon: <FaCircleQuestion className="text-[#E6A700]" />,
        color: '#E6A700',
        bgColor: '#FFF8E6',
        textColor: '#4F3A02',
    },
    danger: {
        icon: <FaCircleExclamation className="text-[#E13238]" />,
        color: '#E13238',
        bgColor: '#FFEBEC',
        textColor: '#6C393B',
    },
}
type AdmonitionType = 'success' | 'info' | 'warning' | 'danger';

interface AdmonitionProps {
    type: AdmonitionType;
    children: ReactNode;
}

export default function Admonition({ type, children}: AdmonitionProps) {
    const { icon, color, bgColor, textColor } = admonitionType[type];

    return (
        <div className={`flex-col border-l-4 border-[${color}] p-4 bg-[${bgColor}] rounded-lg my-2`}>
            <div className="flex items-center space-x-2">
                {icon}
                <div className={`text-sm font-extrabold text-[${textColor}]`}>
                    {type}
                </div>
            </div>
            <div className="text-md mt-1 font-light">
                {children}
            </div>
        </div>
    )
}