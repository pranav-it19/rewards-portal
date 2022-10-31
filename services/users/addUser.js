import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";
import axios  from "axios";
import qs from "qs";

const addUser = async (req, res) => {
    // console.log(userList)
   const userList= await getUserFromAzure()
    // addUsertoDb(res, userList.data.value);
    const tokenResponse = await getTokenfromQv();
    console.log(tokenResponse.data.access_token);
    addUsertoDb(res, userList.data.value);
    // dumpUsersToQv(res, userList.data.value, tokenResponse.data.access_token);
    
}

const addUsertoDb = (res, userList) => {
   
    userList.map(async (e) => {
          try {
            if (!e.mail.includes("@kobil")) {
              await Prisma.users.create({
                data: {
                  email: e.mail,
                  name: e.displayName,
                  dob: new Date().toISOString(),
                  doj: new Date().toISOString(),
                },
              });
            }
          } catch (error) {
            console.log("database error" + error);
          }
    });
    if (res) {
        res.send("added data");
    }return 
   
    
}

const dumpUsersToQv = (res, userList,accesstoken) => {
     try {
         userList.map(async (e) => {
           console.log('adding user')
         if (!e.mail.includes("@kobil")) {
                 var data = JSON.stringify({
                     username: e.displayName,
                     email: e.mail,
                     enabled: true,
                     attributes: {},
                 });

                 var config = {
                     method: "post",
                     url: "https://rewards-portal.qlikverify.com/auth/admin/realms/rewards-portal/users",
                     headers: {
                         "Content-Type": "application/json",
                         Authorization:
                             `Bearer ${accesstoken}`,
                     },
                     data: data,
                 };

             axios(config)
               .then((mess) => console.log(mess.data))
               .catch((err) =>
                 console.log(`User name:${e.displayName} - ${JSON.stringify(err.response.data)}`)
               );
            
         }
       });
       res.send("added data to qv");
     } catch (error) {
       console.log("qv dumper" + error);
     }
    
}

const getTokenfromQv = async () => {
    var data = qs.stringify({
      username: "julian.s@grootan.com",
      password: "admin",
      grant_type: "password",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    var config = {
      method: "post",
      url: "https://rewards-portal.qlikverify.com/auth/realms/rewards-portal/protocol/openid-connect/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
   return await axios(config);
}

const getUserFromAzure =async (res) => {
    try {
        var data = qs.stringify({
            grant_type: "client_credentials",
            client_id: "f17376f6-faca-49d6-8963-2cb6bacc26b3",
            client_secret: "xrJ8Q~O-fQSHcp3~hO4pGbC4fSTxL7YUq5U-sdzj",
            scope: "https://graph.microsoft.com/.default",
        });
        var config = {
            method: "get",
            url: "https://login.microsoftonline.com/cec3ef9f-e978-4510-8939-303993de60fa/OAuth2/V2.0/token",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Cookie:
                    "fpc=AsYSXUo5xexDpcoxc3ihxCJWUjDCAQAAALPdm9oOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd",
            },
            data: data,
        };

        const azToken = await axios(config)
        // console.log(azToken.data.access_token)
        return fetchUsers(res, azToken.data.access_token);
    } catch (e)
    {   console.log(e)
        res.status(500).json(responses.internalServerError)
    }
    
}

const fetchUsers = async (res,access_token) => {
    try {
        var config = {
            method: "get",
            url: "https://graph.microsoft.com/v1.0/cec3ef9f-e978-4510-8939-303993de60fa/users",
            headers: {
                Authorization:
                    `Bearer ${access_token}`,
            },
        };
        
        const respone = await axios(config)
        console.log(respone)
        return respone
    }
    catch (e)
    {
        console.log(e)
        res.status(500).json(responses.internalServerError)
    }

}

export default addUser;