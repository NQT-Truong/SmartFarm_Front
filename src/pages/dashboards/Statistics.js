import React from "react";
import {
  Col,
  Card,
  CardBody,
  CardHeader,
  Row,
  Media,
  UncontrolledPopover,
  PopoverHeader,
} from "reactstrap";
import { Slack, TrendingUp, Zap } from "react-feather";
import "./Db.css";
import "./DomCssTable.css";
import socketIOClient from "socket.io-client";
import Light from "../../assets/img/photos/light.png";
import Radio from "../../assets/img/photos/0a4fe95658af9d82802d971c805a2c1f.jpg";
import Humidity from "../../assets/img/photos/h.png";
import Temperature from "../../assets/img/photos/temperature.png";
const config_socket = require("../../config/config").config_socket;
const utils = require("../../utils/utils");
class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

      L: null,
      // RF_signal: null,
      // battery: null,

      STT1: null,
      // RF_signal: null,
      // battery: null,

      T: null,
      // RF_signal: null,
      // battery: null,

      H: null,
      // RF_signal: null,
      // battery: null,
      statusDevice: null,
    };
  }

  ConvertHum(data) {
    if (
      data >= this.props.info.stage.min_hum &&
      data < this.props.info.stage.max_hum
    ) {
      return "medium_sensor float-right d-inline";
    } else if (data < this.props.info.stage.min_hum) {
      return "low_sensor float-right d-inline";
    } else {
      return "high_sensor float-right d-inline";
    }
  }

  componentWillMount() {
    var preStatus = localStorage.getItem("statusDevice");
    if (this.state.statusDevice === null) {
      this.setState({
        statusDevice: preStatus,
      });
    }
    var preL = localStorage.getItem("Light");
    if (this.state.L === null) {
      this.setState({
        L: preL,
      });
    }
    var preH = localStorage.getItem("Huni");
    if (this.state.H === null) {
      this.setState({
        H: preH,
      });
    }
    var preT = localStorage.getItem("Temp");
    if (this.state.statusDevice === null) {
      this.setState({
        T: preT,
      });
    }

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, {
      query: {
        token: utils.getAuthToken(),
        sub_id: 1,
      },
    });
    socket.on("sensorDevice-1", (value) => {
      let Light = value.Light;
      let Temp = value.Temp;
      let Humi = value.Humi;
      this.setState({
        L: Light,
        H: Humi,
        T: Temp,
      });
    });
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint, {
      query: {
        token: utils.getAuthToken(),
        sub_id: 1,
      },
    });
    socket.on("sensorDevice-1", (value) => {
      let Light = value.Light;
      let Temp = value.Temp;
      let Humi = value.Humi;
      let Station = value.Station;
      this.setState({
        L: Light,
        STT1: Station,
        H: Humi,
        T: Temp,
      });
      localStorage.setItem("Light", this.state.L);
      localStorage.setItem("Temp", this.state.T);
      localStorage.setItem("Humi", this.state.H);
    });
  }
  ConvertSTT(data) {
    if (
      data >= this.props.info.stage.min_PH &&
      data < this.props.info.stage.max_PH
    ) {
      return "medium_sensor float-right";
    } else if (data < this.props.info.stage.min_PH) {
      return "low_sensor float-right";
    } else {
      return "high_sensor float-right";
    }
  }

  ConvertL(data) {
    if (
      data >= this.props.info.stage.min_light &&
      data < this.props.info.stage.max_light
    ) {
      return "medium_sensor float-right";
    } else if (data < this.props.info.stage.max_light) {
      return "low_sensor float-right";
    } else {
      return "high_sensor float-right";
    }
  }

  ConvertT(data) {
    if (
      data >= this.props.info.stage.min_temp &&
      data < this.props.info.stage.max_temp
    ) {
      return "medium_sensor float-right";
    } else if (data < this.props.info.stage.min_temp) {
      return "low_sensor float-right";
    } else {
      return "high_sensor float-right";
    }
  }

  ConvertSM(data) {
    if (
      data >= this.props.info.stage.min_soil_moisture &&
      data < this.props.info.stage.max_soil_moisture
    ) {
      return "medium_sensor float-right";
    } else if (data < this.props.info.stage.min_soil_moisture) {
      return "low_sensor float-right";
    } else {
      return "high_sensor float-right ";
    }
  }

  // ConvertStatus(data) {
  //   console.log(data);

  //   if (data === "RẤT TỐT") {
  //     return "text-success d-inline";
  //   } else if (data === "TỐT") {
  //     return "text-success d-inline";
  //   } else if (data === "YẾU") {
  //     return "text-ư d-inline";
  //   } else if (data === "RẤT YẾU") {
  //     return "text-success d-inline";
  //   }
  // }

  render() {
    const { L1, STT, T1, H1 } = this.props.data;
    const { L, T, H } = this.state;
    // console.log(this.state.L, this.state.STT, this.state.H, this.state.T);

    return (
      <div className="w-100">
        <Row>
          <Col>
            <Card className="flex-fill ">
              <CardHeader className=" border border-primary px-2 !important">
                <h3 className="text-center mr-3 font-weight-bold">
                  Trạng thái cảm biến
                </h3>
                <Row>
                  <Col sm="3">
                    <Card className="flex-fill">
                      <CardHeader className=" border border-primary px-2 !important">
                        <div className="float-right">
                          <img
                            src={Light}
                            width={50}
                            height={50}
                            alt="sensor"
                          />
                        </div>
                        <h4 className="card-title mb-0 font-weight-bolder text__head--item">
                          Ánh sáng
                        </h4>
                        <div className="badge badge-primary text-center ml-2">
                          Lux
                        </div>
                      </CardHeader>
                      <CardBody className=" border border-primary">
                        <Media>
                          <div className="d-inline-block mr-1">
                            <h4 className="font-weight-light ">
                              <TrendingUp
                                className="feather-md text-primary mb-1 mr-1"
                                color={L1.value === null ? "#7c7c80" : "green"}
                                id="L1"
                              />
                              L: {L}
                            </h4>
                          </div>
                          <Media body>
                            <UncontrolledPopover
                              placement="left"
                              target="L1"
                              trigger="hover"
                              style={{ width: "150px" }}
                            >
                              <PopoverHeader>Thông tin cảm biến</PopoverHeader>
                              {/* <PopoverBody>
                                Tín hiệu truyền:
                                <h6
                                  className={this.ConvertStatus(L1.RF_signal)}
                                >
                                  {" "}
                                  {L1.RF_signal === null ? null : L1.RF_signal}
                                </h6>
                                <br />
                                Dung lượng pin:
                                <h6 className="text-success d-inline">
                                  {" "}
                                  {L1.battery === null
                                    ? null
                                    : L1.battery + "%"}{" "}
                                </h6>
                              </PopoverBody> */}
                            </UncontrolledPopover>
                            <h4 className={this.ConvertL(L1.value)}>
                              {L1.value}
                            </h4>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col sm="3">
                    <Card className="flex-fill">
                      <CardHeader className="border border-primary px-2 !important">
                        <div className="float-right">
                          <img
                            src={Radio}
                            width={50}
                            height={50}
                            alt="sensor"
                          />
                        </div>
                        <h4 className="card-title mb-0 font-weight-bolder text__head--item">
                          Trạng thái hoạt động
                        </h4>
                      </CardHeader>
                      <CardBody className="border border-primary">
                        <Media>
                          <div className="d-inline-block mr-1">
                            <h4 className="font-weight-light ">
                              <Slack
                                className="feather-md mb-1 mr-1"
                                color={STT.value === null ? "#7c7c80" : "green"}
                                id="STT"
                              />
                              STT:{" "}
                              {this.state.statusDevice === "1" ? "Bật" : "Tắt"}
                            </h4>
                          </div>
                          <Media body>
                            <UncontrolledPopover
                              placement="left"
                              target="STT"
                              trigger="hover"
                              style={{ width: "150px" }}
                            >
                              <PopoverHeader>Thông tin cảm biến</PopoverHeader>
                              {/* <PopoverBody>
                                Tín hiệu truyền:
                                <h6
                                  className={this.ConvertStatus(STT.RF_signal)}
                                >
                                  {" "}
                                  {L1.RF_signal === null ? null : STT.RF_signal}
                                </h6>
                                <br />
                                Dung lượng pin:
                                <h6 className="text-success d-inline">
                                  {" "}
                                  {STT.battery === null
                                    ? null
                                    : STT.battery + "%"}{" "}
                                </h6>
                              </PopoverBody> */}
                            </UncontrolledPopover>
                            <h4 className={this.ConvertSTT(STT.value)}>
                              {STT.value}
                            </h4>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col sm="3">
                    <Card className="flex-fill ">
                      <CardHeader className="border border-primary px-2 !important">
                        <div className="float-right">
                          <img
                            src={Temperature}
                            width={50}
                            height={50}
                            alt="sensor"
                          />
                        </div>
                        <h4 className="card-title mb-0 font-weight-bolder text__head--item">
                          Nhiệt độ
                        </h4>
                        <div className="badge badge-primary text-center ml-2">
                          ℃
                        </div>
                      </CardHeader>
                      <CardBody className="border border-primary">
                        <Media>
                          <div className="d-inline-block mr-1">
                            <h4 className="font-weight-light ">
                              <Slack
                                className="feather-md mb-1 mr-1"
                                color={T1.value === null ? "#7c7c80" : "green"}
                                id="T1"
                              />
                              T: {T}
                            </h4>
                          </div>
                          <Media body>
                            <UncontrolledPopover
                              placement="left"
                              target="T1"
                              trigger="hover"
                              style={{ width: "150px" }}
                            >
                              <PopoverHeader>Thông tin cảm biến</PopoverHeader>
                              {/* <PopoverBody>
                                Tín hiệu truyền:
                                <h6
                                  className={this.ConvertStatus(T1.RF_signal)}
                                >
                                  {" "}
                                  {T1.RF_signal === null ? null : T1.RF_signal}
                                </h6>
                                <br />
                                Dung lượng pin:
                                <h6 className="text-success d-inline">
                                  {" "}
                                  {T1.battery === null
                                    ? null
                                    : T1.battery + "%"}{" "}
                                </h6>
                              </PopoverBody> */}
                            </UncontrolledPopover>
                            <h4 className={this.ConvertT(T1.value)}>
                              {T1.value}
                            </h4>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col sm="3">
                    <Card className="flex-fill card--border">
                      <CardHeader className="border border-primary px-2 !important">
                        <div className="float-right">
                          <img
                            src={Humidity}
                            width={50}
                            height={50}
                            alt="sensor"
                          />
                        </div>
                        <h4 className="card-title mb-0 font-weight-bolder text__head--item">
                          Độ ẩm
                        </h4>
                        <div className="badge badge-success ml-4">%</div>
                      </CardHeader>
                      <CardBody className="border border-primary">
                        <Media>
                          <div className="d-inline-block mr-1">
                            <h4 className="font-weight-light 1">
                              <Zap
                                className="feather-md text-primary mb-1 mr-1"
                                color={H1.value === null ? "#7c7c80" : "green"}
                                id="HZ"
                              />
                              H: {H}
                            </h4>
                          </div>
                          <Media body>
                            <UncontrolledPopover
                              placement="left"
                              target="HZ"
                              trigger="hover"
                              style={{ width: "150px" }}
                            >
                              <PopoverHeader>Thông tin cảm biến</PopoverHeader>
                              {/* <PopoverBody>
                                Tín hiệu truyền:
                                <h6
                                  className={this.ConvertStatus(H1.RF_signal)}
                                >
                                  {" "}
                                  {H1.RF_signal === null ? null : H1.RF_signal}
                                </h6>
                                <br />
                                Dung lượng pin:
                                <h6 className="text-success d-inline">
                                  {" "}
                                  {H1.battery === null
                                    ? null
                                    : H1.battery + "%"}{" "}
                                </h6>
                              </PopoverBody> */}
                            </UncontrolledPopover>
                            <h4 className={this.ConvertHum(H1.value)}>
                              {H1.value}
                            </h4>
                          </Media>
                        </Media>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Statistics;
