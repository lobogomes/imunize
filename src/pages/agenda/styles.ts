import { Box, Button, styled } from '@ignite-ui/react'

export const Filter = styled('main', {
    maxWidth: 1152,
    margin: '$2 auto $4',
    padding: '0 $4'
})

export const Form = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'row',
    gap: '$4',
    alignContent: 'center',

    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    },

    'input::-webkit-calendar-picker-indicator': {
        filter: 'invert(100%)'
    },

    [ `> ${Button}`]: {
        marginTop: '$7',
        backgroundColor: '$black',
        width: 300
    }
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