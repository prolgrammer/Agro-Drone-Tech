import { PrivateWrapper } from "@shared/private-wrapper"
import { ArchiveLayout } from "@widgets/layouts/archive-layout"
import { Carousel, Flex } from "antd"

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

export const QueryArchivePage = () => {
  return (
    <ArchiveLayout
      title="Мои запросы"
      route="/private-office/query/create"
    >
      <PrivateWrapper
        title={"Запрос"}
      >
        <Flex gap={'10%'}>
          <div style={{fontWeight: 'bold'}}>Название участка</div>
          <div>Участкок под пшеницу</div>
        </Flex>
        <div style={{fontWeight: 'bold'}}>Фото</div>
        <Carousel arrows infinite={true} autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <div style={{fontWeight: 'bold'}}>Ответ</div>
        <div>Ответ</div>
      </PrivateWrapper>
    </ArchiveLayout>
  )
}