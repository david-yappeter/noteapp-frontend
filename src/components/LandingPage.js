import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, useHistory } from "react-router";
import { Container, Form, Header, Image } from "semantic-ui-react";
import { useForm, useWindow } from "../utils/hooks";
import LandingPageHeader from "./LandingPageHeader";

const LandingPage = () => {
  const windowWidth = useWindow();
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
            justifyContent: windowWidth >= 992 ? "space-between" : "center",
            alignItems: "flex-start",
          }}>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: windowWidth >= 992 ? "left" : "center",
            }}>
            <Header style={{ fontSize: "calc(1.8em + 2vw)", margin: "0" }}>
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
                {windowWidth >= 768 && (
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
                )}
                <button
                  style={{
                    borderRadius: "7px",
                    fontSize: "1.5em",
                    width: windowWidth >= 768 ? "40%" : "80%",
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
          {windowWidth >= 992 && (
            <Image
              style={{ width: "40%" }}
              src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default LandingPage;
