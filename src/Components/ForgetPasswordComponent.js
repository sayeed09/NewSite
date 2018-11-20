import React from "react";
import {
    Container,
    Row,
    Col,
    Input,
    Button,
    Fa,
    CardBody,
    Card,
    CardHeader,
    Grid
} from "mdbreact";
import * as PubSub from "pubsub-js";
import { Link } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js";
import AdminPanel from "./AdminPanel";
import loader from "./loader.gif";
var md5 = require("md5");
export default class VerifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: {},
            loader: false,
            errors: '',
            newpassword: '',
            confirmNewpassword: ''
        };
    }
    componentWillMount() {

    }
    submit(e) {
        e.preventDefault();

        if (this.state.newpassword !== this.state.confirmNewpassword) {
            this.setState({
                errors: "Passwords don't match"
            })
            return;
        }
        else {
            this.setState({
                loader: true
            });
            var urlString = new URL(window.location.href);
            var email = urlString.searchParams.get("email");
            var hash = urlString.searchParams.get("hash");
            this.state.obj["email"] = email;
            this.state.obj["hash"] = hash;
            this.state.obj["password"] = md5(this.state.newpassword);
            var that = this;
            var postData = this.state.obj;
            fetch(` https://pure-badlands-16289.herokuapp.com/api/users/check_forget_token`, {
                method: "post",
                body: JSON.stringify(postData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    that.setState({
                        loader: false
                    })
                    if (data.error === "Hash does not match") {
                        alert("Invalid Link")
                    }
                    else {
                        sessionStorage.setItem('forgetverified', true);
                        // alert("Successfully Account Created, Login to Continue");
                        that.props.history.push("/login");
                    }

                });

        }


    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        if (this.state.loader) {
            return (
                <div class="text-center">
                    <img
                        className="home-img"
                        style={{
                            height: "80px",
                            width: "100px",
                            marginTop: "300px",
                            alignItems: "center"
                        }}
                        src={loader}
                        className="img-responsive "
                    />
                </div>
            );
        }
        return (<div class="contact-body">
            <div class="row">
                <div class="col-md-3" />
                <div class="col-md-8">
                    <Container>
                        <Row>
                            <Col md="8">
                                <Card>
                                    <CardBody>
                                        <form onSubmit={this.submit.bind(this)}>
                                            <p className="h4 text-center py-4"> Set your new Password </p>
                                            <div className="grey-text">
                                                <Input
                                                    label="New password"
                                                    icon="lock"
                                                    group
                                                    type="password"
                                                    name="newpassword"
                                                    validate
                                                    required
                                                    value={this.state.newpassword}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                                <Input
                                                    label="Confirm New password"
                                                    icon="lock"
                                                    group
                                                    type="password"
                                                    name="confirmNewpassword"
                                                    validate
                                                    required
                                                    value={this.state.confirmNewpassword}
                                                    onChange={this.handleChange.bind(this)}
                                                />

                                                <span
                                                    style={{
                                                        color: "red",
                                                        fontSize: "14px",
                                                        marginLeft: "3px"
                                                    }}
                                                >
                                                    {this.state.errors}
                                                </span>
                                                <br />
                                                <Button
                                                    style={{ marginLeft: "150px" }}
                                                    color="cyan"
                                                    type="submit"
                                                >
                                                    Change
                      </Button>
                                                <br />

                                            </div>
                                        </form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>);
    }
}
