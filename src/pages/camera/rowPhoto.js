import React from "react";
import { Row, Col, Label,Card,CardHeader, Modal, ModalHeader, ModalBody} from "reactstrap";
import {config_public} from "../../config/config"
import "./camera.css"

class PhotoCamera extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showModal:false
        }
    }

    toggle(component){
        this.setState({
            [component]: !this.state[component]
        });
    }

    render() {
        return (
            <React.Fragment>
                <Modal className="Modal-show-camera" isOpen={this.state.showModal} toggle={this.toggle.bind(this,'showModal')}>
                    <ModalHeader toggle={this.toggle.bind(this,'showModal')}>
                        {this.props.photo.cameraId+"-"+this.props.photo.created_date}
                    </ModalHeader>
                    <ModalBody className="d-flex justify-content-center">
                        <img 
                            src={config_public.ip+this.props.photo.url} 
                            alt="photo-camera" 
                            className="RowPhoto-PhotoCamera-modal-img"
                        />
                    </ModalBody>
                </Modal>
                <Col xl="2" md="4" sm="6" xs="12" className="border border-secondary m-2 pb-1">
                    <Label className="textCenter">{this.props.photo.cameraId}</Label>
                    <img 
                        src={config_public.ip+this.props.photo.url} 
                        alt="photo-camera" 
                        className="RowPhoto-PhotoCamera-img"
                        onClick={this.toggle.bind(this,"showModal")}
                    />
                </Col>
            </React.Fragment>
        );
    }
}


class RowPhoto extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardHeader className="RowPhoto-Label-date">{this.props.photoOnday[0].created_date.split("T")[0]}</CardHeader>
                    <Row className="RowPhoto-Row px-3 py-2">
                        {
                            this.props.photoOnday.map((val,key)=>{
                                return(
                                    <PhotoCamera
                                        key={key}
                                        photo={val}
                                    />
                                )
                            })
                        }
                    </Row>
                </Card>
            </React.Fragment>
        );
    }
}

export default RowPhoto;