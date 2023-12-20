import React from "react";
import { Container } from "./styles";
import { Input } from "../Input";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
    control: Control,
    name: string;
}

export function InputForm({ control, name, ...props }: Props) {

    return (
        <Container>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Input
                        onChangeText={onChange}
                        value={value}
                        {...props}
                    />
                )}
            />
        </Container>
    )
}