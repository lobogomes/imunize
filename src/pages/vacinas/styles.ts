import { Button, styled } from '@ignite-ui/react'

export const Box = styled('main', {
    maxWidth: 1152,
    margin: '$2 auto $4',
    padding: '0 $4'
})

export const Container = styled('div', {
    maxWidth: 1152,
    margin: '$20 auto $2',
    padding: '0 $4',
    display: 'flex',
    justifyContent: 'end',

    [ `> ${Button}`]: {
        width: 200
    }
})