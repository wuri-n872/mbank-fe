import { render, screen } from "@testing-library/react"
import App from "App"

describe('<App />', () => {
    it('render correctly', () => {
        render(<App />)

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('MitraBank Cardless ATM')
        expect(screen.getByRole('link')).toHaveTextContent('Login')
    })
})