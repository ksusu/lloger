
view at online markdown viewer
http://markdownlivepreview.com/
or
https://jbt.github.io/markdown-editor/

Life Logger Service
===================

사용자의 일거수일투족을 기록해주는 서비스

Features - Abstraction
----------------------

* 사용자는 'llogger'라는 프로그램을 이용해서 서비스를 사용
* 'llogger'는 nodejs 프로그램으로 매 실행시 단일한 이벤트를 실행
* 서버는 'llogger'와 통신하여 이벤트 처리
* http 또는 https 프로토콜로 통신
* 악의적인 사용자로부터의 공격 방어

사용례
------

서버 프로그램이 서버에서 실행중이이라 하자.
(ip: 123.231.132.213, port: 1234)
```
$ nodejs server.js
server is listening on port 1234...
```

기록강박증에 걸린 최성수씨는 자신의 모든 생활을 기록해두길 좋아한다. 매일 일기를 써 왔지만 어젯밤 잠결에 오븐에 넣고 500C에서 3시간동안 구워버린김에 오늘부턴 전자서비스를 이용하기로 했다. 인터넷에 검색해보니 llogger가 평판이 해서 일단 컴퓨터에 설치해 뒀다. 먼저 사용자 등록을 한다.

```bash
$ llogger register HolyWater P@SSWO4D!!
connecting to server 123.231.132.213:1234...
successfully registered
Hello HolyWater!
```

다음날부터 최성수씨는 부지런하게 서비스를 이용한다. 아침에 일어나자마자 익숙하지 않은 컴퓨터 앞에 앉아 기상시간을 기록한다. 아침부터 멋진 커맨드라인 환경으로 하루를 시작하니 잠이 확 달아난다.
```bash
$ lloger i wakeup
connecting to server 123.231.132.213:1234...
you woke up at 8:30 AM on 2018/03/16
Good morning!
```

서버에서는 그것을 기록한다.
```bash
$ nodejs server.js
server is listening on port 1234...
the user JeongHo woke up at 8:30AM on 2018/03/16, recording...
```

멍청한 개발자가 러시아 페인트공 알고리즘이라도 쓴 건지 느려터진 프로그램이 실행되는 동안 샤워를 막 끝내고 나온 최성수씨는 밥을 먹으러 가기 전에 다시 한번 프로그램을 실행한다.
```bash
$ lloger i meal
connecting to server 123.231.132.213:1234...
you had a meal at 9:00 AM on 2018/03/16
Have a good breakfast!
```

서버는 그것을 또 기록한다.
```bash
$ nodejs server.js
server is listening on port 1234...
the user JeongHo woke up at 8:30AM on 2018/03/16, recording...
the user JeongHo had a meal at 9:00 AM on 2018/03/16, recording...
```

최성수씨는 매일매일 일과의 여러부분 (밥, 업무, 게임, 수면 등)을 'llogger'를 이용해 직접 기록해둔다. 그리고 일하는 틈틈히 시간이 날 때마다 1시간 단위로 변하는 생활의 통계를 줄기차게 확인한다.
```bash
$ lloger average wakeup 2018/02/01 .. 2018/03/01
connecting to server 123.231.132.213:1234...
from 2018/02/01 to 2018/03/01, you have woke up at 9:00 AM in average
$ lloger aggregate work 2018/03/11 .. today
connecting to server 123.231.132.213:1234...
from 2018/03/11 to 2018/03/16, you have done 65.4 hours of work
```

하지만 안타깝게도 최성수씨와의 만남은 여기까지다. 회사에서 지원하는 정기 카운슬링에서 llogger가 최성수씨의 강박정신병 완화를 방해하고 있다는 경고를 들었기 때문이다. 최성수씨는 눈물을 머금고 지금까지 쌓아온 기록들과 작별인사를 한다.
```bash
$ logger deregister
connecting to server 123.231.132.213:1234...
successfully deregistered
Good bye HolyWater!
```

Specification
-------------

```
llogger COMMAND [COM_ARGS]
```

llogger는 커맨드라인 프로그램으로 위와 같은 형식으로 호출된다. 첫 번째 인수는 항상 `COMMAND`로 해석되며 뒤따르는 인수는 모두 해당 커맨드의 변수[1]로 해석된다. 사용자는 항상 오타 없이 유효한 인수를 입력한다고 가정한다.

llogger가 지원하는 커맨드는 다음과 같다.

 * `register`

 사용자를 등록한다. 첫 번째 변수는 사용자 아이디, 두 번째 변수는 사용자 비밀번호이다.
 사용자를 서버에 성공적으로 등록했으면 유저 컴퓨터의 홈 디렉터리에 `.llogger`라는 파일을 만들고 로그인 관련 정보를 저장한다.
 (e.g. C:\Users\HolyWater\.llogger)
 이는 매번 사용자가 프로그램을 실행할 때마다 로그인할 필요가 없도록 하기 위함이다.
 register를 제외한 모든 커맨드는 이 `.llogger`파일을 읽어서 로그인 정보를 습득한다. 만약 `.llogger`가 없다면 오류를 내야 한다.

 _technical note: `.llogger`에 어떤 정보를 어떤 형식으로 저장할 것인지는 자유다. 다만, 해킹으로 이 파일이 유출되더라도 비밀번호를 알아낼 수 없도록 해야한다._

 _more note: `.llogger`는 일종의 로그인 캐쉬같은 거지만 `llogger`에서 `register`외에 로그인할 수 있는 명령이 없기때문에 지우면 서비스를 사용할 수가 없다_

 * `deregister`

 사용자 등록을 철회한다. 변수는 사용하지 않는다.
 서버에서 현재 사용자 관련 정보를 전부 지우고 `.llogger`파일도 삭제한다.

 * `i`

 llogger의 가장 기본적인 기능, 일과를 기록한다.
 첫 번째 변수를 일과의 이름으로 해석하고 나머지 인수는 무시한다.
 예를 들어 `$ llogger i work`는 서버에 `work`라는 일과를 현재 날짜, 시간으로 기록한다.

 * `average`

 집계 함수. 일과 시작시간의 평균을 구한다. 형식은 다음과 같다.
 ```
 $ llogger average TASK DATE_FROM .. DATE_TO
 ```
 `DATE_FROM` 날짜에서부터 `DATE_TO` 날짜까지 `TASK`라는 일과가 시작한 시간의 평균을 구한다.
 하루에 같은 `TASK`가 여러개 있으면 시간이 가장 이른것만 사용한다.
 `DATE_FROM`과 `DATE_TO`는 `YYYY/MM/DD`형식으로 표기된다.
 
 * `aggregate`

 집계 함수. 일과의 지속시간 도합을 구한다. 형식은 `average` 커맨드와 같다.
 어떤 `TASK`의 지속시간은 `TASK`의 시작시간부터 다음 일과의 시작시간까지이다.
 하루에 같은 일과가 여러개 있으면 각각의 지속시간으로 모두 더한다.


[1] 커맨드라인 인수와 llogger 커맨드 인수를 구분하기 위해 후자를 '변수'라고 지칭한다.

Malicious User
--------------

llogger와 서버 프로그램은 악의적 사용자의 공격에 방어해야 한다.

악의적 사용자는 다음의 정보를 알고 있다고 가정한다.

 1. llogger와 서버 프로그램의 전체 소스코드
 1. 본인 소유 계정과 계정의 아이디와 비밀번호
 1. 다른 사용자의 아이디
 1. 서버의 아이피주소, 포트번호


개발자는 악의적 사용자의 다음과같은 시도를 막아야 한다. 

 1. 다른 사용자의 사칭
 1. 다른 사용자의 (부분적인) 일과 열람
 1. llogger가 지원하지 않는 방식으로 데이터를 임의 수정 (e.g. 일부 기록 삭제 등)
 1. 같은 ip로 10개 이상의 계정 생성
 1. 서버의 서비스 중지 (D-DOS류 제외)







