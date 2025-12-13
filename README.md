# TrainFinder CLI

`TrainFinder`는 한국의 **국내 기차 정보**를 조회할 수 있는 **터미널용 CLI 라이브러리**입니다.  
출발역/도착역과 날짜 기반으로 기차 조회를 할 수 있습니다.

---

## ⚡ 설치

```bash
npm install -g trainfinder
```

## 기차 종류
ktx, 새마을호, 무궁화호, 누리로, ktx산천1, itx새마을, itx청춘, ktx산천2, ktx이음, srt, itx마음, ktx청룡

## 기차 조회

출발역, 도착역, 날짜를 기반으로 기차 조회

```bash
trainfinder search --from <출발역코드> --to <도착역코드> --date <YYYYMMDD> --train <열차종류>
```

```bash
# 예시
trainfinder search --from 11 --to 22 --date 20251212 --train ktx
```


- 옵션 설명
--from : 출발역 코드

--to : 도착역 코드

--date : 조회할 날짜 (기본값: 오늘 날짜)

--train : 열차 종류 (기본값: ktx)

