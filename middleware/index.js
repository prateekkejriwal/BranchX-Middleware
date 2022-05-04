require('dotenv').config()
const ExpressApp = require('express');
const app = ExpressApp();
const db = require('./libs/database')
const bodyparser = require('body-parser')
const router = require('./routes')
const helmet = require('helmet');
app.use(bodyparser.json())
app.use(helmet({
    contentSecurityPolicy: false
  }));
app.use(router)
app.use(ExpressApp.static('./static'))
app.listen(8080, () => {
    db.init().then(() => {
        console.log("hello ji")
    }).catch((x) => { console.log("db init failed. stopping service"); console.log(x); process.exit(1) })
})