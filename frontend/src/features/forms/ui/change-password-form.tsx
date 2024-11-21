import { changePasswordThunk } from "@entities/slices/auth-slice"
import { Button, Form, Input, message, Modal } from "antd"
import { AppDispatch, RootState } from "app/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from 'js-cookie'

export const ChangePasswordForm = () => {
  const {username, id} = useSelector((state: RootState) => state.token)
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState('')
  const dispatch: AppDispatch = useDispatch()
  const refreshToken = Cookies.get('refreshToken')

  const handleOk = async () => {
    try {
      await dispatch(changePasswordThunk({ userId: id!, data: { newPassword: password, refresh: refreshToken! } })).unwrap()
      message.success('Пароль успешно изменен')
      setOpen(!open)
    } catch (error) {
      message.error('Произошла ошибка при изменении пароля')
    }
  }

  return (
    <Form size="large">
      <Form.Item>
        <Input
          defaultValue={username!}
          variant="borderless"
          disabled
        />
      </Form.Item>

      <Button type="primary" onClick={() => setOpen(!open)}>Сменить пароль</Button>
      <Modal
        open={open}
        title="Сменить пароль"
        onCancel={() => setOpen(!open)}
        onOk={handleOk}
        footer={[
          <Button key="back" onClick={() => setOpen(!open)}>
            Отменить
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Сменить пароль
          </Button>,
        ]}
      >
        <Input.Password onChange={(e) => setPassword(e.target.value)}/>
      </Modal>
    </Form>
  )
}