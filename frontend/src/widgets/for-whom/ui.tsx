import { ForWhom } from "@features/block-info/for-whom"
import { styled } from "styled-components"

export const ForWhomBlock = () => {

  return (
    <Box>
      <TitleWrapper>
        <Title>
          Для кого?
        </Title>
      </TitleWrapper>
      <Container>
        <ForWhom title={'Для сельскохозяйственных предприятий'}>
          Средние фермерские хозяйства, крупные агропромышленные комплексы - предприятия, 
          занимающиеся производством сельскохозяйственной продукции. 
          Они могут включать в себя различные виды сельскохозяйственных культур, 
          деревьев, кустарников
        </ForWhom>
        <ForWhom title={'Для агрохолдингов'}>
          Крупные аграрные компании, 
          объединяющие несколько сельскохозяйственных предприятий под единым управлением. 
          Они обычно имеют разветвленную структуру и занимаются различными направлениями
          в сельском хозяйстве
        </ForWhom>
        <ForWhom title={'Для поставщиков сельскохозяйственной техники и оборудования'}>
          Компании, занимающиеся производством и поставкой сельскохозяйственной техники, 
          оборудования, запчастей и сервисных услуг
        </ForWhom>
        <ForWhom title={'Для исследовательских институтов и университетов'}>
          Учебные заведения, для которых важно...
        </ForWhom>
      </Container>
    </Box>
  )
}

const Box = styled.div`
  border-top: 2px solid #0B6623;
  background-color: #f0f0f0;
  padding: 80px 20px 130px;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  column-gap: 1vw;
  row-gap: 15vh;
  justify-items: center;
`
const TitleWrapper = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2%;
`
const Title = styled.div`
  color: #0B6623;
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
`
