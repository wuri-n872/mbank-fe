import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { useAppSelector } from 'hooks/reduxHooks'
import Home from './Home'
import { MemoryRouter } from 'react-router-dom'


const mockedUseAppSelector = useAppSelector as jest.Mock
jest.mock("hooks/reduxHooks")

jest.mock("./TransactionMenu", () => () => <div data-testid="mock-transaction-menu">Menu</div>)

const renderHome = () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    )
}

describe('<Home />', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should shown login button for guest', () => {
        mockedUseAppSelector.mockImplementation((f: Function) =>
            f({ userState: { isLoggedIn: false } })
        )

        renderHome()

        expect(screen.getByText(/login/i)).toBeInTheDocument()
    })

    it('should shown logout button and transaction menu for logged-in user', () => {
        mockedUseAppSelector.mockImplementation((f: Function) =>
            f({ userState: { isLoggedIn: true } })
        )

        renderHome()

        expect(screen.getByTestId('mock-transaction-menu')).toBeInTheDocument()
        expect(screen.getByText(/log me out/i)).toBeInTheDocument()
    })
})