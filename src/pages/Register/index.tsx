import React, { useState } from "react";
import {
    Container,
    Fields,
    TransactionsTypes,
    Form,
    Header,
    Title,
} from "./styles";
import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Modal } from "react-native";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";

interface FormData {
    name: string;
    amount: string;
}

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
    } = useForm<any>();

    const handleTransactionTypeSelect = (type: 'up' | 'down') => {
        setTransactionType(type);
    }

    const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

    const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

    const handleRegister = (form: FormData) => {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data)
    };

    return (
        <Container>
            <Header >
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <InputForm
                        placeholder="Nome"
                        control={control}
                        name="name"
                    />
                    <InputForm
                        name="amount"
                        control={control}
                        placeholder="Valor"
                    />
                    <TransactionsTypes>
                        <TransactionTypeButton
                            type="up"
                            title="Income"
                            isActive={transactionType === 'up'}
                            onPress={() => handleTransactionTypeSelect('up')} />
                        <TransactionTypeButton
                            type="down"
                            title="Outcome"
                            isActive={transactionType === 'down'}
                            onPress={() => handleTransactionTypeSelect('down')} />
                    </TransactionsTypes>
                    <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
                </Fields>
                <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    );
}