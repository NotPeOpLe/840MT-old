# 840MT
 840月賽網頁程式
 
# 必備的東西
- Python 3.7.5 以上
- flask
- requsets
- MySQL 8.0 以上

# TO-DO
- [x] 玩家頁面
- - [x] 玩家名單
- - [x] 綜合分數
- - [x] 圖譜最佳成績/排名
- - [x] 最近遊玩紀錄
- [x] 圖譜頁面
- - [x] 圖譜排名
- - [x] diff 切換 (像官網那樣)
- - [ ] 討論/留言區
- [x] 綜合排行榜頁面
- [x] osu!Oauth登入
- [x] Discord  廣播

# 檔案結構/說明
```
│  840mt-server.bat       WebServer啟動檔
│  config.py              環境設定檔
│  impb.py                匯入圖譜程式
│  LocalAPI.py            本地API
│  main.py                Web主程式
│  mods.py                Mod處裡程式
│  OsuAPI.py              OsuAPI
│  README.md              你現在看到的檔案
│  runtime.txt            Heroku的啟動檔 不確定能不能跑 已經無維護
│  sql.py                 SQL函式
│  track_score.bat        成績追蹤啟動檔
│  track_score.py         成績追蹤程式
├─SQL                     超長的SQL檔案資料夾
│      ranking.sql          總排名SQL
│      week_ranking.sql     周排名SQL
├─static                  靜態文件資料夾
│  ├─css                    CSS
│  ├─fonts                  字體
│  ├─images                 圖片
│  └─js                     JavaScript
└─templates               網站的模板
        .DS_Store           不知道這啥
        base.html           基層模板
        beatmap.html        圖譜詳細View
        error.html          錯誤View
        index.html          首頁View
        maps.html           圖譜總覽View
        players.html        參賽玩家View
        profile.html        玩家詳細View
        ranking.html        排名View
        rule.html           規則View
```
