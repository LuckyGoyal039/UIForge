import Frame from "@/components/Frame";
import CircularMenuPage from "@/ui/circulatMenuPage";
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
        name: "Your Component",
        component: <div>component</div>
    },
    {
        id: 2,
        name: "Transaction List",
        component: <TransactionList />
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
                        className="h-full"
                    >
                        {element.component}
                    </Frame>
                ))}
            </div>
        </div>
    )
}