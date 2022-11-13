import { logoutPath } from 'utils/urls'
import styled from 'styled-components'
import { useCallback, useRef } from 'react'

const SkeletonForm = styled.form`
  display: none;
`

export function useLogoutForm({ csrfToken }: { csrfToken: string }) {
  const formRef = useRef<HTMLFormElement>(null)
  const logoutTrigger = useCallback(() => {
    formRef.current?.submit()
  }, [])
  return [
    <SkeletonForm method="post" action={logoutPath} ref={formRef} key={0}>
      <input type="hidden" name="_csrf" value={csrfToken} />
    </SkeletonForm>,
    logoutTrigger,
  ] as const
}
