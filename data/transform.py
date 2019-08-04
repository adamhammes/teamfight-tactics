import collections
import copy
import json
import re


def slugify(s):
    s = s.lower()
    for c in [" ", "-", ".", "/"]:
        s = s.replace(c, "_")

    s = re.sub(r"\W", "", s)

    s = s.replace("_", " ")
    s = re.sub(r"\s+", " ", s)
    s = s.strip()
    s = s.replace(" ", "-")

    return s


def load_json(path):
    with open(path) as f:
        return json.load(f, object_pairs_hook=collections.OrderedDict)


def dump_json(data, path):
    with open(path, "w") as f:
        json.dump(data, f, indent=4, separators=(",", ": "))


def champions():
    raw_champions = load_json("data/solomid/champions-backup.json")

    champions_list = list(raw_champions.values())

    for champion in champions_list:
        champion["slug"] = slugify(champion["name"])

        ability = champion["ability"]
        del ability["stats"]

    dump_json(champions_list, "data/cleaned-data/champion-list.json")


def items():
    raw_items = load_json("data/solomid/items-backup.json")

    items = list(raw_items.values())

    basic_items = collections.OrderedDict()
    advanced_items = collections.OrderedDict()
    for item in items:
        # copy and delete circular references
        copied_item = copy.deepcopy(item)
        copied_item.pop("buildsInto", None)
        copied_item.pop("buildsFrom", None)

        if copied_item["kind"] == "basic":
            basic_items[copied_item["key"]] = copied_item
        else:
            advanced_items[copied_item["key"]] = copied_item

    basic_items_keys = basic_items.keys()

    for item in items:
        new_builds_into = collections.OrderedDict()
        new_builds_from = []
        if item["kind"] == "basic":
            builds_into = item["buildsInto"]
            for basic_key, advanced_key in zip(basic_items_keys, builds_into):
                new_builds_into[basic_key] = advanced_items[advanced_key]

        else:
            new_builds_from = [basic_items[item_key] for item_key in item["buildsFrom"]]

        item["buildsInto"] = new_builds_into
        item["buildsFrom"] = new_builds_from

    dump_json(items, "data/cleaned-data/items.json")


def synergies():
    classes = load_json("data/solomid/classes-backup.json")
    origins = load_json("data/solomid/origins-backup.json")

    for _class in classes.values():
        _class["type"] = "class"

    for origin in origins.values():
        origin["type"] = "origin"

    synergies = list(origins.values()) + list(classes.values())

    for synergy in synergies:
        for bonus in synergy["bonuses"]:
            bonus_is_exclusive = synergy["key"] == "ninja" and bonus["needed"] == 1
            bonus["exclusive"] = bonus_is_exclusive

    dump_json(synergies, "data/cleaned-data/synergies.json")


def main():
    champions()
    items()
    synergies()


if __name__ == "__main__":
    main()
