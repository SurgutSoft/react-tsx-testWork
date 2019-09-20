import * as React from 'react';
import { Table } from "antd";

const columns = [
    {
        title: '№',
        dataIndex: 'index',
        key: 'index',
    },
    {
        title: 'Вероятность',
        dataIndex: 'random',
        key: 'random',
    },
    {
        title: 'size (N*M)',
        dataIndex: 'size',
        key: 'size',
    },
    {
        title: 'Количество доменов в матрице',
        dataIndex: 'domainCount',
        key: 'domainCount',
    },
]

interface IProps {
    data?: any;
}

interface IState {
    count: number;
}

export default class ResultTable extends React.Component<IProps, IState> {
    defaultProps: Partial<IProps> = {
        data: [],
    };
    render() {
        return (
            <Table columns={columns} dataSource={this.props.data} />
        )
    }
}