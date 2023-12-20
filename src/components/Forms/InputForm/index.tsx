import React from "react";
import { Container, Error } from "./styles";
import { Input } from "../Input";
import { Control, Controller } from "react-hook-form";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
    control: Control,
    name: string;
    error: string | undefined;
}

export function InputForm({ control, name, error, ...props }: Props) {

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
            {error && <Error>{error}</Error>}
        </Container>
    )
}