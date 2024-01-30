import http from "http";
import app from "./app.js";


const PORT = 8000
// const PORT = process.env.PORT || 8000
const server = http.createServer(app)


 function startServer() {
    server.listen(PORT, () => {
        console.log(`listening on porttt ${PORT}`)
    })
}

startServer();



