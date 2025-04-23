'use client'
import Image from "next/image"
import RedChild from '@/assets/images/redChild.jpeg'

const itemList = [
    {
        id: 1,
        image: RedChild,
    },
    {
        id: 2,
        image: RedChild,
    },
    {
        id: 3,
        image: RedChild,
    },
    {
        id: 4,
        image: RedChild,
    },
    {
        id: 5,
        image: RedChild,
    },
    {
        id: 6,
        image: RedChild,
    },
]
const arr1 = ["L", "U", 'c', 'k', 'y'];
export default function RadialCarousel() {
    return (
        <div className="w-full h-full flex justify-center items-center bg-white">
            {
                itemList.map((entry, index) => {
                    return (
                        <div key={entry.id}
                            style={{ transform: `rotate(${index * 360 / arr1.length}deg)` }}
                            className="h-20 border-red-100 absolute w-10  text-black origin-bottom rounded-full">
                            <Image src={entry.image} alt="image" width={50} height={50} className="rounded-full" />
                        </div>
                    )
                })
            }
        </div>
    )
}