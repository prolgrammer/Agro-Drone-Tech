import { InboxOutlined } from "@ant-design/icons"
import { SelectField } from "@shared/inputs"
import { PrivateWrapper } from "@shared/private-wrapper"
import { CreateLayout } from "@widgets/layouts/create-layout"
import { message, Upload, UploadProps } from "antd"
import styled from "styled-components"
const { Dragger } = Upload

export const QueryCreatePage = () => {
  
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  }

  return (
    <CreateLayout
      title="Создание нового запроса"
    >
      <PrivateWrapper
        buttonText="Создать"
      >
        <Title>Название участка</Title>
        <SelectField 
          label="Введите значение"
        />
        <Title>Добавить фото</Title>
        <Dragger
          {...props}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
      </PrivateWrapper>
    </CreateLayout>
  )
}

const Title = styled.div`
  color: #0B6623;
  font-size: 18px;
`