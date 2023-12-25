"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";

interface GameSelectionProps {
    icon: ReactElement,
    nombre: string,
    ruta: string,
}

export function GameSelection({
    icon,
    nombre,
    ruta
}: GameSelectionProps) {

    const router = useRouter();

    const onClick = () => {

        router.push(ruta);

    }

    return (

        <Button variant="outline" className='flex h-auto flex-col items-center' onClick={onClick}>
            <div>{icon}</div>
            {nombre}
        </Button>

    )

}