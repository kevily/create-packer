import { render, screen } from '@testing-library/react'
import Popup from './popup.container'

describe('HelloWorld', () => {
    it('should renders a msg', () => {
        // arrange
        render(<Popup />)

        // act
        const title = screen.getByTestId('title')

        // assert
        expect(title).toHaveTextContent(/Hello React!/i)
    })
})
