import { FormWrapper } from "@shared/form-wrapper"
import { SelectField } from "@shared/inputs"
import { CreateLayout } from "@widgets/layouts/create-layout"
import { Button, Divider, message, Upload } from "antd"
import styled from "styled-components"
// import ImgCrop from 'antd-img-crop'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "app/store"
import { createQueryThunk } from "@entities/slices/query-slice"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

export const QueryCreatePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { error, isLoading } = useSelector((state: RootState) => state.query)

  if(error) return <div>Возникла ошибка</div>

  return (
    <CreateLayout
      title="Создание нового запроса"
    >
      <Link style={{marginBottom: '20px', marginTop: '10px', display: 'block', color: '#0B6623'}} to='/private-office/query'>
        <ArrowLeftOutlined /> Посмотреть рекомендации
      </Link>

      <FormWrapper>
        {/* <Title>Название участка</Title> */}
        {/* <SelectField 
          label="Введите значение"
        /> */}
        <Title>Загрузите фото участка</Title>
        <Divider />
        {/* <ImgCrop rotationSlider showReset> */}
          <Upload
            customRequest={ async (options) => {
              const { file, onSuccess, onProgress, onError } = options
              try {
                await dispatch(createQueryThunk(file as File)).unwrap()
                onProgress?.({ percent: 100 })
                onSuccess?.({
                  message: message.success({ content: 'Файл успешно загружен!' }),
                })
              } catch (error) {
                onProgress?.({ percent: 100 })
                console.error(error)
                onError?.({
                  name: 'error',
                  message: 'Ошибка загрузки файла' as string
                })
              }
            }}
            disabled={isLoading}
            showUploadList={false}
          >
            <Button loading={isLoading}>
              Загрузить
            </Button>
          </Upload>
        {/* </ImgCrop> */}
      </FormWrapper>
    </CreateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 18px;
`