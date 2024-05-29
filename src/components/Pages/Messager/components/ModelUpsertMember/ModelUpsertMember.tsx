import { useContext, useState } from 'react'
import { AppContext } from '../../../../../Context/AppProvider'
import { Form, Modal } from 'antd'
import { fetchUserList, updateDocument } from '../../../../../firebase/services'
import { DebounceSelect, UserValue } from '../../../../common/DebounceSelect'

export default function InviteMemberModal() {
  const { isInviteMemberVisible, setIsInviteMemberVisible, selectedRoomId, selectedRoom } = useContext(AppContext)
  const [value, setValue] = useState<UserValue[]>([])
  const [form] = Form.useForm()

  const handleOk = () => {
    // reset form value
    form.resetFields()
    setValue([])

    // update members in current room
    const data = {
      ...selectedRoom,
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
      uid: selectedRoomId
    }
    updateDocument('rooms', data)
    setIsInviteMemberVisible(false)
  }

  const handleCancel = () => {
    // reset form value
    form.resetFields()
    setValue([])

    setIsInviteMemberVisible(false)
  }

  return (
    <div>
      <Modal
        title='Mời thêm thành viên'
        open={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='search-user'
            label='Tên các thành viên'
            value={value}
            placeholder='Nhập tên thành viên'
            fetchOptions={fetchUserList}
            onChange={(newValue: UserValue[]) => setValue(newValue)}
            style={{ width: '100%' }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  )
}
