import { useDrawSnake } from "@/hooks/useDrawSnake"
import React, { KeyboardEventHandler, useReducer } from "react";

export function SnakeGame() {

    const { canvasRef } = useDrawSnake();

    return (
        
        <canvas 
            ref={canvasRef} 
            width={500} 
            height={500} 
            className="border-white border"
        >
        </canvas>

    )

}