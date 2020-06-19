import React from "react";
import socketIOClient from "socket.io-client";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import "react-sweet-progress/lib/style.css";
import { CustomImg } from "../../components/CustomTag";
import Notification from "../../components/Notification";
import moment from "moment";
import "./ControlStation.css";
import Avatar from "../../assets/img/photos/0a4fe95658af9d82802d971c805a2c1f.jpg";

const utils = require("../../utils/utils");
const { isEmpty } = require("../../utils/ValidInput");
const config_socket = require("../../config/config").config_socket;
const api = require("./api/api");

let socket;
class Controlstation extends React.Component {
  constructor(props) {
    super(props);
    this.send = this.send.bind(this);
    this.state = {
      endpoint: config_socket.ip,
      data: {
        id: JSON.parse(localStorage.getItem("project")).sub_id,
        status: "O",
      },
      last_update: new Date(),
      statusDevice: null,
      socket: true,
    };
    this.RSSI = {
      Perfect: "Tuyệt vời",
      Good: "Tốt",
      Medium: "Trung bình",
      Bad: "Yếu",
    };
    socket = socketIOClient(this.state.endpoint);
  }

  send(name, status) {
    socket.emit(name, status);
    // this.setState({ statusDevice: background });
    // this.setState({ last_update: new Date() });
  }

  setValueDevice() {
    api.getDataControl((err, result) => {
      if (err) {
        Notification(
          "error",
          "Error",
          err.data === undefined ? err : err.data._error_message
        );
      } else {
        if (!isEmpty(result)) {
          this.setState({
            relay_1: result[0].relay_1,
            relay_2: result[0].relay_2,
          });
        }
      }
    });
  }

  convertRSSI(inpRSSI) {
    if (isEmpty(inpRSSI)) return "NULL";
    try {
      return this.RSSI[inpRSSI];
    } catch (error) {
      return null;
    }
  }
  componentWillMount() {
    var preStatus = localStorage.getItem("statusDevice");
    if (this.state.statusDevice === null) {
      this.setState({
        statusDevice: preStatus,
      });
    }
  }

  componentDidMount() {
    const that = this;
    const { endpoint } = this.state;
    const sub_id = utils.getStationInfo().sub_id;
    const socket = socketIOClient(endpoint, {
      query: {
        token: utils.getAuthToken(),
        sub_id: sub_id,
      },
    });
    socket.on("statusDevice-1", (result) => {
      // console.log(result);
      this.setState({
        statusDevice: result,
      });
      localStorage.setItem("statusDevice", this.state.statusDevice);
    });
    socket.on("controller_" + sub_id, function (result) {
      if (!isEmpty(result)) {
        if (result.status === "False")
          return Notification(
            "error",
            "Đang cập nhật dữ liệu cảm biến",
            "Vui lòng đợi 5 giây và thử lại"
          );
        else {
          let state = Object.assign({}, this.state);
          if (!isEmpty(result.relay_1)) state.relay_1 = result.relay_1;
          if (!isEmpty(result.relay_2)) state.relay_2 = result.relay_2;
          that.setState(state);
        }
      }
    });
    socket.on("error", function (err) {});
    this.setValueDevice();
  }

  render() {
    let location = JSON.parse(localStorage.getItem("project")).sub_id;
    var status = parseInt(this.state.statusDevice);
    console.log(status);
    console.log(this.state.statusDevice);

    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <h1 className="text-center font-weight-bold d-inline mt-4">
              Trạm {location}
            </h1>
            <div className="float-right d-inline ">
              <h4 className="text-center font-weight-bold">
                Thời gian cập nhập:
              </h4>
              <h4>{moment().format("DD/MM/YYYY h:mm:ss a")}</h4>
            </div>
          </CardHeader>
          <CardBody>
            <Row className="d-flex justify-content-center">
              <Col xs="12" md="6" sm="12">
                <Card>
                  <h2 className="text-center">Máy thu Internet Radio</h2>
                  <CardBody>
                    <InputGroup className="my-4">
                      <InputGroupAddon addonType="prepend">
                        <Button color="primary">Tín hiệu</Button>
                      </InputGroupAddon>
                      <Input
                        className="font-weight-bold text-success"
                        style={{
                          backgroundColor:
                            this.state.statusDevice === "1" ? "#4BBF73" : "",
                        }}
                        disabled
                      />
                    </InputGroup>

                    <Row className="mt-5">
                      <Col xs="12" md="12" sm="12">
                        <center>
                          <CustomImg
                            key={utils.randomString()}
                            src={Avatar}
                            alt="button"
                            className={`m-auto img `}
                          />
                        </center>

                        <div className="d-flex justify-content-center mt-3 d-inline ">
                          <h1>
                            <Button
                              className="mr-3"
                              color="danger"
                              size="lg"
                              disabled={this.state.statusDevice === "0"}
                              onClick={() => {
                                this.send("controlDevice-1", 0);
                              }}
                            >
                              Tắt máy
                            </Button>
                          </h1>
                          <h1>
                            <Button
                              className=""
                              color="success"
                              size="lg"
                              disabled={this.state.statusDevice === "1"}
                              onClick={() => {
                                this.send("controlDevice-1", 1);
                              }}
                            >
                              Bật máy
                            </Button>
                          </h1>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default Controlstation;
