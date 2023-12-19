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

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const handleTransactionTypeSelect = (type: 'up' | 'down') => {
        setTransactionType(type);
    }

    const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

    const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

    return (
        <Container>
            <Header >
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
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
                <Button title="Enviar" />
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