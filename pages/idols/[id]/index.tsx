import { NextPage } from 'next'
import { ContentLayout } from '@cloudscape-design/components'
import { getRequestHeaderFromContext } from 'utils/headers'
import { useAppSelector, wrapper } from 'store'
import { getIdol } from 'store/idol/idolHooks'
import {
  ErrorAwarePageProps,
  handleExceptionAndReturnErrorAwarePageProps,
} from 'utils/error-aware-page-utils'
import Error from 'next/error'
import { IdolDetailsView } from 'components/idols/IdolDetailsView'

interface Props extends ErrorAwarePageProps {
  idolId: string
}

const IdolDetails: NextPage<Props> = (props) => {
  const idol = useAppSelector((state) => state.idol.idols[props.idolId])

  if (props.error) {
    return <Error statusCode={props.error.statusCode} />
  }

  return (
    <ContentLayout>
      {idol && (
        <IdolDetailsView
          idol={{
            name: idol.idolName,
            id: idol.idolId,
            status: idol.idolStatus,
            groups: idol.groups.map((group) => ({
              id: group.groupId,
              name: group.groupName,
            })),
          }}
        />
      )}
    </ContentLayout>
  )
}

IdolDetails.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const idolId = ctx.query.id as string

      try {
        await getIdol(
          store.dispatch,
          { idolId },
          getRequestHeaderFromContext(ctx)
        )
      } catch (e) {
        return {
          ...handleExceptionAndReturnErrorAwarePageProps(e, ctx),
          idolId,
        }
      }
      return { idolId }
    }
)

export default IdolDetails
