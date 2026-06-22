const express = require('express');
const session = require('express-session');
const app = express(); //서버 객체 생성
const port = 3000; //포트 번호생성

app.use(session({ //페이지가 실행될때 실행됨
    secret: 'my_secret', //대칭키 암호화방식
    resave: false, //세션데이터에 아무런 변화가 없어도 덮어쓰기 할것인가?     
    saveUninitialized: true //로그인도 안해서 데이터도 없는상태도 세션에 저장     
}));

app.get('/', (req, res) => { //url접속되었을때 페이지 이동할수있게
    res.send(`
        <h1>보안 스터디 6주차: 세션 실습</h1>
        <a href="/login">로그인 하기</a><br><br>
        <a href="/profile">내 프로필 보기 (세션 확인)</a><br><br>
        <a href="/logout">로그아웃</a>
    `);
});

app.get('/login', (req, res) => { // /login에 접속했을때
    req.session.user = { //세션 정보가 저장됨, 원래 로그인을 직접해야하지만 웹페이지에 접속하는 것만으로도 세션생성되기함
        id: 'admin',
        name: '남민교'
    };
    res.send('세션이 생성');
});

app.get('/profile', (req, res) => { //profile에 들어갔을때 세션정보를 확인하고 로그인될지 아닐지 확인 여기서는 세션이 있는지만 확인
    if (req.session.user) {
        res.send(`<h2>환영합니다, ${req.session.user.name}</h2>...`);
    } else {
        res.send('세션없음');
    }
});

app.get('/logout', (req, res) => { //로그인아웃에 들어간다면 세션삭제
    req.session.destroy((err) => {
        if(err) throw err;
        res.send('세션이 삭제');
    });
});


app.listen(port, () => {
    console.log(`포트 ${port}`);
});