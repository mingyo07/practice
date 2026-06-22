const express = require('express'); //express 라우팅 객체 생성
const router = express.Router();

/*router.get("/", (req, res) => { //get방식의 /api경로로 요청이 들어오면 실행되는 라우팅 http://localhost:3000/api를 주소창에 치는 행위가 자동으로 get방식 실행
  res.send({ message: "Hello" });
}); */

router.get("/", (req, res) => { //쿼리 스트링 받기 http://localhost:3000/api?message=(변수에 저장)를 주소창에 치는 행위가 자동으로 get방식 실행
    res.setHeader("X-Timestamp", Date.now()); //응답 헤더에 X-Timestamp라는 이름으로 현재 시간을 밀리초로 저장
    let message = req.query.message; //get방식으로 들어온 요청의 query부분을 message변수에 저장
    const lang = req.headers["x-lang"]; //요청 헤더에 x-lang라는 이름으로 저장된 값을 lang변수에 저장
    if (lang === "en")
        {
            message = "message is empty";
        } else message = "메시지가 비어있습니다.";
    res.send({ message: message }); //message변수에 저장된 값을 json형식으로 응답
});

router.use(express.json()); //post방식으로 들어오는 요청의 body부분을 body변수에 저장
router.post("/", (req, res) => { 
    const body = req.body; //post방식으로 들어온 요청의 body부분을 body변수에 저장
    console.log(body); //콘솔에 body부분 출력
    res.end(); //응답 종료
});

module.exports = router; //다른 파일에서 갖고 올 수 있도록 export선언