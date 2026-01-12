# TrainFinder CLI

`TrainFinder`는 한국의 **국내 기차(고속선 KTX, SRT) 정보**를 조회할 수 있는 **터미널용 CLI 라이브러리**입니다.  
출발역/도착역과 날짜 기반으로 기차 조회를 할 수 있습니다.

---

## ⚡ 설치

```bash
npm install -g trainfinder
```

## 기차 종류 조회
ktx, ktx산천A, ktx산천B, ktx이음, srt, ktx청룡

```bash
trainfinder trainlist
```

## 기차역 조회
```bash
trainfinder stationlist
```

## 기차역 존재 유무 조회
```bash
trainfinder station --st <역이름>

# 예시
trainfinder station --st 수서
```

## 기차 조회

출발역, 도착역, 날짜를 기반으로 기차 조회

- 옵션 설명
--dep : 출발역 코드

--arr : 도착역 코드

--date : 조회할 날짜 (기본값: 오늘 날짜)

--train : 열차 종류 (기본값: ktx)


```bash
trainfinder search --dep <출발역 이름> --arr <도착역 이름> --date <YYYYMMDD> --train <열차종류>
```

```bash
# 예시
trainfinder search --dep 서울 --arr 오송 --date 20251212 --train ktx
```



