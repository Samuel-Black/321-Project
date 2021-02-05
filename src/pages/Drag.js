import { useDrag } from 'react-dnd'
import { ItemTypes } from '../components/DragItemTypes'
import SelectedCardLeft from '../components/MaMSelected-Left'

export default function DragImage() {
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.CARDLEFT
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  
    return (
        <div>
            <div class="d-inline-flex"
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                fontSize: 25,
                fontWeight: 'bold',
                cursor: 'move',
            }}
            >
              <SelectedCardLeft />
            </div>
      </div>
    )
}
