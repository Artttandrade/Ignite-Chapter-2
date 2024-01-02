import React from "react";
import { Container, Header, UserWrapper, UserInfo, Photo, User, UserGreeting, UserName, Icon, HighlightCards, Transactions, Title, TransactionList, LogoutButton } from "./styles";
import { HighlighCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export interface DataListProps extends TransactionCardProps {
    id: string
}

export function Dashboard() {
    const data: DataListProps[] = [{
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site",
        amount: "R$12.000,00",
        category: {
            name: "Vendas",
            icon: "dollar-sign"
        },
        date: "12/11/2023"
    },
    {
        id: '2',
        type: 'negative',
        title: "Sushi",
        amount: "R$100,00",
        category: {
            name: "Lazer",
            icon: "coffee"
        },
        date: "12/11/2023"
    },
    {
        id: '3',
        type: 'negative',
        title: "Cinema",
        amount: "R$50,00",
        category: {
            name: "Lazer",
            icon: "shopping-bag"
        },
        date: "12/11/2023"
    }]

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
                    amount="4000"
                    lastTransaction="12321"
                    type="up"
                />
                <HighlighCard
                    title="Saída"
                    amount="4000"
                    lastTransaction="12321"
                    type="down"
                />
                <HighlighCard
                    title="Total"
                    amount="4000"
                    lastTransaction="12321"
                    type="total"
                />
            </HighlightCards>
            <Transactions>
                <Title>
                    Listagem
                </Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />
            </Transactions>
        </Container>
    )
}