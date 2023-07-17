import { render, screen } from '@testing-library/react'
import Home from './home'

describe('HelloWorld', () => {
    it('should renders a msg', () => {
        // arrange
        render(<Home />)

        // act
        const title = screen.getByTestId('title')

        // assert
        expect(title).toHaveTextContent(/Hello React!/i)
    })
})
