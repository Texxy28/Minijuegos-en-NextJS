"use client"

import { SnakeGame } from "@/components/games/snake";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Juegos() {

    const router = useRouter();
    const pathname = usePathname();

    const onClickArrow = () => {

        router.back();

    }

    return (

        <div className='h-screen w-screen flex justify-center items-center'>

            <div className='w-2/4 h-6/6 flex justify-between border-2 border-gray-700'>

                <div className='flex flex-col w-full h-full p-16 relative'>

                    <button className="absolute top-7 left-7" onClick={onClickArrow}>
                        <ArrowLeft />
                    </button>

                    <div className='w-full flex justify-center'>
                        {pathname === "/snake" && (
                            <h2 className='font-bold text-xl'>Snake</h2>
                        )}
                    </div>

                    <div className='flex w-full h-auto justify-center items-center'>
                        {pathname === "/snake" && (
                            <SnakeGame/>
                        )}
                    </div>

                </div>

            </div>

        </div>

    )

}