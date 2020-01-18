import React from "react";
import { Container, Box, Button, Heading, Text, TextField } from "gestalt";
import ToastMessage from "./ToastMessage";
import { setToken } from "../utils/utils";
import Strapi from "strapi-sdk-javascript/build/main";
const apiUrl = process.env.API_URL || "http://localhost:1337";
const strapi = new Strapi(apiUrl);

class Signin extends React.Component {
  state = {
    username: "",
    password: "",
    toast: false,
    toastMessage: "",
    loading: false
  };

  handleChange = ({ event, value }) => {
    event.persist();
    this.setState({ [event.target.name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { username, password } = this.state;

    if (this.isFormEmpty(this.state)) {
      this.showToast("Fill in all fields");
      return;
    }

    // Sign up user
    try {
      this.setState({ loading: true });
      const response = await strapi.login(username, password);
      this.setState({ loading: false });
      setToken(response.jwt);
      // set loading - true
      // make request to register user with strapi
      // set loading false
      // put token ( to manage user session ) in local storage
      console.log(response);
      this.redirectUser("/");
      // redirect user to home page
    } catch (err) {
      // set loading - false
      this.setState({ loading: false });
      // show error message with toast message
      this.showToast(err.message);
    }
  };

  redirectUser = path => this.props.history.push(path);

  isFormEmpty = ({ username, password }) => {
    return !username || !password;
  };

  showToast = toastMessage => {
    this.setState({ toast: true, toastMessage });
    setTimeout(() => this.setState({ toast: false, toastMessage: "" }), 5000);
  };

  render() {
    const { toastMessage, toast, loading } = this.state;

    return (
      <Container>
        <Box
          dangerouslySetInlineStyle={{
            __style: {
              backgroundColor: "#d6a3b1"
            }
          }}
          margin={4}
          padding={4}
          shape={"rounded"}
          display={"flex"}
          justifyContent={"center"}
        >
          {/* Sign In form */}
          <form
            style={{
              display: "inlineBlock",
              textAlign: "center",
              maxWidth: 450
            }}
            onSubmit={this.handleSubmit}
          >
            <Box
              marginBottom={2}
              display={"flex"}
              direction={"column"}
              alignItems={"center"}
            >
              {/* Sign In Form Heading */}
              <Heading color={"midnight"}>Welcome back!</Heading>
            </Box>
            {/* Username Input */}
            <TextField
              id={"username"}
              type={"text"}
              name={"username"}
              placeholder={"Username"}
              onChange={this.handleChange}
            />
            {/* Password Input */}
            <TextField
              id={"password"}
              type={"password"}
              name={"password"}
              placeholder={"Password"}
              onChange={this.handleChange}
            />
            <Box marginTop={4}>
              <Button
                inline
                disabled={loading}
                color={"blue"}
                text={"Sign in"}
                type={"submit"}
              />
            </Box>
          </form>
        </Box>
        <ToastMessage show={toast} message={toastMessage} />
      </Container>
    );
  }
}

export default Signin;
