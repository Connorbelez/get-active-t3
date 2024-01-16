"use client"
import cslx from "clsx";
interface compProps {
    children: React.ReactNode,
    className?: string,
}


const ds = "snap-center touch-pan-y flex-shrink-0"
export default function SideScroll({children, className}: compProps) {
    // const mouseHandler = (event) => {
    //     var simulatedEvent = new TouchEvent({
    //         mousedown: "touchstart",
    //         mousemove: "touchmove",
    //         mouseup: "touchend"
    //     }[event.type], {
    //         bubbles: true, cancelable: true, view: window, detail: 1,
    //         touches: [{
    //             identifier: 0,
    //             target: event.target,
    //             screenX: event.screenX, screenY: event.screenY, clientX: event.clientX, clientY: event.clientY,
    //             pageX: event.pageX, pageY: event.pageY, radiusX: 2.5, radiusY: 2.5, rotationAngle: 0, force: 0.5
    //         }],
    //         altKey: false, ctrlKey: false, metaKey: false, shiftKey: false
    //     });
    //     event.target.dispatchEvent(simulatedEvent);
    // }
    return (
        <div 
            // onMouseDown={mouseHandler}
            // onMouseMove={mouseHandler}
            // onMouseUp={mouseHandler}
            className={cslx(ds,className)}>
                {children}
        </div>
    )
}
