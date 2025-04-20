import Frame from "@/components/Frame";
import CircularMenuPage from "@/ui/circulatMenuPage";
import FluidSimulation from "@/ui/FluidSimulation";

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
]

export default function UiElement() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
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
    )
}