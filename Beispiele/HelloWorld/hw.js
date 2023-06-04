import { createServer } from "http";
var server;

server = createServer(function(req, res) {
    res.writeHeader(200, {
        "Content-Type": "text/plain"
    });
    res.end("Hello World!");
    console.log("HTTP response sent");
});
server.listen(3000);
console.log("Server listening on port 3000");