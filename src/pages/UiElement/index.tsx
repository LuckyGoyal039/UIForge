import Frame from "@/components/Frame";
import Card from "@/ui/CardSwipe";
import CashDisclosure from "@/ui/CashDisclosure";
import CircularMenuPage from "@/ui/circulatMenuPage";
import ContinuousTab from "@/ui/ContinuousTab";
import CurrencySwap from "@/ui/currencySwap";
import RadialCarousel from "@/ui/RadialCarousel";
import ReturnCalculator from "@/ui/ReturnCalculator";
import TransactionList from "@/ui/TransactionList";
import TreeMenu from "@/ui/treeMenu";
// import ViewMap from "@/ui/ViewMap";

// Generate a random unique ID (similar to UUID v4 format)
function generateId() {
    return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// Generate descending dates starting from today, spaced between 3–14 days apart
function generateRandomDates(count: number): string[] {
    const dates: string[] = [];
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);

    for (let i = 0; i < count; i++) {
        dates.push(currentDate.toISOString().split("T")[0]); // YYYY-MM-DD
        const gap = Math.floor(Math.random() * (14 - 3 + 1)) + 3;
        currentDate.setDate(currentDate.getDate() - gap);
    }

    return dates;
}

const componentsList = [
    { name: "Return Calculator Snippet", component: <ReturnCalculator /> },
    { name: "Radial Carousel", component: <RadialCarousel /> },
    { name: "Transaction List", component: <TransactionList /> },
    { name: "Add Cash Disclosure", component: <CashDisclosure /> },
    { name: "Circular Menu", component: <CircularMenuPage /> },
    { name: "Swap Currency", component: <CurrencySwap /> },
    { name: "Card Swipe", component: <Card /> },
    { name: "Continuous Tabs", component: <ContinuousTab /> },
    { name: "Tree Menu", component: <TreeMenu /> },
    // { name: "View on Maps", component: <ViewMap /> },
];

const randomDates = generateRandomDates(componentsList.length);

const ElementList = componentsList.map((item, index) => ({
    id: generateId(),
    name: item.name,
    component: item.component,
    createdDate: randomDates[index],
}));

export default function UiElement() {
    return (
        <div className="mx-2 md:mx-20 lg:mx-60 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {ElementList.map((element) => (
                    <Frame
                        key={element.id}
                        title={element.name}
                        date={element.createdDate}
                    >
                        {element.component}
                    </Frame>
                ))}
            </div>
        </div>
    );
}
