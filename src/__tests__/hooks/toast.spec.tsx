import { renderHook, act } from '@testing-library/react-hooks';

import { wait } from '@testing-library/react';
import { useToast, ToastProvider } from '../../hooks/toast';

describe('Toast hook', () => {
  it('should be able to show a Toast', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useToast(), {
      wrapper: ToastProvider,
    });

    act(() => {
      result.current.addToast({
        title: 'test-toast',
      });
    });

    expect(
      wait(async () => {
        await waitForNextUpdate();
      }),
    );
  });
});
