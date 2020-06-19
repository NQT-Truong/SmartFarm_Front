import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row, Col,
  Input
} from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import "./Tables.css";
import 'react-day-picker/lib/style.css';
const utils = require("../../utils/utils");

const Temperatures = [
  {
    dataField: "time",
    text: "Time",
    sort: true,
  },
  {
    dataField: "T1.value",
    text: "T1",
    sort: true,
    style: function callback(cell) {      
      const { min_temp, max_temp} = utils.getStationInfo().stage;      
      if (cell >= min_temp && cell <= max_temp ) {
        return { color: "green" };
      }
      else if (cell <= min_temp) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "T2.value",
    text: "T2",
    sort: true,
    style: function callback(cell) {      
      const { min_temp, max_temp} = utils.getStationInfo().stage;      
      if (cell >= min_temp && cell <= max_temp ) {
        return { color: "green" };
      }
      else if (cell <= min_temp) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  }
];
const Humidites = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "H1.value",
    text: "H1",
    sort: true,
    style: function callback(cell) {      
      const {min_hum, max_hum} = utils.getStationInfo().stage;      
      if (cell >= min_hum && cell <= max_hum ) {
        return { color: "green" };
      }
      else if (cell <= min_hum) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "H2.value",
    text: "H2",
    sort: true,
    style: function callback(cell) {      
      const {min_hum, max_hum} = utils.getStationInfo().stage;      
      if (cell >= min_hum && cell <= max_hum ) {
        return { color: "green" };
      }
      else if (cell <= min_hum) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  }
];
const SoilMoistures = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "SM1.value",
    text: "SM1",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM2.value",
    text: "SM2",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM3.value",
    text: "SM3",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM4.value",
    text: "SM4",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM5.value",
    text: "SM5",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM6.value",
    text: "SM6",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM7.value",
    text: "SM8",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM8.value",
    text: "SM8",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM9.value",
    text: "SM9",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM10.value",
    text: "SM10",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM11.value",
    text: "SM11",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM12.value",
    text: "SM12",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM13.value",
    text: "SM13",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM14.value",
    text: "SM14",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM15.value",
    text: "SM15",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM16.value",
    text: "SM16",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM17.value",
    text: "SM17",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM18.value",
    text: "SM18",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM19.value",
    text: "SM19",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "SM20.value",
    text: "SM20",
    sort: true,
    style: function callback(cell) {      
      const {min_soil_moisture, max_soil_moisture} = utils.getStationInfo().stage;      
      if (cell >= min_soil_moisture && max_soil_moisture) {
        return { color: "green" };
      }
      else if (cell <= min_soil_moisture) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  }
];
const PHs = [
  {
    dataField: "time",
    text: "Time",
    sort: true,
  },
  {
    dataField: "PH1.value",
    text: "PH1",
    sort: true,
    style: function callback(cell) {      
      const {min_PH, max_PH} = utils.getStationInfo().stage;      
      if (cell >= min_PH && max_PH) {
        return { color: "green" };
      }
      else if (cell <= min_PH) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "PH2.value",
    text: "PH2",
    sort: true,
    style: function callback(cell) {      
      const {min_PH, max_PH} = utils.getStationInfo().stage;      
      if (cell >= min_PH && max_PH) {
        return { color: "green" };
      }
      else if (cell <= min_PH) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  }
];
const Lights = [
  {
    dataField: "time",
    text: "Time",
    sort: true
  },
  {
    dataField: "L1.value",
    text: "L1",
    sort: true,
    style: function callback(cell) {      
      const {min_light, max_light} = utils.getStationInfo().stage;      
      if (cell >= min_light && max_light) {
        return { color: "green" };
      }
      else if (cell <= min_light) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  },
  {
    dataField: "L2.value",
    text: "L2",
    sort: true,
    style: function callback(cell) {      
      const {min_light, max_light} = utils.getStationInfo().stage;      
      if (cell >= min_light && max_light) {
        return { color: "green" };
      }
      else if (cell <= min_light) {
        return { color: "orange" };
      }
      else{
        return { color: "red" };
      }
    },
  }
];
class MyExportCSV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.onExport();
  };

  render() {
    return (
      <div>
        <button className="btn btn-success mt-2 float-right" onClick={this.handleClick.bind(this)}>
          Export
        </button>
      </div>
    );
  }
};
class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "%",
      isLoaded: false,
      data: []
    };
    this.handleChangeType = this.handleChangeType.bind(this);
  }

  handleChangeType(event) {
    this.setState({
      type: event.target.value
    })
    this.props.handleChangeType(event.target.value);
  }


  render() {
    const data = this.props.data;
    
    return (
      <Card className="Card--width">
        <ToolkitProvider
          keyField="time"
          data={data}
          columns={
            this.state.type === "%"
              ?
              Humidites
              :
              this.state.type === "℃"
                ?
                Temperatures
                :
                this.state.type === "%%"
                  ?
                  SoilMoistures
                  :
                  this.state.type === "null"
                    ?
                    Lights
                    :
                    PHs

          }

          exportCSV
        >
          {props => (
            <div>
              <CardHeader>
                <div classtime="float-right pull-right">
                  <MyExportCSV {...props.csvProps} />
                </div>
                <CardTitle tag="h5">
                  <Row>
                    <Col xs="6" className="mt-1">
                      <Input type="select" onChange={this.handleChangeType} value={this.state.type}>
                        <option value="%"  className="table__text-size">Độ ẩm không khí</option>
                        <option value="" className="table__text-size">PH</option>
                        <option value="℃"  className="table__text-size">Nhiệt độ</option>
                        <option value="%%" className="table__text-size">Độ ẩm đất</option>
                        <option value="null" className="table__text-size">Ánh sáng</option>
                      </Input>
                    </Col>
                  </Row>
                </CardTitle>
              </CardHeader>
              <CardBody className={this.state.type === "%" ? "tables" : ""}>
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  bordered={false}
                  condensed // responsive for table
                  striped
                  pagination={paginationFactory({
                    sizePerPage: 10,
                    sizePerPageList: [10, 50, 100]
                  })}
                  noDataIndication="Table is Empty"
                  hover
                  wrapperClasses="table-responsive"
                  scrollY="auto"
                />
              </CardBody>
            </div>
          )}
        </ToolkitProvider>
      </Card>
    );
  }
}


export default Tables;