'use client'
import {useState} from "react";
import Image from "next/image";

type Props = {
    imageUrl: string
}

export default function CarImage(props: Props) {
    const [isLoading, setIsLoading] = useState(true);
    console.log("this is the image  url  " + props.imageUrl)

    return (
        <div className="relative h-full w-full">
            <Image src={props.imageUrl} alt="image" fill priority className={`
                object-cover
                group-hover:opacity-75
                duration-700
                ease-in-out
                ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}
            `} sizes="(max-width:768px) 100vw, (max-width: 1200px) 50vw, 25vw" onLoad={() => setIsLoading(false)}/>
        </div>
        // <Image
        //     src={props.imageUrl}
        //     alt='image'
        //     fill
        //     priority
        //     className={`
        //         object-cover
        //         group-hover:opacity-75
        //         duration-700
        //         ease-in-out
        //         ${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}
        //     `}
        //     sizes='(max-width:768px) 100vw, (max-width: 1200px) 50vw, 25vw'
        //     onLoadingComplete={() => setIsLoading(false)}
        // />

    )
}