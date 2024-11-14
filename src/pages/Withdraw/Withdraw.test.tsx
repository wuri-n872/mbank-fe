import { render, screen } from "@testing-library/react"
import Withdraw from "./Withdraw"
import { useAppSelector } from "hooks/reduxHooks"
import { renderWithProviders } from "utils/test-utils"
import { PersistState } from "redux-persist"
import userEvent from "@testing-library/user-event"
import { useWithdrawMutation } from "store/services/accountApi"

const mockedUserState = {
    isLoggedIn: true,
    user: {
        id: 1,
        name: 'Bambang',
        email: 'bambang@example.com',
        balance: 100,
        token: ''
    }
}
const renderWithdraw = () => renderWithProviders(<Withdraw />, {
    preloadedState: {
        userState: mockedUserState,
    }
})

const mockUseWithdrawMutation = useWithdrawMutation as jest.Mock
jest.mock('store/services/accountApi')

describe('<Withdraw />', () => {
    it('should shown withdraw form', () => {
        renderWithdraw()

        expect(screen.getByRole('spinbutton')).toBeInTheDocument()
        expect(screen.getByRole('button')).toHaveTextContent(/withdraw/i)
    })

    it('should decreased balance on success withdrawal', () => {
        const mockedWithdraw = jest.fn();
        mockUseWithdrawMutation.mockImplementation(() => [mockedWithdraw, {}]);
        
        renderWithdraw()

        userEvent.type(screen.getByRole('spinbutton'), '10')
        userEvent.click(screen.getByRole('button'))
    })
})