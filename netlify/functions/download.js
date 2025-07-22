// /.netlify/functions/download
const fetch = require('node-fetch');

// Modify download to use CORS proxy
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const mpdResponse = await fetch(proxyUrl + originalUrl);   

exports.handler = async (event) => {
    const url = event.queryStringParameters.url;
    
    try {
        const response = await fetch(url);
        const buffer = await response.buffer();
        
        return {
            statusCode: 200,
            body: buffer.toString('base64'),
            isBase64Encoded: true,
            headers: {
                'Content-Type': 'application/dash+xml'
            }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Download failed' })
        };
    }
};