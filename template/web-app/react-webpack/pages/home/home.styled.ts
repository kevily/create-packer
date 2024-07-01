import styled, { css } from 'styled-components'

export const StyledRoot = styled.div(({ theme }) => {
    return css`
        ${theme.tools.flex('center', 'center')};
    `
})
