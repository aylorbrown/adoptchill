const strainAPIKey = "HTY3dGy";
const CLIENT_ID = `6OM0MhZp6OorwVoU9lQ8xLnvfuZeoPyDBS1ci0JftgF4Bsl7aD`;
const CLIENT_SECRET = `Yt8K9xSaHDNAgELXHYlwaPm3ScYdUNmcrOmkSzRR`;

let token;

function extractToken(payload) {
    return payload.access_token;
}

function getToken() {
    const params = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    const authURL = `https://api.petfinder.com/v2/oauth2/token`;
    return fetch(authURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params
    })
    .then(r => r.json())
    .then(extractToken)
    .then(t => token = t)
}

function requestData(URL="https://api.petfinder.com/v2/animals") {
    if (token) {
        return fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }            
        })
        .then(r => r.json())
    } else {
        console.error(`You must call getToken() first!`);
    }
}