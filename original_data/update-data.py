import urllib.request
from transform import main as run_transform

json_files = {
    'items-backup.json': 'https://solomid-resources.s3.amazonaws.com/blitz/tft/data/items.json',
    'champions-backup.json': 'https://solomid-resources.s3.amazonaws.com/blitz/tft/data/champions.json'
}

def main():
    print('Download json files...')
    for file_name, url in json_files.items():
        urllib.request.urlretrieve(url, file_name)
        print('    * {}'.format(file_name))

    print('...done.\n')
    print('Running transform.py...')
    run_transform()
    print('...done.\n')


if __name__ == "__main__":
    main()