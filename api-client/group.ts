import {
  AddGroupMutationVariables,
  AddOrUpdateGroupParamsInput,
  DeleteGroupMutationVariables,
} from 'graphql/generated/client'
import { createGraphQLSDK } from 'graphql/client'
import { mapAisuExceptionToColneExceptionAndThrow } from 'exceptions/graphql-exceptions'

const invalidateTag = ['cheki', 'group', 'idol']

export async function addGroup(
  params: AddGroupMutationVariables,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  const group = await sdk.AddGroup(params, headers)
  return group.group.addGroup
}

export async function deleteGroup(
  params: DeleteGroupMutationVariables,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  await sdk.DeleteGroup(params, headers)
}

export async function updateGroup(
  groupId: string,
  params: AddOrUpdateGroupParamsInput,
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  const group = await sdk.EditGroup(
    { groupId: groupId, group: params },
    headers,
  )
  return group.group.updateGroup
}

export async function getUserCreatedGroupList(
  params: { page: number },
  headers?: Headers,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  const groupsPage = await sdk.GetUserCreatedGroupList(params, headers)
  return groupsPage.currentUserGroups.getGroupsCreatedByUser
}

export async function getGroup(
  params: { groupId: string },
  headers?: Record<string, string>,
) {
  const sdk = createGraphQLSDK({
    headers,
    next: { tags: invalidateTag },
  })
  try {
    const group = await sdk.GetGroup(params, headers)
    return group.getGroup
  } catch (e) {
    mapAisuExceptionToColneExceptionAndThrow(e)
  }
}
