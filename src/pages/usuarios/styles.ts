import { Box, Button, styled } from '@ignite-ui/react'

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

export const TableBox = styled(Box, {
    width: '100%',
    height: 630,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1152,
    margin: '$20 auto $2',
    padding: '$4 $4',
    marginTop: '$6',
    justifyContent: 'center',
    table: {
        color: 'White'
    },
})

export const ModalBox = styled(Box, {
    width: '100%',
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

})