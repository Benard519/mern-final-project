import { act, renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

vi.mock('../services/api', () => ({
  authApi: {
    login: vi.fn(),
    register: vi.fn(),
    update: vi.fn(),
  },
  setAuthToken: vi.fn(),
}));

describe('AuthContext', () => {
  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  it('persists user after login', async () => {
    authApi.login.mockResolvedValue({
      user: { id: '1', name: 'Tester', email: 'test@example.com' },
      token: 'abc',
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });

    expect(result.current.user.name).toBe('Tester');
    expect(result.current.authenticated).toBe(true);
  });
});

