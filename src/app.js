require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require('./router/index');
const frontend = require('./router/frontend');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); // Cookie-parser middleware
app.set('view engine', 'ejs');// set the view engine to ejs

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BACKEND FOR LINUX&OSS PROJECT",
            version: "1.0.0",
            description: "API documentation for My Project",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
app.get("/", (req, res) => {
    res.json({
        "demo": {
            "success": true,
            "msg": "Welcome to My Project!!!"
        }
    });
});

// API routes
app.use("/api", router);

//frontend 
app.use("/", frontend);

// Start server
app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}`);
});
