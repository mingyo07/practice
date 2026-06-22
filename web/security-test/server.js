const express = require("express");
const api = require("./routes/api");

const app = express();
const port = 3000;

app.use(express.static("public")); //정적 라우팅
app.use("/api", api); //불러온 라우팅 객체를 api경로에 연결

app.get("/", (req, res, next) => {
  res.send("Top Page");
});
//서버시작
app.listen(port, () => {
  console.log(`Sever is running on http://localhost:${port}`);
});

