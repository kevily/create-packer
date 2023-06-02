import { render, screen } from '@testing-library/react'
import Content from './content.container'

describe('HelloWorld', () => {
    it('should renders a msg', () => {
        // arrange
        render(<Content />)

        // act
        const title = screen.getByTestId('title')

        // assert
        expect(title).toHaveTextContent(/Hello React!/i)
    })
})
