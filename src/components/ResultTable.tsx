import * as React from 'react';
import { Table } from "antd";

const columns = [
    {
        title: 'Вероятность',
        dataIndex: 'randomValue',
        key: 'randomValue',
    },
    {
        title: 'размер (N*M)',
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


export default class ResultTable extends React.Component<IProps> {
    defaultProps: Partial<IProps> = {
        data: [],
    };
    render() {
        return (
            <Table style={{paddingTop: 5}} columns={columns} dataSource={this.props.data} pagination={false}/>
        )
    }
}