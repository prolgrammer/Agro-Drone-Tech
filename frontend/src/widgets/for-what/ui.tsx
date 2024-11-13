  import { styled } from "styled-components"
  import data_analytics from "@public/for-block-info/data-analytics.svg"
  import flexible from "@public/for-block-info/flexible.svg"
  import quality from "@public/for-block-info/quality.svg"
  import approval from "@public/for-block-info/approval.svg"
  import { ForWhat } from "@features/block-info/for-what"
  import arrow_up_left from "@public/for-block-info/arrows/up-left.svg"
  import arrow_up_right from "@public/for-block-info/arrows/up-right.svg"
  import arrow_buttom_left from "@public/for-block-info/arrows/buttom-left.svg"
  import arrow_buttom_right from "@public/for-block-info/arrows/buttom-right.svg"
  import indicator from "@public/for-block-info/our-indicators.svg"
  import { Button } from "antd"

  export const ForWhatBlock = () => {
    return (
      <Wrapper>
        <Box>
          <ForWhat src={data_analytics}>
            Анализ данных, полученных от дронов, 
            с целью выявления заболеваний, 
            дефектов и других проблем на 
            сельскохозяйственных угодьях
          </ForWhat>
          <ForWhat src={flexible}>
            Оптимизация применения удобрений 
            и пестицидов на основе информации,
            предоставленной дронами 
            для повышения урожайности 
            и снижения издержек
          </ForWhat>
          <Container>
          <ArrowLeft src={arrow_up_left} />
          <ArrowRight src={arrow_up_right} />
            <TitleWrapper>
              <Title>
                Для чего нужен сервис?
              </Title>
            </TitleWrapper>
            <ArrowLeft src={arrow_buttom_left} />
            <ArrowRight src={arrow_buttom_right} />
          </Container>
          <ForWhat src={quality}>
            Определение степени зрелости 
            урожая с помощью записи дронов 
            для более точного управления 
            сельскохозяйственным производством
          </ForWhat>
          <ForWhat src={approval}>
            Предоставление рекомендаций 
            для улучшения урожайности 
            на основе данных, 
            полученных от дронов, 
            с целью повышения эффективности 
            сельскохозяйственного производства
          </ForWhat>
        </Box>
        <BottomContent>
          <Text>
            Программное обеспечение SDT позволяет сельскохозяйственным предприятиям 
            повысить урожайность и снизить 
            издержки. С использованием 
            данных, собранных дронами, мы 
            можем достичь следующих 
            результатов...
          </Text>
          <IndicatorContent>
            <IndicatorText>
              <TitleProcent>10%</TitleProcent> увеличение урожайности
            </IndicatorText>
            <IndicatorText style={{ position: 'relative', top:'45%'}}>
              <TitleProcent>90%</TitleProcent> уменьшение применения гербицидов
            </IndicatorText>
            <IndicatorText>
              <TitleProcent>96%</TitleProcent> идентификация нежелательной растительности
            </IndicatorText>
          </IndicatorContent>
          <img src={indicator} style={{position: 'absolute', right: '0'}} />
          <More>
            <div style={{fontSize: '20px', textWrap: 'nowrap', textAlign: 'left'}}>Убедитесь на своем опыте</div>
            <Button type="primary" block style={{borderRadius: '30px', marginTop: '10%', width: '120%'}}>Узнать подробнее</Button>
          </More>
        </BottomContent>
      </Wrapper>
    )
  }

const Wrapper = styled.div`
  border-top: 2px solid #0B6623; 
  text-align: center;
  padding: 80px 40px 0 40px;
  background: linear-gradient(#84B290, white);
`
const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  column-gap: 41vw;
  row-gap: 8vh;
  justify-items: center;
`
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  justify-items: center;
  grid-column: span 2;
  text-align: center;
`
const TitleWrapper = styled.div`
  grid-column: span 2;
  align-items: center;
`
const Title = styled.div`
  color: white;
  font-size: 35px;
  font-weight: 600;
  margin-bottom: 20px;
`
const ArrowLeft = styled.img`
  margin-right: 160%;
`
const ArrowRight = styled.img`
  margin-left: 160%;
`
const Text = styled.div`
  font-weight: 400;
  font-size: 28px;
  margin-top: 40%;
  text-align: left;
`
const BottomContent = styled.div`
  display: grid;
  grid-template-columns: 48.2% auto;
  grid-template-rows: 85%;
  height: 818px;
`
const More = styled.div`
  margin-right: 70%;
`
const IndicatorContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(3, auto);
  width: min-content;
  position: relative;
  top: 55%;
  left: 50%; 
`
const TitleProcent = styled.div`
  color: #0B6623;
`
const IndicatorText = styled.div`
  font-size: 25px;
`