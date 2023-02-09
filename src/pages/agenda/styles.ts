import { Box, Button, Checkbox, styled, TextInput } from '@ignite-ui/react'
import { Paper } from '@mui/material'

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
    justifyContent: 'flex-end',
    label: {
        display: 'flex',
        flexDirection: 'column',
        gap: '$2',
        [ `> ${TextInput}`]: {
            backgroundColor: '$black',
            width: 200
        },
    },

    div: {
        display: 'flex',
        flexDirection: 'row',
        gap: '$2',
        alignItems: 'end',
        [ `> ${Checkbox}`]: {
            backgroundColor: '$black',
    
        }
    },

    [ `> ${Button}`]: {
        marginTop: '$7',
        backgroundColor: '$black',
        width: 200
    },


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
    width: 300,
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    div: {
        display: 'flex',
        flexDirection: 'row',
        gap: '$2',
        alignItems: 'end',
        [ `> ${Checkbox}`]: {
            backgroundColor: '$black',
    
        }
    },


})
