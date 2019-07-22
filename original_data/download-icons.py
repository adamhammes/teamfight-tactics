import json
import urllib.request


def main():
    with open('champion-icon-links.json') as f:
        icons = json.load(f)

    for icon in icons:
        file_path = './champion-icons/{}.png'.format(icon['slug'])
        urllib.request.urlretrieve(icon['link'], file_path)


if __name__ == "__main__":
    main()
