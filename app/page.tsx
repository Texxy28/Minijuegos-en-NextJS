import { GameSelection } from '@/components/game-selec'
import { Button } from '@/components/ui/button'
import { Boxes, GalleryVerticalEnd, Gamepad2, Shell } from 'lucide-react'
import Image from 'next/image'

export default function Home() {

  const juegos = [
    {
      id: 1,
      nombre: "Snake",
      icon: <Shell />,
      ruta: "snake"
    },
    {
      id: 2,
      nombre: "Tetris",
      icon: <Boxes />,
      ruta: "tetris"
    },
    {
      id: 3,
      nombre: "Memoria",
      icon: <GalleryVerticalEnd />,
      ruta: "memoria"
    },
    {
      id: 4,
      nombre: "Space Invaders",
      icon: <Gamepad2 />,
      ruta: "snake"
    },
    {
      id: 5,
      nombre: "Snake",
      icon: <Gamepad2 />,
      ruta: "snake"
    }
  ]

  return (

    <main className='h-screen w-screen flex justify-center items-center'>

      <div className='w-2/4 h-3/5 flex justify-between border-2 border-gray-700'>

        <div className='flex flex-col w-full h-full p-16'>

          <div className='w-full flex justify-center'>
            <h2 className='font-bold text-xl'>Minijuegos</h2>
          </div>

          <div className='flex w-full h-full justify-between items-center'>
            {juegos.map((juego) => (
              <GameSelection 
                key={juego.id}
                icon={juego.icon}
                nombre={juego.nombre}
                ruta={juego.ruta}
              />
            ))}
          </div>

        </div>

      </div>

    </main>

  )
}
