import collections
import copy
import json
import re


def slugify(s):
    s = s.lower()
    for c in [" ", "-", ".", "/"]:
        s = s.replace(c, "_")

    s = re.sub("\W", "", s)

    s = s.replace("_", " ")
    s = re.sub("\s+", " ", s)
    s = s.strip()
    s = s.replace(" ", "-")

    return s


def load_json(path):
    with open(path) as f:
        return json.load(f, object_pairs_hook=collections.OrderedDict)


def champions():
    raw_champions = load_json("data/solomid/champions-backup.json")

    champions_list = list(raw_champions.values())

    for champion in champions_list:
        champion["slug"] = slugify(champion["name"])

        ability = champion["ability"]
        del ability["stats"]

    with open("data/champion-list.json", "w") as f:
        json.dump(champions_list, f, indent=4)


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

    with open("data/items.json", "w") as f:
        json.dump(items, f, indent=4)


def main():
    champions()
    items()


if __name__ == "__main__":
    main()
