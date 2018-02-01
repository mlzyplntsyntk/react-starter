import * as bodyParser from "body-parser";
import * as express from "express";
import ql from './ql';
import imdb from './imdb';

let app:express.Application = express();
let db:ql = new ql(new imdb());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    next();
});

app.use((req, res, next) => {
  (async()=>{
    let result = await db.query(req.body);
    res.json(result);
  })();
});

let port = process.env.PORT || 8090

app.listen(port, (err)=>{
  if (err) {
    console.log(err);
    return;
  }
  console.log("app listening on port " + port);
});
