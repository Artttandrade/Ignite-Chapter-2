import React from 'react'
import { Container } from './styles'
import { TextInputProps } from 'react-native'

type Props = TextInputProps

export function Input({ ...props }: Props) {
    return (
        <Container {...props} />
    )
}