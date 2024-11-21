import { InputField } from "@shared/inputs"
import { ArchiveLayout } from "@widgets/layouts/archive-layout"
import { FormWrapper } from "@shared/form-wrapper"

export const AreaArchivePage = () => {
  return (
    <ArchiveLayout 
      title="Мои участки" 
      route="/private-office/area/create"
    >
      <FormWrapper
        title={"Участок под пшеницу"}
      >
        <InputField 
          label="Название"
        />
        <InputField 
          label="Расположение"
        />
        <InputField 
          label="Тип почвы"
        />
        <InputField 
          label="Посаженные культуры"
        />
      </FormWrapper>

      <FormWrapper 
        title={"Новый пустой участок"}
      >
        <InputField 
          label="Название"
        />
        <InputField 
          label="Расположение"
        />
        <InputField 
          label="Тип почвы"
        />
        <InputField 
          label="Посаженные культуры"
        />
      </FormWrapper>

      <FormWrapper 
        title={"Поле"}
      >
        <InputField 
          label="Название"
        />
        <InputField 
          label="Расположение"
        />
        <InputField 
          label="Тип почвы"
        />
        <InputField 
          label="Посаженные культуры"
        />
      </FormWrapper>
    </ArchiveLayout>
  )
}
