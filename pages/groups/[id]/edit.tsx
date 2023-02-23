import {
  ErrorAwarePageProps,
  handleExceptionAndReturnErrorAwarePageProps,
} from 'utils/error-aware-page-utils'
import { NextPage } from 'next'
import { useAppSelector, wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import { Alert, ContentLayout } from '@cloudscape-design/components'
import {
  GroupEditOrCreateForm,
  GroupEditOrCreateFormContents,
} from 'components/groups/GroupEditOrCreateForm'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import {
  getGroup,
  useDeleteGroup,
  useUpdateGroup,
} from 'store/group/groupHooks'
import { getRequestHeaderFromContext } from 'utils/headers'
import Error from 'next/error'
import { GroupStatus } from 'graphql/generated/client'
import {
  GraphQlTypeToEditorGroupStatus,
  mapEditorGroupStatusToGraphQlType,
} from 'utils/map-group-statuses'
import { groupDetailPage, userCreatedGroupsListPath } from 'utils/urls'

interface Props extends ErrorAwarePageProps {
  groupId: string
}

const GroupEdit: NextPage<Props> = (props) => {
  const router = useRouter()
  const updateGroup = useUpdateGroup()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const group = useAppSelector((state) => state.group.groups[props.groupId])
  const handleOnSubmit = useCallback(
    async (data: GroupEditOrCreateFormContents) => {
      await updateGroup(props.groupId, {
        groupName: data.name,
        groupStatus: mapEditorGroupStatusToGraphQlType(data.status),
      })
      await router.push(groupDetailPage(props.groupId))
    },
    [props.groupId, updateGroup]
  )
  const deleteGroup = useDeleteGroup()
  const handleOnDelete = useCallback(async () => {
    await deleteGroup({ groupId: props.groupId })
    await router.push(userCreatedGroupsListPath)
  }, [deleteGroup, props.groupId, router])

  if (props.error) {
    return <Error statusCode={props.error.statusCode} />
  }

  if (!group) {
    return null
  }

  if (group.groupStatus === GroupStatus.OperationDeleted) {
    return (
      <Alert type="error">
        運営によって削除されたグループは編集することができません
      </Alert>
    )
  }

  return (
    <ContentLayout>
      <GroupEditOrCreateForm
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
        initialValue={{
          name: group.groupName,
          status: GraphQlTypeToEditorGroupStatus(group.groupStatus),
        }}
        onDelete={handleOnDelete}
        isEdit
      />
    </ContentLayout>
  )
}

GroupEdit.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async (ctx): Promise<Props> => {
      const currentUser = store.getState().user.currentUser
      if (!currentUser) {
        await redirectIfNotLoggedIn(ctx)
      }

      const groupId = ctx.query.id as string

      try {
        await getGroup(
          store.dispatch,
          { groupId },
          getRequestHeaderFromContext(ctx)
        )
      } catch (e) {
        return {
          ...handleExceptionAndReturnErrorAwarePageProps(e, ctx),
          groupId,
        }
      }

      return {
        groupId,
      }
    }
)

export default GroupEdit
