/*eslint-disable no-magic-numbers */
import React from "react";
import { range } from "lodash";
import { VictoryScatter } from "../../src/index";
// or import from 
import VictorySelectionContainerX from "../../src/components/containers/victory-selection-container-x";
import VictorySelectionContainer from "../../src/components/containers/victory-selection-container";

// 2000 points
// 4.8 FPS --> 11.5 FPS
const scatterData = range(2000).map(() => ({ x: Math.random(), y: Math.random() }));

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      points: []
    };
  }

  handleSelection(datasets) {
    const points = datasets.reduce((memo, dataset) => {
      memo = memo.concat(dataset.data);
      return memo;
    }, []);
    this.setState({ points });
  }

  handleClearSelection() {
    this.setState({ points: [] });
  }

  listData() {
    const points = this.state.points.map((point, index) => {
      return <li key={index}>{`${point.x}, ${point.y}`}</li>;
    });

    return (
      <div>
        <p>Points</p>
        <ul>
          {points}
        </ul>
      </div>
    );
  }

  render() {
    const containerStyle = {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    };

    const chartStyle = { parent: { border: "1px solid #ccc", margin: "2%", maxWidth: "40%" } };
    const selectionStyle = { stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1 };
    return (
      <div className="demo">
        <div style={containerStyle}>
          <h1>VictorySelectionContainer</h1>
          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: { fill: (datum, active) => active ? "tomato" : "black" }
            }}
            containerComponent={
              <VictorySelectionContainer selectionStyle={selectionStyle} />
            }
            size={(datum, active) => active ? 5 : 3}
            data={scatterData}
          />
          <h1>VictorySelectionContainer Experiment</h1>
          <VictoryScatter
            style={{
              parent: chartStyle.parent,
              data: { fill: (datum, active) => active ? "tomato" : "black" }
            }}
            containerComponent={
              <VictorySelectionContainerX selectionStyle={selectionStyle} />
            }
            size={(datum, active) => active ? 5 : 3}
            data={scatterData}
          />
        </div>
      </div>
    );
  }
}

export default App;