import Frame from "@/components/Frame";
import CircularMenuPage from "@/ui/circulatMenuPage";
import ContinuousTab from "@/ui/ContinuousTab";
import TransactionList from "@/ui/TransactionList";
// import FluidSimulation from "@/ui/FluidSimulation";

const ElementList = [
    {
        id: 1,
        name: "Circular Menu",
        component: <CircularMenuPage />
    },
    {
        id: 2,
        name: "Transaction List",
        component: <TransactionList />
    },
    {
        id: 3,
        name: "Continuous Tabs",
        component: <ContinuousTab/>
    },
]

export default function UiElement() {
    return (
        <div className="mx-2 md:mx-20 lg:mx-60">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {ElementList.map((element) => (
                    <Frame
                        key={element.id}
                        title={element.name}
                    >
                        {element.component}
                    </Frame>
                ))}
            </div>
        </div>
    )
}