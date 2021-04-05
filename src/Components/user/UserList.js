import {
  faFastBackward,
  faFastForward,
  faList,
  faStepBackward,
  faStepForward,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchUsers } from "../../services/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Card, FormControl, InputGroup, Table, Button } from "react-bootstrap";
import { Alert } from "bootstrap";
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentPage: 1,
      usersPerPage: 5,
    };
  }
  componentDidMount() {
    // this.findRandomUsers();
    this.props.fetchUser();
  }
  // findRandomUsers() {
  //   axios
  //     .get(
  //       "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole",
  //     )
  //     .then((response) => response.data)
  //     .then((data) => this.setState({ users: data }));
  // }
  changePage = (e) => {
    this.setState({
      [e.target.name]: parseInt(e.target.value),
    });
  };
  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };
  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };
  lastPage = () => {
    let usersLength = this.props.userData.users.length;
    if (
      this.state.currentPage < Math.ceil(usersLength / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(usersLength / this.state.usersPerPage),
      });
    }
  };
  nextPage = () => {
    let usersLength = this.props.userData.users.length;
    if (
      this.state.currentPage < Math.ceil(usersLength / this.state.usersPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };
  render() {
    const { currentPage, usersPerPage } = this.state;
    const lastIndex = currentPage * usersPerPage;
    const firstIndex = lastIndex - usersPerPage;
    const userData = this.props.userData;
    const users = userData.users;
    const currentUsers = users.slice(firstIndex, lastIndex);
    const totalPages = users.length / usersPerPage;

    const pageNumberCss = {
      width: "45px",
      border: "1px solid #17A2B*",
      color: "#17A2B8",
      textAlign: "center",
      fontWeight: "bold",
    };
    return (
      <div>
        {userData.error ? (
          <Alert variant="danger">{userData.error}</Alert>
        ) : (
          <Card className="boder border-dark bg-dark text-white">
            <Card.Header>
              <FontAwesomeIcon icon={faUsers} />
              User List
            </Card.Header>
            <Card.Body>
              <Table bordered hover striped variant="dark">
                <thead>
                  <tr>
                    <th>Name</th>

                    <th>Email</th>
                    <th>Address</th>
                    <th>Created</th>
                    <th>Balanced</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr align="center">
                      <td colSpan="6">{users.length} User Available.</td>
                    </tr>
                  ) : (
                    currentUsers.map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.first} {user.last}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.created}</td>
                        <td>{user.balance}</td>
                        {/* <td>
                        <ButtonGroup>
                          <Link
                            to={"/edit/" + book.id}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            onClick={this.onDelete.bind(this, book.id)}
                            size="sm"
                            variant="outline-danger"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>{" "}
                        </ButtonGroup>
                      </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
            {users.length > 0 ? (
              <Card.Footer>
                <div style={{ float: "left" }}>
                  Showing page {currentPage} of {totalPages}
                </div>
                <div style={{ float: "right" }}>
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.firstPage}
                      >
                        <FontAwesomeIcon icon={faFastBackward} /> First
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.prevPage}
                      >
                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      style={pageNumberCss}
                      className={"bg-dark"}
                      name="currentPage"
                      value={currentPage}
                      onChange={this.changePage}
                    />
                    <InputGroup.Append>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.nextPage}
                      >
                        <FontAwesomeIcon icon={faStepForward} /> Next
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.lastPage}
                      >
                        <FontAwesomeIcon icon={faFastForward} /> Last
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Card.Footer>
            ) : null}
          </Card>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserList);
