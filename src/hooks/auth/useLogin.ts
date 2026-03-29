import { useMutation } from '@tanstack/react-query'
import { authService } from '../../services/auth.service';
import { api } from '../../lib/api';

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),

    onSuccess: (data) => {
      // Save token globally
      api.setToken(data.access_token)
    },
  })
}