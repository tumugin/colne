import { AppDispatch, useCreateStoreHooks } from 'store/index'
import {
  AddGroupMutationVariables,
  AddOrUpdateGroupParamsInput,
  DeleteGroupMutationVariables,
} from 'graphql/generated/client'
import { colneGraphQLSdk } from 'graphql/client'
import { groupSlice } from 'store/group/groupStore'
import { nonNullable } from 'utils/array'

export async function addGroup(
  dispatch: AppDispatch,
  params: AddGroupMutationVariables,
  headers?: Record<string, string>
) {
  const group = await colneGraphQLSdk.AddGroup(params, headers)
  await dispatch(
    groupSlice.actions.updateOrAddGroup({
      ...group.group.addGroup,
      idols: group.group.addGroup.idols
        .filter(nonNullable)
        .map((idol) => ({ ...idol, groups: idol?.groups.filter(nonNullable) })),
    })
  )
  return group.group.addGroup
}

export function useAddGroup() {
  return useCreateStoreHooks(addGroup)
}

export async function deleteGroup(
  dispatch: AppDispatch,
  params: DeleteGroupMutationVariables,
  headers?: Record<string, string>
) {
  await colneGraphQLSdk.DeleteGroup(params, headers)
  await dispatch(groupSlice.actions.deleteGroup({ groupId: params.groupId }))
}

export function useDeleteGroup() {
  return useCreateStoreHooks(deleteGroup)
}

export async function updateGroup(
  dispatch: AppDispatch,
  groupId: string,
  params: AddOrUpdateGroupParamsInput,
  headers?: Record<string, string>
) {
  const group = await colneGraphQLSdk.EditGroup(
    { groupId: groupId, group: params },
    headers
  )
  await dispatch(
    groupSlice.actions.updateOrAddGroup({
      ...group.group.updateGroup,
      idols: group.group.updateGroup.idols
        .filter(nonNullable)
        .map((idol) => ({ ...idol, groups: idol?.groups.filter(nonNullable) })),
    })
  )
  return group.group.updateGroup
}

export function useUpdateGroup() {
  return useCreateStoreHooks(updateGroup)
}
