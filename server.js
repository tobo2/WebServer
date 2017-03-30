const
    express = require("express"),
    hbs = require("hbs"),
    fs = require("fs");

const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile("server.log", log + "\n", (err) => {
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render("maintenance.hbs",{
//         pageTitle: "Maintenance",
//         message: "Page under maintenance, we will be back soon"
//     });
// });

app.use(express.static(__dirname + "/public"));


hbs.registerHelper("currentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("toUpper", (text) => {
    return text.toUpperCase();
});

app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to the Handlebars page.",
    });
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
    });
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Unable to handle request."
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});