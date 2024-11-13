import { ForWhomBlock } from "@widgets/for-whom/ui"
import { SiteLayout } from "@widgets/layouts/site-layout"
import { ForWhatBlock } from "@widgets/for-what/ui"
import { TryService } from "@widgets/try-service/ui"

export const HomePage = () => {

  return (
    <SiteLayout>
      <TryService />
      <ForWhatBlock />
      <ForWhomBlock />
    </SiteLayout>
  )
}
