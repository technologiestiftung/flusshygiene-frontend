![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Flusshygiene Frontend

This legacy application is the extracted "Standortbewertung" tool from the [Flusshygiene](https://github.com/technologiestiftung/flusshygiene) project, which will not be developed anymore. There is another iteration by the [KWB](https://github.com/KWB-R/swim-ai).

## Prerequisites

- Node.js v12 installed via https://nvm.sh
- (optional) Docker

## Installation

```bash
# install and use the used Node.js version referenced in .nvmrc
nvm install
# install the application dependencies
npm ci
# build the production bundle
npm run build
# install the server dependencies
#(this is optional, you could use Nginx, Apache or any other webserver)
cd ./server && npm ci && cd ..
# serve the application
node server/index.js
```

## Usage or Deployment

As seen above you can use the small express server delivered with the application.
There is also an docker image under https://hub.docker.com/repository/docker/technologiestiftung/flusshygiene-frontend

## Development

```bash
npm run dev
```

## Tests

None. Sorry.

## Contributing

Thank you for considering to contribute. Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
    <td>
      Made by <a href="https://citylab-berlin.org/de/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by <a href="https://www.technologiestiftung-berlin.de/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-de.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://logos.citylab-berlin.org/logo-berlin-senatskanzelei-de.svg" />
      </a>
    </td>
  </tr>
</table>

## Related Projects

- https://github.com/technologiestiftung/flusshygiene
