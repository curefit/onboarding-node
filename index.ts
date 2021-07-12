const http = require('http');
const host = 'localhost';
const port = 8000;

const requestListener = (req, res) => {
    console.log("request url =" + req.url)
    switch (req.url) {
        case "/":
            if (req.method === "GET") {
                res.writeHead(200);
                res.end("My first node server!");
            } else if (req.method === "POST") {

                let body = "";
                req.on("data", function (chunk) {
                    body += chunk;
                    console.log("req post body=", body)
                });


                req.on("end", function(){
                    res.setHeader("Content-Type", "application/json");
                    res.end(body);
                });
            }
            break
        case "/welcome":
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(`{"message": "Hello World!"}`);
            break
        default:
            res.writeHead(404);
            res.end(`{"error": "Resource not found"}`);
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});