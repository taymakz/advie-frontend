import type { ApiResponse } from '~/models/api/ApiResponse'

export function SubmitNewsletter(email: string): Promise<ApiResponse<null>> {
  return FetchApi('/newsletter/submit/', {
    method: 'POST',
    body: {
      email,
    },
  })
}
