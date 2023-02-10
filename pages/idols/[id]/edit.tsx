import {
  ErrorAwarePageProps,
  handleExceptionAndReturnErrorAwarePageProps,
} from 'utils/error-aware-page-utils'
import { NextPage } from 'next'
import { useAppSelector, wrapper } from 'store'
import { getIdol, useDeleteIdol, useUpdateIdol } from 'store/idol/idolHooks'
import { getRequestHeaderFromContext } from 'utils/headers'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import {
  IdolEditOrCreateForm,
  IdolEditOrCreateFormContents,
} from 'components/idols/IdolEditOrCreateForm'
import {
  GraphQlTypeToEditorIdolStatus,
  mapEditorIdolStatusToGraphQlType,
} from 'utils/map-idol-statuses'
import { IdolStatus } from 'graphql/generated/client'
import { Alert } from '@cloudscape-design/components'
import Error from 'next/error'
import { userCreatedIdolListPath } from 'utils/urls'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'

interface Props extends ErrorAwarePageProps {
  idolId: string
}

const IdolEdit: NextPage<Props> = (props) => {
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const idol = useAppSelector((state) => state.idol.idols[props.idolId])
  const updateIdol = useUpdateIdol()
  const handleOnEditIdol = useCallback(
    async (updatedIdolParam: IdolEditOrCreateFormContents) => {
      await updateIdol(props.idolId, {
        idolName: updatedIdolParam.name,
        idolStatus: mapEditorIdolStatusToGraphQlType(updatedIdolParam.status),
      })
      await router.push(`/idols/${props.idolId}`)
    },
    [props.idolId, router, updateIdol]
  )
  const deleteIdol = useDeleteIdol()
  const handleOnDelete = useCallback(async () => {
    await deleteIdol(props.idolId)
    await router.push(userCreatedIdolListPath)
  }, [deleteIdol, props.idolId, router])

  if (props.error) {
    return <Error statusCode={props.error.statusCode} />
  }

  if (!idol) {
    return null
  }

  if (idol.idolStatus === IdolStatus.OperationDeleted) {
    return (
      <Alert type="error">
        運営によって削除されたアイドルは編集することができません
      </Alert>
    )
  }

  return (
    <IdolEditOrCreateForm
      onSubmit={handleOnEditIdol}
      onCancel={handleOnCancel}
      initialValue={{
        name: idol.idolName,
        status: GraphQlTypeToEditorIdolStatus(idol.idolStatus),
      }}
      onDelete={handleOnDelete}
      isEdit
    />
  )
}

IdolEdit.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const currentUser = store.getState().user.currentUser
      if (!currentUser) {
        await redirectIfNotLoggedIn(ctx)
      }

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

export default IdolEdit
