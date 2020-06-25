import { renderHook } from '@testing-library/react-hooks';
import { useAuth, AuthProvider } from '../../hooks/auth';

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await result.current.signIn({
      email: 'johndoe@exemple.com.br',
      password: '12345678',
    });

    expect(result.current.user.email).toEqual('johndoe@exemple.com.br');
  });
});
