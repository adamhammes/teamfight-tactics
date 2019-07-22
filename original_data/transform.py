import json
import re


def slugify(s):
    s = s.lower()
    for c in [' ', '-', '.', '/']:
        s = s.replace(c, '_')

    s = re.sub('\W', '', s)

    s = s.replace('_', ' ')
    s = re.sub('\s+', ' ', s)
    s = s.strip()
    s = s.replace(' ', '-')

    return s


def main():
    with open('champions-backup.json') as f:
        raw_champions = json.load(f)

    champions_list = list(raw_champions.values())

    for champion in champions_list:
        champion['slug'] = slugify(champion['name'])

        ability = champion['ability']
        del ability['stats']

    with open('champion-list.json', 'w') as f:
        json.dump(champions_list, f, indent=4)


if __name__ == "__main__":
    main()
