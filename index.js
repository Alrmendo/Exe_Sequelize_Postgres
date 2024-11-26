const express = require('express')
const app = express()
const port = 3000
const expressHbs = require("express-handlebars")
const { createPagination } = require("express-handlebars-paginate")

//cau hinh thu muc web tinh
app.use(express.static(__dirname + "/html"))

//cau hinh su dung view template
app.engine(
    'hbs',
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
        helpers: {
            createPagination,
            formatDate: (date) => {
                return new Date(date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            }
        }
    })
)
app.set("view engine", "hbs")

//routes
//index: / ,  /blogs
//details: /blogs/:id
app.get("/", (req, res) => res.redirect("/blogs"))
app.use("/blogs", require("./routes/blogRouter"))

// app.get("/", (req, res) => res.render('index'))
// app.get("/details.html", (req, res) => res.render('details'))
app.listen(port, () => console.log(`examples app listening on port ${port}!`)) 