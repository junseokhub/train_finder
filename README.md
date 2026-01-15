# TrainFinder CLI

[![GitHub Repository](https://img.shields.io/badge/GitHub-Source-black?logo=github)](https://github.com/junseokhub/train_finder)

`TrainFinder` is a **terminal-based CLI library** that allows you to search for **domestic high-speed train information in South Korea**.  
You can search for trains based on **departure station, arrival station, and date**.

---

## ⚡ Installation

```bash
npm install -g trainfinder
```

## 🚄 Train Types

> ⚠️ Only the train types listed below are accepted as valid input.

- regular
- ktx
- srt

## 🚉 Station List
```bash
trainfinder stationlist
```

## 🔍 Check Station Existence
> ⚠️ **Station names must be entered in Korean.**

```bash
trainfinder station --st <station_name>

# Example
trainfinder station --st 수서
```

## 🔎 Train Search
> Search for trains based on departure station, arrival station, and date.

| Option    | Description               | Default   |
| --------- | ------------------------- | --------  |
| `--dep`   | Departure station name    | —         |
| `--arr`   | Arrival station name      | —         |
| `--date`  | Date to search (YYYYMMDD) | Today     |
| `--train` | Train type                | ktx       |
| `--time`  | After time list (Optional)| 00 (00~24)|


```bash
trainfinder search \
  --dep <departure_station> \
  --arr <arrival_station> \
  --date <YYYYMMDD> \
  --train <train_type> \
  --time <time> (optional)
```

```bash
# Example
trainfinder search --dep 서울 --arr 오송 --date 20251212 --train ktx --time 13 (optional)
```



