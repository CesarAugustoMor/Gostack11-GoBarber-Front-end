import React from 'react';
import { render } from '@testing-library/react';
import { useHistory } from 'react-router-dom';
import SignIn from '../../pages/SignIn';

jest.mock('react-router-dom', () => {
  return {
    useHistory: jest.fn(),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('SingIn Page', () => {
  it('should be able to sign in', () => {
    const result = render(<SignIn />);

    result.debug();
  });
});
