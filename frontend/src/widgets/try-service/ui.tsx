import { Button } from "antd"
import { styled } from "styled-components"
import pc_with_camera from "@public/pc-with-camera.svg"
export const TryService = () => {

  return (
    <Box>
      <Block>
        <Title>
          Мониторинг и анализ сельскохозяйственных угодий
        </Title>
        <Text>
          Какая-нибудь маленькая подпись
        </Text>
        <Button type="primary" style={{borderRadius: '50px', height: '45px'}}>
          Попробовать
        </Button>
      </Block>
      <img src={pc_with_camera}/>
    </Box>
  )
}

const Box = styled.div`
  display: grid;
  grid-template-columns: 50% auto;
  border-top: 2px solid #0B6623;
  background-color: white;
  padding: 90px;
`
const Title = styled.div`
  color: #0B6623;
  font-size: 50px;
  font-weight: 600;
  margin-top: 6vh;
`
const Block = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 34vw;
`
const Text = styled.div`
  font-size: 20px;
`