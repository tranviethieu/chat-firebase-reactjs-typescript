import Collapse from '@mui/material/Collapse'
import { TransitionProps } from '@mui/material/transitions'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import { TreeViewBaseItem } from '@mui/x-tree-view/models'
import { animated, useSpring } from '@react-spring/web'

const ITEMS: TreeViewBaseItem[] = [
  {
    id: '1',
    label: 'Danh sách các phòng',
    children: [
      { id: '2', label: 'Phòng 1' },
      { id: '3', label: 'Phòng 2' },
      { id: '4', label: 'Phòng 3' }
    ]
  },
  {
    id: '5',
    label: 'Danh sách người dùng',
    children: [
      { id: '6', label: 'user 1' },
      { id: '7', label: 'user 2' },
      { id: '8', label: 'user 3' }
    ]
  }
]
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
  return (
    <RichTreeView
      aria-label='customized'
      defaultExpandedItems={['5']}
      sx={{ overflowX: 'hidden', minHeight: 270, flexGrow: 1, width: '100%' }}
      slotProps={{ item: { slots: { groupTransition: TransitionComponent } } }}
      items={ITEMS}
    />
  )
}

export default Rooms
