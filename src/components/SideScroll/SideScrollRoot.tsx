import clsx from 'clsx'

interface compProps {
    widthStyling?: string,
    spacing?: string,
    children: React.ReactNode,
    className?: string,
    vertical?: boolean,

}
const defaultStyling = "snap-mandatory snap-x overflow-x-scroll flex"

export default function comp({spacing, children, className,vertical}: compProps) {
    const direction = vertical ? "flex-col" : "flex-row";

    return (
        <div  className={clsx(defaultStyling,direction,spacing,className)}>
            {children}
        </div>
    )
}