import React, { useCallback, useEffect, useState } from "react";
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionList, LogoutButton } from "./styles";
import { HighlighCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GestureHandlerRootView, RefreshControl } from "react-native-gesture-handler";
import TransactionsService from "../../services/transactions.service";
import TransactionDTO from "../../Interfaces/TransactionDTO";
import { categories } from "../../utils/categories";
import { useFocusEffect } from "@react-navigation/native";

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface HighlightProps {
    amount: string
}

interface HighlightData {
    entries: HighlightProps,
    expensives: HighlightProps,
    total: HighlightProps
}

export function Dashboard() {
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({
        entries: {
            amount: 'R$ 0,00'
        },
        expensives: {
            amount: 'R$ 0,00'
        },
        total: {
            amount: 'R$ 0,00'
        }
    } as HighlightData);
    const [refreshing, setRefreshing] = useState(false);


    const loadTransactions = async () => {
        try {
            setRefreshing(true);
            const response = await TransactionsService.getAllTransactions();
            handleTransactionsData(response);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    }

    const handleTransactionsData = (transactionList: TransactionDTO[]) => {
        const transactionsFormated: DataListProps[] = [];
        let totalIncome = 0;
        let totalOutcome = 0;

        transactionList.forEach((item) => {
            if (item.type === 'positive')
                totalIncome += Number(item.amount);

            if (item.type === 'negative')
                totalOutcome += Number(item.amount);

            transactionsFormated.push({
                id: item.id,
                type: item.type,
                title: item.name,
                amount: Number(item.amount).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                category: {
                    name: categories.find(e => e.key === item.category)!.name,
                    icon: categories.find(e => e.key === item.category)!.icon
                },
                date: Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.date))
            });
        });

        const total = totalIncome - totalOutcome;

        setHighlightData({
            entries: {
                amount: totalIncome.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: totalOutcome.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });

        setTransactions(transactionsFormated)
    }

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

    useEffect(() => {
        loadTransactions();
    }, [])

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://revolucaonerd.com/wordpress/wp-content/files/revolucaonerd.com/2023/03/sanji-em-one-piece.jpg' }} />
                        <User>
                            <UserGreeting>Olá, </UserGreeting>
                            <UserName>Artur</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton>
                        <Icon name="power" />
                    </LogoutButton>
                </UserWrapper>

            </Header>
            <HighlightCards>
                <HighlighCard
                    title="Entrada"
                    amount={highlightData.entries.amount}
                    lastTransaction="12321"
                    type="up"
                />
                <HighlighCard
                    title="Saída"
                    amount={highlightData.expensives.amount}
                    lastTransaction="12321"
                    type="down"
                />
                <HighlighCard
                    title="Total"
                    amount={highlightData.total.amount}
                    lastTransaction="12321"
                    type="total"
                />
            </HighlightCards>
            <Transactions>
                <Title>
                    Listagem
                </Title>
                <TransactionList
                    data={transactions}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadTransactions} />}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}