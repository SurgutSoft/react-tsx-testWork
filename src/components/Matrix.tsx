import * as React from 'react';
import ResultTable from "./ResultTable";
import { InputNumber, Button } from 'antd';

export interface MatrixParams {
    backgroundColor?: String
    countX?: Number
    countY?: Number
    randomValue?: Number
    value?: String
}

export default class Matrix extends React.Component {
    state = {
        countX: 0,
        countY: 0,
        randomValue: 0,
        matrix: [],
        countDomains: 0,
        result: [],
    }

    setX = (value: number | undefined) => value && (value > 40 || value < 0) ? alert("значения должны быть в интервале от 0 до 40") :  this.setState({ countX: value })
    setY = (value: number | undefined) => value && (value > 40 || value < 0) ? alert("значения должны быть в интервале от 0 до 40") :  this.setState({ countY: value })
    setRandomValue = (value: number | undefined) => value && (value > 1 || value < 0) ? alert("значения должны быть в интервале от 0 до 1") : this.setState({ randomValue: value })

    changeValue = (evt: React.MouseEvent<HTMLDivElement>) => {
        evt.currentTarget.textContent = evt.currentTarget.textContent === "1" ? "0" : "1";
        let indexMatrix = evt.currentTarget.id.split(",");
        let tempMatrix: any = this.state.matrix;
        console.log(indexMatrix);
        tempMatrix[Number(indexMatrix[1])][Number(indexMatrix[0])].value = tempMatrix[Number(indexMatrix[1])][Number(indexMatrix[0])].value === "1" ? "0" : "1";
        this.setState({ matrix: tempMatrix });
    }

    createClearMatrix = () => {
        let tr: Array<MatrixParams> = [];
        let td = [];
        for (let i = 0; i < this.state.countY; i++) {
            for (let j = 0; j < this.state.countX; j++) {
                tr.push({ value: "", backgroundColor: "white" });
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
        let result = { randomValue: this.state.randomValue, size: this.state.countY * this.state.countX, domainCount: countDomains };
        let mainResult: Array<MatrixParams> = this.state.result;
        if (this.state.result.length < 10) {
            mainResult.push(result);
        } else {
            mainResult.shift();
            mainResult.push(result);
        }
        this.setState({ result: mainResult });
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <InputNumber placeholder="введите N от 1 до 40" min={0} max={40} onChange={this.setX} style={{width: "100%"}}/>
                    <InputNumber placeholder="введите M от 1 до 40" min={0} max={40} onChange={this.setY} style={{width: "100%"}}/>
                    <InputNumber placeholder="введите вероятность от 0 до 1" min={0} max={1} onChange={this.setRandomValue} style={{width: "100%"}} />
                    <Button onClick={this.createClearMatrix} disabled={!isSetSizeMatrix} >создать пустую матрицу</Button>
                    <Button onClick={this.createMatrix} disabled={!isSetAllParametrs} >авто заполнение матрицы</Button>
                    <Button onClick={this.checkMatrixDomens} disabled={!isSetAllParametrs}>посчитать количество доменов матрицы</Button>
                </div>
                <ResultTable data={this.state.result} />
                {matrix}
            </div>
        )
    }
}