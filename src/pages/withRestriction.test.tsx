import React from 'react'
import Router from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks'
import withRestriction from './withRestriction'

const DummyPageComponent = () => <div>Mocked Page</div>;

// https://bleext.com/post/how-to-test-redirections-and-history-state-with-jest
const mockedNavigation = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: jest.fn(() => mockedNavigation),
    useLocation: jest.fn(() => ({ pathname: "/foo-bar" })),
  };
});

const mockedUseAppSelector = useAppSelector as jest.Mock;
const mockedUseAppDispatch = useAppDispatch as jest.Mock;
jest.mock("@/hooks/reduxHooks");

describe("withRestriction HOC", () => {
  const renderRestrictedPage = (path: string, redirect: string) => {
    const RestrictedPage = withRestriction(DummyPageComponent);

    render(
      <Router.MemoryRouter initialEntries={[path]}>
        <Router.Routes>
          <Router.Route path={path} element={<RestrictedPage redirect={redirect} />} />
        </Router.Routes>
      </Router.MemoryRouter>
    )
  };

  let mockedDispatch = jest.fn();

  beforeEach(() => {
    mockedUseAppDispatch.mockImplementation(() => mockedDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should prevent guest from accessing restricted page and remember intended route", () => {
    mockedUseAppSelector.mockImplementation((f: Function) =>
      f({ userState: { isLoggedIn: false } })
    );

    const path = '/foo-bar';
    const redirect = '/other-page';

    renderRestrictedPage(path, redirect);
    expect(mockedDispatch).toHaveBeenCalledWith({
      payload: path,
      type: "routeSlice/setIntended",
    });
    expect(mockedNavigation).toHaveBeenCalledWith(redirect);
  });

  it("should show the page for legitimate user", () => {
    mockedUseAppSelector.mockImplementation((f: Function) =>
      f({ userState: { isLoggedIn: true } })
    );

    renderRestrictedPage("/foo-bar", '/other-page');
    expect(screen.getByText(/mocked page/i)).toBeInTheDocument();
  });
});
