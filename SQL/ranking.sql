 with `d0` AS (
SELECT  `a`.`USER_ID`                        AS `USER_ID`
       ,(SUM(`a`.`MAXACC`) / `c`.`beatmaps`) AS `ACHIEVEMENT_RATE`
FROM 
((
	SELECT  `scores`.`user_id`       AS `USER_ID`
	       ,`scores`.`beatmap_id`    AS `BEATMAP_ID`
	       ,MAX(`scores`.`accuracy`) AS `MAXACC`
	FROM `scores`
	GROUP BY  `scores`.`user_id`
	         ,`scores`.`beatmap_id`) `a`
	JOIN `count` `c`
)
GROUP BY  `a`.`USER_ID`)
         ,`d1` AS (
SELECT  `b`.`user_id`                                            AS `USER_ID`
       ,SUM(`b`.`score`)                                         AS `RANKING_SCORE`
       ,SUM(if(((`b`.`rank` = 'X') or (`b`.`rank` = 'XH')),1,0)) AS `SS`
       ,SUM(if(((`b`.`rank` = 'S') or (`b`.`rank` = 'SH')),1,0)) AS `S`
       ,SUM(if((`b`.`rank` = 'A'),1,0))                          AS `A`
FROM 
((
	SELECT  `scores`.`user_id`    AS `USER_ID`
	       ,`scores`.`beatmap_id` AS `BEATMAP_ID`
	       ,MAX(`scores`.`score`) AS `MAXSCORE`
	FROM `scores`
	GROUP BY  `scores`.`user_id`
	         ,`scores`.`beatmap_id`) `a`
	JOIN `scores` `b` on
	(((`b`.`user_id` = `a`.`USER_ID`) AND (`b`.`beatmap_id` = `a`.`BEATMAP_ID`) AND (`b`.`score` = `a`.`MAXSCORE`))
	)
)
GROUP BY  `b`.`user_id`)
         ,`d2` AS (
SELECT  `b`.`user_id`        AS `USER_ID`
       ,COUNT(`b`.`user_id`) AS `NO1_COINT`
FROM 
((
	SELECT  `scores`.`beatmap_id` AS `BEATMAP_ID`
	       ,MAX(`scores`.`score`) AS `SCORE`
	FROM `scores`
	GROUP BY  `scores`.`beatmap_id`) `a`
	JOIN `scores` `b` on
	(((`b`.`beatmap_id` = `a`.`BEATMAP_ID`) AND (`b`.`score` = `a`.`SCORE`))
	)
)
GROUP BY  `b`.`user_id`)
SELECT  `u`.`username`               AS `USERNAME`
       ,`u`.`user_id`                AS `USER_ID`
       ,`u`.`country_code`           AS `COUNTRY_CODE`
       ,`d0`.`ACHIEVEMENT_RATE`      AS `ACHIEVEMENT_RATE`
       ,AVG(`s`.`accuracy`)          AS `ACCURACY`
       ,COUNT(`s`.`score`)           AS `PLAY_COUNT`
       ,SUM(`s`.`score`)             AS `TOTAL_SCORE`
       ,`d1`.`RANKING_SCORE`         AS `RANKING_SCORE`
       ,`d1`.`SS`                    AS `SS`
       ,`d1`.`S`                     AS `S`
       ,`d1`.`A`                     AS `A`
       ,`u`.`first_submit_maps`      AS `FIRST_SUBMIT_MAPS`
       ,coalesce(`d2`.`NO1_COINT`,0) AS `NO1_COINT`
FROM 
((((`scores` `s`
	JOIN `users` `u` on
	((`u`.`user_id` = `s`.`user_id`)
	))
	JOIN `d0` on
	((`d0`.`USER_ID` = `s`.`user_id`)
	))
	JOIN `d1` on
	((`d1`.`USER_ID` = `s`.`user_id`)
	))
	LEFT JOIN `d2` on
	((`d2`.`USER_ID` = `s`.`user_id`)
	)
)
GROUP BY  `s`.`user_id`