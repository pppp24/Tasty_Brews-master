import React from "react";
import { Box, Text, Heading, Image, Button } from "gestalt";
import { NavLink, withRouter } from "react-router-dom";
import { getToken, clearCart, clearToken } from "../utils/utils";

class Navbar extends React.Component {
  handleSignout = () => {
    // clear token
    clearCart();
    clearToken();
    // clear cart
    // redirect home
    // to access the history prop, need to import withRouter and export withRouter(Navbar)
    this.props.history.push("/");
  };

  render() {
    return getToken() !== null ? (
      <AuthNav handleSignout={this.handleSignout} />
    ) : (
      <UnAuthNav />
    );
  }
}

const AuthNav = ({ handleSignout }) => (
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"around"}
    height={70}
    color={"midnight"}
    padding={1}
    shape={"roundedBottom"}
  >
    <NavLink activeClassName={"active"} to={"/checkout"}>
      <Text size={"md"} color={"white"}>
        Checkout
      </Text>
    </NavLink>
    <NavLink activeClassName={"active"} exact to={"/"}>
      <Box display={"flex"} alignItems={"center"}>
        <Box margin={2} width={50} height={50}>
          <Image
            src={"./icons/logo.svg"}
            alt={"Tasty Brews Logo"}
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Heading size={"xs"} color={"orange"}>
          Tasty Brews
        </Heading>
      </Box>
    </NavLink>
    <Button
      onClick={handleSignout}
      color={"transparent"}
      text={"Sign Out"}
      inline
      size={"md"}
    />
  </Box>
);

const UnAuthNav = () => (
  <Box
    display={"flex"}
    alignItems={"center"}
    justifyContent={"around"}
    height={70}
    color={"midnight"}
    padding={1}
    shape={"roundedBottom"}
  >
    <NavLink activeClassName={"active"} to={"/signin"}>
      <Text size={"md"} color={"white"}>
        Sign In
      </Text>
    </NavLink>
    <NavLink activeClassName={"active"} exact to={"/"}>
      <Box display={"flex"} alignItems={"center"}>
        <Box margin={2} width={50} height={50}>
          <Image
            src={"./icons/logo.svg"}
            alt={"Tasty Brews Logo"}
            naturalHeight={1}
            naturalWidth={1}
          />
        </Box>
        <Heading size={"xs"} color={"orange"}>
          Tasty Brews
        </Heading>
      </Box>
    </NavLink>
    <NavLink activeClassName={"active"} to={"/signup"}>
      <Text size={"md"} color={"white"}>
        Sign Up
      </Text>
    </NavLink>
  </Box>
);

export default withRouter(Navbar);
