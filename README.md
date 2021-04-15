# Obsidian Plugin E2e Test

This is a sample repo demonstrating how to write test cases that interact with obsidian.

## Notable files
- test/spec.js - This is a mocha test case that is using [spectron](https://www.electronjs.org/spectron) to control obsidian
- Dockerfile - This will let you run your tests inside CI

## Running the test cases

If you are on a computer Docker you can run `make e2e`. If you want to write test cases against your local version of Obsidian you need to set `OBSIDIAN_PATH` to be the path to your obsidian executable. Then run the tests `yarn test`

### Mac
```
export OBSIDIAN_PATH=/Applications/Obsidian.app/Contents/MacOS/Obsidian
```

### Linux
```
curl -LO https://github.com/obsidianmd/obsidian-releases/releases/download/v0.11.13/Obsidian-0.11.13.AppImage
chmod +x Obsidian-0.11.13.AppImage
./Obsidian-0.11.13.AppImage --appimage-extract
export OBSIDIAN_PATH=$(pwd)/squashfs-root/obsidian
# You might want to look into the Dockerfile to see what things you need to apt-install to get obsidian to run
```

### Windows
I dunno. PRs welcome if you get this working.
