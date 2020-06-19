import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getPhoto} from './api/cameraPhoto';
import {convertDate} from '../../utils/utils';
import {isEmpty} from '../../utils/ValidInput';
import { Row, Label, FormGroup, Button, Container} from "reactstrap";
import Notification from "../../components/Notification";
import RowPhoto from "./rowPhoto";

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromdate: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
            todate: new Date(),
            photoData: [],
        }
    }


    handleGetPhoto(){
        getPhoto(
            {
                fromdate: convertDate(this.state.fromdate),
                todate:   convertDate(this.state.todate)
            },
            (err,result)=>{
                if(err){
                    Notification(
                        "error",
                        "Error",
                        err.data === undefined ? err : err.status + " " + err.data._error_message,
                    );
                }
                else{
                    this.setState({'photoData': result})
                }
            }
        )
    }

    componentDidMount(){
        this.handleGetPhoto();
    }

    render() {
        return (
            <React.Fragment>
                <Row className='justify-content-center m-0'>
                    <FormGroup className='mb-3'>
                        <Label className="d-block">Tìm kiếm từ ngày</Label>
                        <DatePicker
                            isClearable
                            showPopperArrow={false}
                            selected={this.state.fromdate}
                            onChange={date =>this.setState({fromdate: date})}
                            dateFormat="dd-MM-yyyy"
                        />
                    </FormGroup>
                    <FormGroup className='mb-3 ml-3'>
                        <Label className="d-block">Tìm đến ngày</Label>
                        <DatePicker
                            isClearable
                            showPopperArrow={false}
                            selected={this.state.todate===null ? new Date(new Date().getTime() - 24 * 60 * 60 * 1000) : this.state.todate}
                            onChange={date => this.setState({todate: date})}
                            dateFormat="dd-MM-yyyy"
                        />
                    </FormGroup>
                    <div className='mt-4 p-1 pl-3 d-inline'>
                        <Button color='primary' onClick={this.handleGetPhoto.bind(this)}>
                            Tìm kiếm
                        </Button>
                    </div>
                </Row>

                <Container>
                    {
                        this.state.photoData.length!==0
                        ?
                        this.state.photoData.map((val,key)=>{
                            console.log(key);
                            return(
                                <RowPhoto
                                    key={key}
                                    photoOnday={val}
                                />
                            )
                        })
                        : <h3 className="mt-5 text-center">Không có ảnh thu thập được</h3>
                    }
                </Container>
            </React.Fragment>
        );
    }
}

export default Camera;
