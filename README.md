![ci](https://github.com/VigroX/VTBox/actions/workflows/ci.yml/badge.svg)

# VTBox

- A toolbox built on Vue 3 that contains useful tools.

## Planned features

- Password manager
- Simple file encrypt/decrypt with passphrase.
- A file hash checker.
- Mobile support
- PWA (Progressive Web App)

## Docker container

- Build: `docker build -f Containerfile -t vtbox:latest`
- Run: `docker run -it -p 8080:80 --rm --name vtbox vtbox:latest`