import React from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import { useRedirector } from 'hooks/useRedirector'
import withRestriction from './withRestriction'

const DummyPageComponent = () => <div>Restricted Page</div>
const RestrictedPage = withRestriction(DummyPageComponent)

const setupWithRestrictionTest = () => {
  const router = createMemoryRouter([{
    path: '/restricted-page',
    element: <RestrictedPage redirect='/public-page' />
  }, {
    path: '/public-page',
    element: <div>Public Page</div>
  }], {
    initialEntries: ['/restricted-page'],
  })

  render(<RouterProvider router={router} />)

  return router
}

const mockedUseRedirector = useRedirector as jest.Mock;
jest.mock("hooks/useRedirector")

const mockedUseAppSelector = useAppSelector as jest.Mock;
const mockedUseAppDispatch = useAppDispatch as jest.Mock;
jest.mock("hooks/reduxHooks");

describe("withRestriction HOC", () => {
  let mockedDispatch = jest.fn();

  beforeEach(() => {
    mockedUseAppDispatch.mockImplementation(() => mockedDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show the page for legitimate user", () => {
    mockedUseAppSelector.mockImplementation((f: Function) =>
      f({ userState: { isLoggedIn: true } })
    );

    setupWithRestrictionTest()
    expect(screen.getByText(/restricted page/i)).toBeInTheDocument();
  });

  it("should prevent guest from accessing restricted page and remember intended route", () => {
    mockedUseAppSelector.mockImplementation((f: Function) =>
      f({ userState: { isLoggedIn: false } })
    );
  
    setupWithRestrictionTest()
    expect(mockedDispatch).toHaveBeenCalledWith({
      payload: '/restricted-page',
      type: "routeSlice/setIntended",
    });
    expect(mockedUseRedirector).toHaveBeenCalledWith('/public-page', true);
  });
});
