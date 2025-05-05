import { FunctionComponent } from 'react'
import { css, Global } from '@emotion/react'

export const GlobalStyle: FunctionComponent<{ nameSpace?: string }> = props => {
    return (
        <Global
            styles={css`
                ${props.nameSpace ? '.' + props.nameSpace : 'body'} {
                    margin: 0;
                }
            `}
        />
    )
}
