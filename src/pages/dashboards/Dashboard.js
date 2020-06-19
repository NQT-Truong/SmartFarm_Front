import React from "react";
import { Container, Row, Col } from "reactstrap";
import socketIOClient from "socket.io-client";
import Chart from "./Chart";
import Tables from "./Tables";
import Statistics from "./Statistics";
import StationInformation from "./StationInformation";
import moment from "moment";
import Notification from "../../components/Notification";
import ReactLoading from "react-loading";
import "./Tables.css";
const config_socket = require("../../config/config").config_socket;
const utils = require("../../utils/utils");
const api = require("./api/api");
class Crypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        L1: {
          value: null,
          RF_signal: null,
          battery: null,
        },
        STT: {
          value: null,
          RF_signal: null,
          battery: null,
        },
        T1: {
          value: null,
          RF_signal: null,
          battery: null,
        },
        H1: {
          value: null,
          RF_signal: null,
          battery: null,
        },
      },
      value_sensor: null,
      data_tables: [],
      data_charts: [],
      dataFault: {
        Fault: "00000000",
      },
      status: true,
      info: {},
      isLoaded: false,
      isLoaderAPI_EvaluationList: false,
      type: "%",
      response: false,
      socket: true,
      from_date: "",
      to_date: "",
      endpoint: config_socket.ip,
    };
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSocket = this.handleChangeSocket.bind(this);
  }
  handleChangeType(type) {
    this.setState({ type: type });
  }
  handleSearch(from, to) {
    this.setState({ from_date: from, to_date: to });
    const that = this;
    api.getDataReport(
      moment(from).format("L"),
      moment(to).format("L"),
      (err, result) => {
        if (err) {
          Notification(
            "error",
            "Error",
            err.data === undefined ? err : err.data._error_message
          );
        } else {
          let element = [];
          let data = [...result];

          data.map((values, index) => {
            let value = { ...values };
            value.time = moment(value.time).format("DD/MM/YYYY h:mm:ss");
            element.push(value);
          });
          if (data.length !== 0)
            that.setState({
              data_tables: element,
              data: result[0],
              data_charts: result,
              isLoaderAPI: true,
              dataFault: result[0],
            });
          else {
            Notification("error", "Error", "Không có dữ liệu");
            that.setState({
              data_tables: element,
              data: [],
              data_charts: result,
            });
          }
        }
      }
    );
  }
  handleChangeSocket(socket) {
    if (socket === true) {
      this.setState({ socket: true });
    } else {
      this.setState({ socket: false });
    }
  }
  UNSAFE_componentWillMount() {
    const that = this;
    api.getData("size=10", (err, result) => {
      if (err) {
        if (err.data._error_message === "Token is not valid")
          window.location.replace("/logout");
        else {
          Notification(
            "error",
            "Error",
            err.data === undefined ? err : err.data._error_message
          );
        }
      } else {
        let element = [];
        let data = [...result];
        data.map((values, index) => {
          let value = { ...values };
          value.time = moment(value.time).format("DD/MM/YYYY h:mm:ss");
          element.push(value);
        });
        if (data.length !== 0)
          that.setState({
            data_tables: element,
            data: result[0],
            data_charts: result,
            isLoaderAPI: true,
            dataFault: result[0],
          });
      }
    });
  }

  componentDidMount() {
    console.log("socket");
    const that = this;
    const { endpoint } = this.state;
    const sub_id = utils.getStationInfo().sub_id;
    const socket = socketIOClient(endpoint, {
      query: {
        token: utils.getAuthToken(),
        sub_id: 1,
      },
    });
    // socket.on("sensorDevice-1", function (value) {
    //   console.log(value);
    // });
    socket.on("error", function (err) {});
    this.setState({ info: utils.getStationInfo(), isLoaded: true });
    api.getData("size=10", (err, result) => {
      if (err) {
        if (err.data._error_message === "Token is not valid")
          window.location.replace("/logout");
        else {
          Notification(
            "error",
            "Error",
            err.data === undefined ? err : err.data._error_message
          );
        }
      } else {
        if (result.length > 0) {
          that.setState({
            time: result[0].time,
          });
        }
      }
    });
  }

  render() {
    const { time } = this.state;
    return !this.state.isLoaded ? (
      <ReactLoading className="m-auto" type="bars" color="black" />
    ) : (
      <Container fluid className="p-0">
        <div id="map" className="mb-2" style={{ height: "100px" }}>
          <a
            className="weatherwidget-io"
            href="https://forecast7.com/en/12d71108d24/dak-lak-province/"
            data-label_1="ĐẮK LẮK"
            data-icons="Climacons Animated"
            data-theme="original"
          >
            Đăk Lắk
          </a>

          {(function (d, s, id) {
            var js,
              fjs = d.getElementsByTagName(s)[0];
            if (!d.getElementById(id)) {
              js = d.createElement(s);
              js.id = id;
              js.src = "https://weatherwidget.io/js/widget.min.js";
              fjs.parentNode.insertBefore(js, fjs);
            }
          })(document, "script", "weatherwidget-io-js")}
        </div>
        <Row>
          <Col xs="12" sm="12" lg="8" md="12" xl="8" className="d-flex ">
            <Statistics
              info={this.state.info}
              data={this.state.data}
              time={this.state.time}
            />
          </Col>
          <Col xs="12" sm="12" md="12" lg="4" xl="4">
            <StationInformation data={this.state.info} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Crypto;
