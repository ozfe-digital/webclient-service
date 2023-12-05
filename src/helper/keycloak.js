import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8088/",
 realm: "crmapp",
 clientId: "crmapp",
 onLoad: 'login-required',
 KeycloakResponseType: 'code'
});

export default keycloak;