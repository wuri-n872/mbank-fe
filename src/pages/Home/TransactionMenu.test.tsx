import { render, screen } from "@testing-library/react"
import TransactionMenu from "./TransactionMenu"
import { User } from "store/services/types"
import { MemoryRouter } from "react-router-dom"

const mockUser: User = {
    id: 99,
    name: 'Bambang',
    email: 'bambang@example.com',
    balance: 100,
}

const renderTransactionMenu = () => {
    render(
        <MemoryRouter>
            <TransactionMenu user={mockUser} />
        </MemoryRouter>
    )
}

describe('<TransactionMenu />', () => {
    it('render correctly', () => {
        renderTransactionMenu()

        expect(screen.getByRole('heading', { level: 2})).toHaveTextContent('Welcome Bambang')
        expect(screen.getByTestId('account-balance-info')).toHaveTextContent('$100')
    })
})