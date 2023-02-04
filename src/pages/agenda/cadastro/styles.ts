import { Box, styled } from "@ignite-ui/react";

export const Container = styled('main', {
    maxWidth: 572,
    margin: '$20 auto $4',
    padding: '0 $4',

})

export const Header = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    
    justifyContent: 'space-between'

})

export const Footer = styled('div', {
    display: 'flex',
    flexDirection: 'row',
    margin: '$2 auto $2',
    justifyContent: 'end',
    width: '100%'
})


export const Form = styled(Box, {
    marginTop: '$6',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
    },

    'input::-webkit-calendar-picker-indicator': {
        filter: 'invert(100%)'
    },
})

