WITH ranking_scores AS (
	SELECT s.*
	FROM scores AS s
	INNER JOIN (SELECT user_id, beatmap_id, MAX(score) AS maxscore FROM scores GROUP BY beatmap_id, user_id) AS m 
	ON (s.user_id = m.user_id AND s.beatmap_id = m.beatmap_id AND s.score = m.maxscore)
    WHERE s.date >= '2020-07-01' AND s.date <= '2020-07-09'
),
bast_accs AS (
	SELECT s.user_id, SUM(s.accuracy) / (SELECT beatmaps FROM count) AS accuracy
	FROM scores AS s
	INNER JOIN (SELECT user_id, beatmap_id, MAX(accuracy) AS maxacc FROM scores GROUP BY beatmap_id, user_id) AS m 
	ON (s.user_id = m.user_id AND s.beatmap_id = m.beatmap_id AND s.accuracy = m.maxacc)
    WHERE s.date >= '2020-07-01' AND s.date <= '2020-07-09'
    GROUP BY s.user_id
),
rank_count AS (
    SELECT r.user_id, SUM(r.score) AS score,
		SUM(CASE WHEN (r.rank = 'X' OR r.rank = 'XH') THEN 1 ELSE 0 END) AS SS,
        SUM(CASE WHEN (r.rank = 'S' OR r.rank = 'SH') THEN 1 ELSE 0 END) AS S,
        SUM(CASE WHEN (r.rank = 'A') THEN 1 ELSE 0 END) AS A
    FROM ranking_scores AS r
    GROUP BY r.user_id
),
week_ranking AS (
SELECT u.username,
	u.user_id,
    u.country_code AS country,
    a.accuracy AS achievement_rate,
    AVG(s.accuracy) AS accuracy,
    COUNT(s.score) AS play_count,
    SUM(s.score) AS total_score,
    r.score AS rank_score,
    r.SS,
    r.S,
    r.A
FROM scores AS s
INNER JOIN users AS u ON u.user_id = s.user_id
INNER JOIN rank_count AS r ON r.user_id = s.user_id
INNER JOIN bast_accs AS a ON a.user_id = s.user_id
WHERE s.date >= '2020-07-01' AND s.date <= '2020-07-09'
GROUP BY s.user_id
)
SELECT rank() OVER (ORDER BY {2} desc) AS 'rank', week_ranking.* FROM week_ranking