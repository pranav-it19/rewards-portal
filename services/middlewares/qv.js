import axios from "axios";
import qs from "qs";
import responses from "../../utils/responses.js";

const validateToken = async (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json("Unauthorized");
    }

    try {
        const reqBody = qs.stringify({
            token: authorization,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        const response = await axios.post(`https://${process.env.REALM}.qlikverify.com/auth/realms/${process.env.REALM}/protocol/openid-connect/token/introspect`, reqBody, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            }
        });
        if (response.data.active && response.data.email) {
            req.user = {
                userEmail: response.data.email
            };
            return next();
        }

        res.status(401).json("Unauthorized");

    } catch (error) {
        console.log(error.response.data);
        res.status(500).json(responses.internalServerError);
    }
};

export default validateToken;