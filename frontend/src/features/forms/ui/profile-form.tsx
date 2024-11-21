  import { UserDTO } from "@entities/GateWay/user"
  import { getUserByIdThunk, updateUserThunk } from "@entities/slices/user-slice"
  import { Button, Form, Input, message, Skeleton } from "antd"
  import { AppDispatch, RootState } from "app/store"
  import { useEffect } from "react"
  import { useDispatch, useSelector } from "react-redux"

  export const ProfileForm = () => {
    const dispatch: AppDispatch = useDispatch()
    const userId = useSelector((state: RootState) => state.token.id)

    useEffect(() => {
      dispatch(getUserByIdThunk(userId!)).unwrap()
    }, [dispatch])

    const { isLoading, user, error } = useSelector((state: RootState) => state.user)

    const onFinish = async (data: UserDTO) => {
      try {
        await dispatch(updateUserThunk({ userId: userId!, data })).unwrap()
        message.success({
          content: 'Данные успешно обновлены',
        })
      } catch (error) {
        console.log(error)
        message.error({
          content: 'Произошла ошибка при обновлении данных',
        })
      }
    }

    if (error) console.error('Возникла ошибка в профиле:', error)

    return (
      <Form
        size="large"
        onFinish={onFinish}
      >
        <Skeleton loading={isLoading} active>
          <Form.Item label="Имя" name={"name"}>
            <Input
              placeholder="Иван"
              defaultValue={user?.name}
            />
          </Form.Item>

          <Form.Item label="Фамилия" name={"surname"}>
            <Input
              placeholder="Иванов"
              defaultValue={user?.surname}
            />
          </Form.Item>

          <Form.Item label="Почта" name={"email"}>
            <Input
              placeholder="example@mail.ru"
              defaultValue={user?.email}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Сохранить</Button>
          </Form.Item>

        </Skeleton>
      </Form>
    )
  }
