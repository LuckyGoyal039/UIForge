import Frame from "@/components/Frame";
import Card from "@/ui/CardSwipe";
import CashDisclosure from "@/ui/CashDisclosure";
import CircularMenuPage from "@/ui/circulatMenuPage";
import ContinuousTab from "@/ui/ContinuousTab";
import CurrencySwap from "@/ui/currencySwap";
import ReturnCalculator from "@/ui/ReturnCalculator";
import TransactionList from "@/ui/TransactionList";
import ViewMap from "@/ui/ViewMap";
// import FluidSimulation from "@/ui/FluidSimulation";

const ElementList = [
    {
        id: 1,
        name: "Return Calculator Snippet",
        component: <ReturnCalculator/>
    },
    {
        id: 2,
        name: "Transaction List",
        component: <TransactionList />
    },
    {
        id: 7,
        name: "Add Cash Disclosure",
        component: <CashDisclosure />
    },
    {
        id: 3,
        name: "Circular Menu",
        component: <CircularMenuPage />
    },
    {
        id: 6,
        name: "Card Swipe",
        component: <Card/>
    },
    {
        id: 4,
        name: "Continuous Tabs",
        component: <ContinuousTab/>
    },
    {
        id: 5,
        name: "View on Maps",
        component: <ViewMap/>
    },
    {
        id: 8,
        name: "View on Maps",
        component: <CurrencySwap/>
    },
   
   
]

export default function UiElement() {
    return (
        <div className="mx-2 md:mx-20 lg:mx-60 mb-10">
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