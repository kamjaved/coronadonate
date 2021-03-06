const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require('path');

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean")
const hpp = require("hpp");
const compression = require("compression");
const app = express();

const userRouter = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const investmentRoutes = require('./routes/investmentRoutes')
const rationRoutes = require('./routes/rationRoutes')
const accountRoutes = require('./routes/AccountRoutes')
const upiRoutes = require('./routes/UPIRoutes')
const whatRoutes = require('./routes/whatsappRoutes')
const kitrequestRouter = require('./routes/kitRequestRoutes')
const contactusRoutes = require('./routes/contactUsRoutes')
const groceryRoutes = require("./routes/groceryRoutes");
const settingRoutes = require("./routes/settingRoutes");


const DB =
    "mongodb+srv://kamran:1234@cluster0-fvxek.mongodb.net/lockdown_beta?retryWrites=true&w=majority"; //investor_portal

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB Connected"));


// -----CORS----

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

// Initialize CORS middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


//-- Upload Setup----
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.static(path.join(__dirname, './client/public/')));


// *********************GLOBAL MIDDLEWARES*******************************

//set security http headers
app.use(helmet());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Limit request from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));


//Data sanitization against Nosql query injections
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

//Prevent Paramter Pollution
app.use(
    hpp({
        // whitelist: [
        //   "duration",
        //   "ratingsQuantity",
        //   "ratingsAverage",
        //   "maxGroupSize",
        //   "difficulty",
        //   "price"
        // ]
    })
);

app.use(compression());

//***************************/ROUTES***********************************

app.use("/api/user", userRouter);
app.use("/api/expense", expenseRoutes);
app.use('/api/investment', investmentRoutes)
app.use('/api/ration', rationRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/upi', upiRoutes)
app.use('/api/whatsgroup', whatRoutes)
app.use("/api/grocery", groceryRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/kitrequest", kitrequestRouter);
app.use("/api/contactus", contactusRoutes);




//--DOWNLOAD PDF----
// app.get("/fetch-inv", (req, res) => {
//     res.sendFile(`${__dirname}/result.pdf`);
// });


//Serve static assets in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
