import React from "react";


import Rickshaw from "rickshaw";


class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: "Nothing here yet",
            graphdata: "Nothing here yet, wait and reload"
        }



    }
    makeGraphData(data) {
        var graph1 = [], graph2 = [], graph3 = [];
        var i = 0;
        data.forEach((set) => {
            console.log(set);
            graph1.push({ "x": i, "y": set[0]["price"] })
            graph2.push({ "x": i, "y": set[1]["price"] })
            graph3.push({ "x": i, "y": set[2]["price"] })
            i++;
        });
        return [graph1, graph2, graph3];
    }



    componentDidUpdate() {
        var graph1 = new Rickshaw.Graph({
            element: document.querySelector('#graph1'),
            height: 100,
            width: 500,
            min: 4,
            series: [
                {
                    color: 'steelblue',
                    data: this.state.graphdata[0]
                }
            ]
        });
        var graph2 = new Rickshaw.Graph({
            element: document.querySelector('#graph2'),
            height: 150,
            width: 500,
            min: 4,
            unstack: 'true',
            series: [
                {
                    color: 'green',
                    data: this.state.graphdata[1]
                }
            ]
        });
        var graph3 = new Rickshaw.Graph({
            element: document.querySelector('#graph3'),
            height: 150,
            width: 500,
            min: 40,
            series: [
                {
                    color: 'blue',
                    data: this.state.graphdata[2]
                }
            ]
        });

        graph1.render();
        graph2.render();
        graph3.render();
    }
    componentDidMount() {

        if (localStorage.getItem("prices") != "") {
            var data = JSON.parse(localStorage.getItem("prices"));

            this.setState({ prices: JSON.parse(localStorage.getItem("prices")) })
            this.setState({ graphdata: this.makeGraphData(data) });
        }

    }


    componentWillUnmount() {

    }
    render() {
        return (
            <div className="main-content" >
                <h6>Mircosoft</h6>
                <div className="graph" id="graph1"></div>
                <h6>Apple</h6>
                <div className="graph" id="graph2"></div>
                <h6>Berkshire</h6>
                <div className="graph" id="graph3"></div>
            </div >
        )
    }
}

export default Graph;