import json
import re


def slugify(string):
    return re.sub(r'\W+', '-', string).strip('-')


def main():
    with open('champions-backup.json') as f:
        raw_champions = json.load(f)

    champions_list = list(raw_champions.values())

    for champion in champions_list:
        slug = slugify(champion['name']).replace('-', '')
        champion['slug'] = slug

        ability = champion['ability']
        del ability['stats']

    with open('champion-list.json', 'w') as f:
        json.dump(champions_list, f, indent=4)


if __name__ == "__main__":
    main()
