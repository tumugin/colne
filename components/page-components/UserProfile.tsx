'use client'

import { useRouter } from 'next/navigation'
import { ContentLayout } from '@cloudscape-design/components'
import {
  UpdateUserNameForm,
  UpdateUserNameFormContents,
} from 'components/user/UpdateUserNameForm'
import { CurrentUser, updateUserName } from 'api-client/user'
import { useCallback } from 'react'

export function UserProfile({ currentUser }: { currentUser: CurrentUser }) {
  const router = useRouter()
  const handleUpdateUserNameOnSubmit = useCallback(
    async (data: UpdateUserNameFormContents) => {
      await updateUserName(data.userName)
      router.refresh()
    },
    [router],
  )

  return (
    <ContentLayout>
      <UpdateUserNameForm
        initialValue={{ userName: currentUser.userName }}
        onSubmit={handleUpdateUserNameOnSubmit}
      />
    </ContentLayout>
  )
}
