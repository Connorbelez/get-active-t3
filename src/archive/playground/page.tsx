import Card from "@/components/cards/experimental/Card"
import DrawerDemo from "@/components/drawers/ExampleDrawer"

export default function comp() {

    return (
        <div className={""}>
            <div className="h-[500px] bg-red-500"></div>
            <div className="h-[500px] bg-blue-500"></div>

            <div className="h-[500px] bg-green-500"></div>
            <DrawerDemo/>
        </div>
    )
}