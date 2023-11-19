import {auth} from "express-openid-connect";
import {Express} from "express";

function configureAuth0(app: Express) {
    const authConfig = {
        authRequired: false,
        auth0Logout: true,
        secret: 'a long, randomly-generated string stored in env',
        baseURL: 'http://localhost:3000',
        clientID: 'your auth0 client id',
        issuerBaseURL: 'your auth0 issuer base url'
    };

    authConfig.secret = process.env.AUTH0_SECRET!!;
    authConfig.clientID = process.env.AUTH0_CLIENT_ID!!;
    authConfig.issuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL!!;

// auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(authConfig));

// req.isAuthenticated is provided from the auth router
    app.get('/', (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });
}

export {configureAuth0};