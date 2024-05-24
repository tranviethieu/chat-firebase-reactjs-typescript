import Collapse from '@mui/material/Collapse'
import { TransitionProps } from '@mui/material/transitions'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import { TreeViewBaseItem } from '@mui/x-tree-view/models'
import { animated, useSpring } from '@react-spring/web'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../../../../Context/AppProvider'

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  })

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  )
}
function Rooms() {
  const { rooms, setSelectedRoomId, members } = useContext(AppContext)
  const handleNodeClick = (nodeId: any, itemIds: any) => {
    if (itemIds !== '1') {
      setSelectedRoomId(itemIds)
    } else {
      setSelectedRoomId('')
    }
  }

  return (
    <RichTreeView
      aria-label='customized'
      defaultExpandedItems={['5']}
      sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, width: '100%' }}
      slotProps={{ item: { slots: { groupTransition: TransitionComponent } } }}
      onSelectedItemsChange={handleNodeClick}
      items={[
        {
          id: '1',
          label: 'Danh sách các phòng',
          children: rooms.map((e: any, index: number) => ({ id: String(e.id), label: e?.name }))
        }
      ]}
    />
  )
}

export default Rooms
