import React, { useEffect, useState } from "react";
import {
    Container,
    Fields,
    TransactionsTypes,
    Form,
    Header,
    Title,
} from "./styles";
import { Button } from "../../components/Forms/Button";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import TransactionsService from "../../services/transactions.service";
import uuid from 'react-native-uuid';
import { useNavigation } from "@react-navigation/native";

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório')
});

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });
    const [transactionType, setTransactionType] = useState<'' | 'positive' | 'negative'>('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<any>({
        resolver: yupResolver(schema)
    });

    const handleTransactionTypeSelect = (type: 'positive' | 'negative') => {
        setTransactionType(type);
    }

    const handleOpenSelectCategoryModal = () => setCategoryModalOpen(true);

    const handleCloseSelectCategoryModal = () => setCategoryModalOpen(false);

    const handleRegister = async (form: FormData) => {
        try {
            if (!transactionType) return Alert.alert('Selecione o tipo de transação');
            if (category.key === 'category') return Alert.alert('Selecione a categoria')

            const data = {
                id: String(uuid.v4()),
                name: form.name,
                amount: form.amount,
                type: transactionType,
                category: category.key,
                date: new Date(),
            };

            await TransactionsService.addTransaction(data);

            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria'
            });

            navigation.navigate('Listagem' as never);
        } catch (error) {
            console.log(error)
            Alert.alert("Não foi possível salvar")
        }
    };

    useEffect(() => {
        async function load() {
            const data = await TransactionsService.getAllTransactions();
            // await TransactionsService.removeAll();
        }

        load();
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header >
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message?.toString()}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message?.toString()}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Income"
                                isActive={transactionType === 'positive'}
                                onPress={() => handleTransactionTypeSelect('positive')} />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                isActive={transactionType === 'negative'}
                                onPress={() => handleTransactionTypeSelect('negative')} />
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
        </TouchableWithoutFeedback>
    );
}