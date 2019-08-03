import urllib.request
from transform import main as run_transform

json_files = {
    "data/solomid/items-backup.json": "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/items.json",
    "data/solomid/champions-backup.json": "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/champions.json",
    "data/solomid/classes-backup.json": "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/classes.json",
    "data/solomid/origins-backup.json": "https://solomid-resources.s3.amazonaws.com/blitz/tft/data/origins.json",
}


def main():
    print("Download json files...")
    for file_name, url in json_files.items():
        urllib.request.urlretrieve(url, file_name)
        print("    * {}".format(file_name))

    print("...done.\n")
    print("Running transform.py...")
    run_transform()
    print("...done.\n")


if __name__ == "__main__":
    main()
