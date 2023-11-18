import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8088/auth/",
 realm: "crm-management-app",
 clientId: "crm-auth",
});

export default keycloak;