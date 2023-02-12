import { AppDispatch } from 'store/index'
import { AddGroupMutationVariables } from 'graphql/generated/client'
import { colneGraphQLSdk } from 'graphql/client'
import { groupSlice } from "store/group/groupStore";

export async function addGroup(
  dispatch: AppDispatch,
  params: AddGroupMutationVariables,
  headers?: Record<string, string>
) {
  const group = await colneGraphQLSdk.AddGroup(params, headers)
  await dispatch(
    groupSlice.actions.updateOrAddGroup({
      ...group.group.addGroup,
    })
  )
  return group.group.addGroup
}
