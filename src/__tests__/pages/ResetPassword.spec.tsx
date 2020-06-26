import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: '?token=fake-token',
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/toast', () => ({
  useToast: () => ({
    addToast: mockedAddToast,
  }),
}));

describe('ResetPassowrd Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });
  it('should be able to reset password', async () => {
    apiMock.onPost('password/reset').reply(204);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText('Confirme a Senha');
    const buttonElement = getByText('Altear senha');

    fireEvent.change(passwordField, {
      target: { value: '12345678' },
    });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '12345678' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to reset password without password confirmation', async () => {
    apiMock.onPost('password/reset').reply(204);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const buttonElement = getByText('Altear senha');

    fireEvent.change(passwordField, {
      target: { value: '12345678' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error if login fails', async () => {
    apiMock.onPost('password/reset').reply(400);

    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText('Confirme a Senha');
    const buttonElement = getByText('Altear senha');

    fireEvent.change(passwordField, {
      target: { value: '12345678' },
    });
    fireEvent.change(passwordConfirmationField, {
      target: { value: '12345678' },
    });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
