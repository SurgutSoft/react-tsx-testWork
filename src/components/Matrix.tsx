import * as React from 'react';
import Input from "antd/lib/input";
import Button from "antd/lib/button";


export default class Matrix extends React.Component {

    state = {
        countX: 0,
        countY: 0,
        randomValue: 0,
        matrix: [],
    }

    setX = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(evt.target.value) > 40 || Number(evt.target.value) < 0) {
            alert("значения должны быть в интервале от 0 до 40");
            return;
        }
        this.setState({ countX: evt.target.value })
    }

    setY = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(evt.target.value) > 40 || Number(evt.target.value) < 0) {
            alert("значения должны быть в интервале от 0 до 40");
            return;
        }
        this.setState({ countY: evt.target.value })
    }

    setRandomValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (Number(evt.target.value) > 1 || Number(evt.target.value) < 0) {
            alert("значения должны быть в интервале от 0 до 1");
            return;
        }
        this.setState({ randomValue: evt.target.value })
    }

    changeValue = (evt: React.MouseEvent<HTMLTableDataCellElement>) => {
        evt.currentTarget.textContent = evt.currentTarget.textContent === "1" ? "0" : "1";
    }

    createMatrix = () => {
        //let matrix = [];
        let td = [];
        let tr = [];

        if (this.state.countX && this.state.countY && this.state.randomValue) {
            for (let i = 0; i < this.state.countY; i++) {
                for (let j = 0; j < this.state.countX; j++) {
                    let rnd = Math.random();
                    td.push(
                        <td key={j} style={{ width: 25, height: 25, border: "1px solid #666", textAlign: "center" }} onClick={this.changeValue} >{rnd < this.state.randomValue ? "1" : "0"}</td>
                    )
                }
                tr.push(
                    <tr key={i} style={{ width: 25, height: 25 }}>
                        {td}
                    </tr>
                )
                td = [];
            }
        }

        this.setState({ matrix: tr })
        //matrix.push(tr);
    }

    checkMatrix = () => {
        console.log("123");
    }

    render() {
        return (
            <div>
                <div style={{ width: 300, paddingLeft: 5 }}>
                    <Input placeholder="введите кол. строк от 1 до 40" min={0} max={40} width={200} onChange={this.setX} />
                    <Input placeholder="введите кол. столбцов от 1 до 40" min={0} max={40} width={400} onChange={this.setY} />
                    <Input placeholder="введите вероятность заполнения от 0 до 1" min={0} max={1} width={400} onChange={this.setRandomValue} />
                    <Button onClick={this.createMatrix}>построить матрицу </Button>
                    <Button onClick={this.checkMatrix}>посчитать количество доменов матрицы</Button>
                </div>
                {this.state.matrix}
            </div>
        )
    }
}