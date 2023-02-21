import { NextPage } from 'next'
import { wrapper } from 'store'
import { redirectIfNotLoggedIn } from 'utils/no-login-redirect'
import {
  GroupEditOrCreateForm,
  GroupEditOrCreateFormContents,
} from 'components/groups/GroupEditOrCreateForm'
import { useCallback } from 'react'
import { useAddGroup } from 'store/group/groupHooks'
import { mapEditorGroupStatusToGraphQlType } from 'utils/map-group-statuses'
import { groupDetailPage } from 'utils/urls'
import { useRouter } from 'next/router'
import { ContentLayout } from '@cloudscape-design/components'

const GroupCreate: NextPage = () => {
  const addGroup = useAddGroup()
  const router = useRouter()
  const handleOnCancel = useCallback(() => {
    router.back()
  }, [router])
  const handleOnSubmit = useCallback(
    async (data: GroupEditOrCreateFormContents) => {
      const result = await addGroup({
        group: {
          groupName: data.name,
          groupStatus: mapEditorGroupStatusToGraphQlType(data.status),
        },
      })
      await router.push(groupDetailPage(result.groupId))
    },
    [addGroup, router]
  )

  return (
    <ContentLayout>
      <GroupEditOrCreateForm
        onSubmit={handleOnSubmit}
        onCancel={handleOnCancel}
      />
    </ContentLayout>
  )
}

GroupCreate.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (ctx) => {
    const currentUser = store.getState().user.currentUser
    if (!currentUser) {
      await redirectIfNotLoggedIn(ctx)
    }
  }
)

export default GroupCreate
