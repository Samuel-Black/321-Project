import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../components/DragItemTypes'
import SelectedCardLeft from '../components/MaMSelected-Left'



export default function DropImage({ prop }) {
    const[{isOver}, drop] = useDrop({
        accept: ItemTypes.CARDLEFT,
        collect: monitor => ({
          isOver: !!monitor.isOver(),
        })
      })
    return(
        <div>
            <h1>Cart</h1>
            <div className = "cart" style={{
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: isOver? "5px solid red" : "5px solid blue"
            }}
            ref={drop}
            >
              {prop ? <SelectedCardLeft /> : "Box"}
            </div>
        </div>
      )
    }