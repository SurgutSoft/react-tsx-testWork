import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { fetchDataChart } from '../redux/actions/ChartAction'
import Spin from 'antd/lib/spin';
import "antd/lib/spin/style/css";

const options = {
    tooltips:
    {
        mode: 'nearest',
        intersect: false,
    }
}

interface IProps {
    dataChart?: [];
    isLoading?: boolean;
    fetchData?: any;
}


class Chart extends React.Component<IProps> {


    componentDidMount() {
        this.props.fetchData()
    }

    render() {
        return (
            <>
                <div className="chart-display">
                    <h2>testWorkForIBS</h2>
                    {this.props.isLoading ? <Spin size="large" /> : <Line data={this.props.dataChart} options={options} />}
                </div>
            </>
        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        dataChart: state.chartData,
        isErrored: state.isErrored,
        isLoading: state.isLoading,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchData: () => dispatch(fetchDataChart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart)