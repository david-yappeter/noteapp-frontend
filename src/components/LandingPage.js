import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, useHistory } from "react-router";
import { Container, Form, Header, Image } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import LandingPageHeader from "./LandingPageHeader";

const LandingPage = () => {
  const [cookies] = useCookies();
  const history = useHistory();
  const initialValue = {
    email: "",
  };
  const { inputVariables, onChange, onSubmit } = useForm(initialValue, () => {
    history.push(`/signup?email=${inputVariables.email}`);
  });

  if (cookies.access_token) {
    return <Redirect to="/home" />;
  }

  return (
    <div
      style={{
        backgroundColor: "rgba(243,240,255,1)",
        height: "100vh",
        width: "100vw",
      }}>
      <LandingPageHeader />
      <Container>
        <div
          style={{
            paddingTop: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
            }}>
            <Header style={{ fontSize: "3em", margin: "0" }}>
              Wello helps teams move work forward.
            </Header>
            <Header
              as="h3"
              style={{
                margin: "20px 0 0",
                fontWeight: "400",
                wordWrap: "break-word",
              }}>
              Collaborate Your Note With Family, Friends, and Others.
              <br />
              Register Your Account Right Now, It is{" "}
              <span style={{ color: "green", textTransform: "uppercase" }}>
                Free
              </span>
            </Header>
            <Form style={{ margin: "50px 0 0 0" }} onSubmit={onSubmit}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  height: "40px",
                }}>
                <input
                  placeholder="Email"
                  style={{
                    borderRadius: "7px",
                    fontSize: "1.5em",
                    width: "55%",
                  }}
                  name="email"
                  value={inputVariables.email}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  required
                />
                <button
                  style={{
                    borderRadius: "7px",
                    fontSize: "1.5em",
                    width: "40%",
                    border: "0",
                    color: "white",
                    backgroundColor: "rgb(36,129,252)",
                  }}
                  onSubmit={onSubmit}>
                  Sign up-it's free!
                </button>
              </div>
            </Form>
          </div>
          <Image
            style={{ width: "40%" }}
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
          />
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
