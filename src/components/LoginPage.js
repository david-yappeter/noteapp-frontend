import React from "react";
import { Container, Header, Image } from "semantic-ui-react";

const LoginPage = () => {
  return (
    <div>
      <Container>
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}>
          <div
            style={{
              alignSelf: "stretch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}>
            <Header style={{ fontSize: "2.7em", margin: "0" }}>
              Manage Your Work With Wello
            </Header>
            <Header as="h4" style={{ margin: "20px 0 0" }}>
              Collaborate Your Note With Family, Friends, and Others.
            </Header>
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

export default LoginPage;
