import { QueryDTO } from "@entities/QueryService/QueryCreate";
import { getQueryResponseThunk } from "@entities/slices/query-slice";
import { FormWrapper } from "@shared/form-wrapper";
import { ArchiveLayout } from "@widgets/layouts/archive-layout";
import { Spin, Typography, Card } from "antd";
import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const { Title, Paragraph } = Typography

export const QueryArchivePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, query, error } = useSelector((state: RootState) => state.query)

  useEffect(() => {
    dispatch(getQueryResponseThunk('1')).unwrap()
  }, [dispatch])

  if (error) return <div>Возникла ошибка</div>

  return (
    <ArchiveLayout title="Мои запросы" route="/private-office/query/create">
      <br />
      <FormWrapper title="Рекомендации и классификации болезней растений">
        {isLoading ? (
          <Spin />
        ) : (
          query && (
            <>
              {query.disease_class && (
                <div>
                  <Title level={4}>Класс болезни</Title>
                  <Paragraph>{query.disease_class}</Paragraph>
                </div>
              )}
              {query.disease_description && (
                <div>
                  <Title level={4}>Описание болезни</Title>
                  <Paragraph>{query.disease_description}</Paragraph>
                </div>
              )}
              {query.general_recommendation && (
                <div>
                  <Title level={4}>Общие рекомендации</Title>
                  <Paragraph>{query.general_recommendation}</Paragraph>
                </div>
              )}
              {query.soil_specific_recommendation && (
                <div>
                  <Title level={4}>Рекомендации по почве</Title>
                  <Paragraph>{query.soil_specific_recommendation}</Paragraph>
                </div>
              )}
            </>
          )
        )}
      </FormWrapper>
    </ArchiveLayout>
  )
}
