import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
} from "reactstrap";

import { Bell, Home, Settings, User, Layout } from "react-feather";
import { CustomImg } from "../components/CustomTag";

import empty_avatar from "../assets/img/avatars/empty_avatar.png";
import "./Navbar.css";

class NavbarComponent extends React.Component {
  replacePage(page) {
    window.location.replace(page);
  }

  render() {
    const { dispatch } = this.props;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const avatar = userInfo.photo;
    const name = userInfo.full_name;
    return (
      <Navbar color="white" light expand>
        {
          <span
            className="sidebar-toggle d-flex mr-2"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <i className="hamburger align-self-center" />
          </span>
        }

        <Collapse navbar>
          <h3 className="text-center ml-auto mt-1   navbar__title d-none d-sm-block ">
            Luận văn ThS.2020-PTIT
          </h3>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar className="mr-2">
              <DropdownToggle nav>
                <Home
                  id="navbar-dashboard"
                  size={18}
                  onClick={this.replacePage.bind(this, "/dashboard")}
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target="navbar-dashboard"
                >
                  Dashboard
                </UncontrolledTooltip>
              </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="mr-2">
              <DropdownToggle nav>
                <Layout
                  id="navbar-project"
                  size={18}
                  onClick={this.replacePage.bind(this, "/systems")}
                />
                <UncontrolledTooltip placement="bottom" target="navbar-project">
                  Stations
                </UncontrolledTooltip>
              </DropdownToggle>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar className="mr-2">
              <DropdownToggle nav>
                <Bell
                  id="navbar-dashboard"
                  size={18}
                  onClick={this.replacePage.bind(this, "/dashboard")}
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target="navbar-dashboard"
                >
                  Notification
                </UncontrolledTooltip>
              </DropdownToggle>
            </UncontrolledDropdown>
            {/* <NavbarDropdown
                            header="New Notifications"
                        count={this.props.notification.length}
                        >
                            {
                                this.props.notification.map(({event_type, data, created}, key) => {
                                return (
                                    <NavbarDropdownItem
                                        key={key}
                                        event_type={event[event_type]}
                                        user={data.user.name}
                                        photo={data.user.photo}
                                        subject={data.obj===undefined ? null : data.obj.subject} // Mot so notification khong co subject
                                        project={data.project.name}
                                        time={created}
                                    />
                                );
                            })}
                        </NavbarDropdown> */}

            <UncontrolledDropdown nav inNavbar>
              <span className="d-inline-block d-sm-none">
                <DropdownToggle nav caret>
                  <Settings size={18} className="align-middle" />
                </DropdownToggle>
              </span>
              <span className="d-none d-sm-inline-block">
                <DropdownToggle nav caret>
                  <CustomImg
                    src={avatar !== null ? avatar : empty_avatar}
                    className="avatar img-fluid rounded-circle mr-1"
                    alt="Avatar"
                  />
                  <span className="text-dark">{name}</span>
                </DropdownToggle>
              </span>
              <DropdownMenu right>
                <Link to="/profile" className="text-dark">
                  <DropdownItem>
                    <User size={18} className="align-middle mr-2" />
                    Thông tin quản lý
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <Link to="#">
                  <DropdownItem>Cài đặt hệ thống</DropdownItem>
                </Link>
                <Link to="#">
                  <DropdownItem>Trợ giúp</DropdownItem>
                </Link>
                <Link to="/logout" className="text-dark">
                  <DropdownItem>Đăng xuất</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default connect((store) => ({
  app: store.app,
}))(NavbarComponent);
