import * as React from 'react';
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import ResultTable from "./ResultTable";
import { any, number } from 'prop-types';


export default class Matrix extends React.Component {
    state = {
        countX: 0,
        countY: 0,
        randomValue: 0,
        matrix: [],
        countDomains: 0,
        result: []
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

    changeValue = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.currentTarget.textContent = evt.currentTarget.textContent === "1" ? "0" : "1";
        let indexMatrix = evt.currentTarget.id.split(",");
        let tempMatrix: any = this.state.matrix;
        console.log(indexMatrix);
        tempMatrix[Number(indexMatrix[1])][Number(indexMatrix[0])].value = tempMatrix[Number(indexMatrix[1])][Number(indexMatrix[0])].value === "1" ? "0" : "1";
        this.setState({ matrix: tempMatrix });
    }

    createClearMatrix = () => {
        let tr = [];
        let td = [];
        for (let i = 0; i < this.state.countY; i++) {
            for (let j = 0; j < this.state.countX; j++) {
                tr.push({ value: "", backgroundColor: "white", domainName: "" });
            }
            td.push(tr);
            tr = [];
        }
        this.setState({ matrix: td });
    }

    createMatrix = () => {
        let tr = [];
        let td = [];

        for (let i = 0; i < this.state.countY; i++) {
            for (let j = 0; j < this.state.countX; j++) {
                let rnd = Math.random();
                tr.push({ value: rnd < this.state.randomValue ? "1" : "0", backgroundColor: "white" });
            }
            td.push(tr);
            tr = [];
        }
        this.setState({ matrix: td });
    }

    checkMatrixDomens = () => {
        const { countX, countY, matrix } = this.state;
        let tempMatrix: any = matrix;
        let countDomains: number = 0;
        for (let i = 0; i < countY; i++) {
            for (let j = 0; j < countX; j++) {
                let r = Math.floor(Math.random() * (255 - 0));
                let g = Math.floor(Math.random() * (255 - 0));
                let b = Math.floor(Math.random() * (255 - 0));

                if (j === 0 && tempMatrix[i][j].value === "1") {
                    tempMatrix[i][j].backgroundColor = `rgb(${r}, ${g}, ${b})`;
                } else { tempMatrix[i][j].backgroundColor = "white" }

                if (j > 0) {
                    if (tempMatrix[i][j].value === "1" && tempMatrix[i][j - 1].value === "1") {
                        tempMatrix[i][j].backgroundColor = tempMatrix[i][j - 1].backgroundColor;
                    } else {
                        if (tempMatrix[i][j].value === "1") {
                            tempMatrix[i][j].backgroundColor = `rgb(${r}, ${g}, ${b})`;
                        } else { tempMatrix[i][j].backgroundColor = "white" }
                    }
                }

                if (i > 0) {
                    if (tempMatrix[i][j].value === "1" && tempMatrix[i - 1][j].value === "1") {

                        if (j > 0) {
                            let rgbUpColor = tempMatrix[i - 1][j].backgroundColor;
                            let rgbLeftColor = tempMatrix[i][j - 1].backgroundColor;
                            if (tempMatrix[i][j - 1].value === "1") {
                                for (let i = 0; i < countY; i++) {
                                    for (let j = 0; j < countX; j++) {
                                        if (tempMatrix[i][j].backgroundColor === rgbLeftColor) {
                                            tempMatrix[i][j].backgroundColor = rgbUpColor;
                                        }
                                    }
                                }
                            }
                        }
                        tempMatrix[i][j].backgroundColor = tempMatrix[i - 1][j].backgroundColor;
                    }
                }
            }
        }

        countDomains = this.unique(tempMatrix);
        this.setState({ matrix: tempMatrix });
        console.log(countDomains);

        let result = { random: this.state.randomValue, size: this.state.countY * this.state.countX, domainCount: countDomains };
        let mainResult: any = this.state.result;
        if (this.state.result.length < 10) {
            mainResult.push(result)
        } else {
            mainResult.shift();
            mainResult.push(result);
        }
        this.setState({ result: mainResult })
        this.createElementMatrix();
    }

    unique = (arr: any) => {
        let count: number = 0;
        let unique: any = [];
        for (let obj of arr) {
            for (let row of obj) {
                if (!unique.includes(row.backgroundColor) && row.backgroundColor !== "white") {
                    unique.push(row.backgroundColor);
                    count++;
                }
            }
        }
        return count;
    }

    createElementMatrix = () => {
        const { matrix } = this.state;
        return (
            <div>
                {matrix.map((row: any, i: number) => (
                    <div key={i} style={{ display: "flex" }}>
                        {row.map((col: any, j: number) => (
                            <div onClick={this.changeValue} key={j} id={`${j},${i}`} style={{ backgroundColor: col.backgroundColor, width: 25, height: 25, border: "2px solid", textAlign: "center" }} >{col.value}</div>
                        ))}
                    </div>
                )
                )}
            </div>
        )
    }

    render() {
        const matrix = this.createElementMatrix();
        const { countX, countY, randomValue } = this.state;
        const isSetAllParametrs = countX > 0 && countY > 0 && randomValue > 0;
        const isSetSizeMatrix = countX > 0 && countY > 0;
        return (
            <div style={{ paddingLeft: 5, paddingTop: 5 }}>
                <div style={{ width: 300 }}>
                    <Input placeholder="введите кол. строк от 1 до 40" min={0} max={40} width={200} onChange={this.setX} />
                    <Input placeholder="введите кол. столбцов от 1 до 40" min={0} max={40} width={400} onChange={this.setY} />
                    <Input placeholder="введите вероятность заполнения от 0 до 1" min={0} max={1} width={400} onChange={this.setRandomValue} />
                    <Button onClick={this.createClearMatrix} disabled={!isSetSizeMatrix} > создать пустую матрицу </Button>
                    <Button onClick={this.createMatrix} disabled={!isSetAllParametrs} > авто заполнение матрицы </Button>
                    <Button onClick={this.checkMatrixDomens}>посчитать количество доменов матрицы</Button>
                </div>
                <ResultTable data={this.state.result} />
                {matrix}
            </div>
        )
    }
}