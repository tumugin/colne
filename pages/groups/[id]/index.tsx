import { ErrorAwarePageProps } from 'utils/error-aware-page-utils'
import { NextPage } from 'next'
import { wrapper } from 'store'

interface Props extends ErrorAwarePageProps {
  idolId: string
}

const GroupDetails: NextPage<Props> = (props) => {
  // TODO
  return <></>
}

GroupDetails.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const idolId = ctx.query.id as string

      return {
        idolId,
      }
    }
)

export default GroupDetails
