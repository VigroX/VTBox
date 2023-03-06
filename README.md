# VTBox ![ci](https://github.com/VigroX/VTBox/actions/workflows/ci.yml/badge.svg) ![image](https://github.com/VigroX/VTBox/actions/workflows/image.yml/badge.svg) 

- A toolbox built on Vue 3 that contains useful tools.

## Features

- Simple file encrypt/decrypt with passphrase.
- A file hash checker.

## Planned features

- Password manager
- Mobile support
- PWA (Progressive Web App)

## Docker official image

- Run: `docker run -dt -p 8080:80 --rm --name vtbox ghcr.io/vigrox/vtbox:latest`
- Update: `docker pull ghcr.io/vigrox/vtbox:latest`

## Docker own container

- Build: `docker build -f Containerfile -t vtbox:latest`
- Run: `docker run -it -p 8080:80 --rm --name vtbox vtbox:latest`