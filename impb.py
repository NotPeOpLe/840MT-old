from sql import import_beatmaps, import_beatmapsets

beatmap = open("map.txt", "r", encoding="UTF-8")

for maps in beatmap.readlines():
    map_split = maps.split(",")
    map_id = map_split[0]
    map_type = map_split[1].strip("\n")

    if map_type == "map":
        import_beatmaps(map_id)
    elif map_type == "set":
        import_beatmapsets(map_id)
    else:
        print(f"{map_id} 類型錯誤!")

beatmap.close()
print("Done.")