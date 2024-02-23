import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import React from "react";

function Loginfb() {
  return (
    <LoginSocialFacebook
      appId="1118671732465301"
      onResolve={(response) => {
        console.log(response);
      }}
      onReject={(error) => {
        console.log(error);
      }}
    >
      <FacebookLoginButton />
    </LoginSocialFacebook>
  );
}

export default Loginfb;
