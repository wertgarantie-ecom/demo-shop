<br/>
<br/>
<p align="center">
<img width="500" src="https://wertgarantie-bifrost.s3.eu-central-1.amazonaws.com/wertgarantie-logo.svg" alt="wertgarantie-logo">
</p>
<br/>
<p align="center">
  <a href="https://app.circleci.com/pipelines/github/wertgarantie-ecom/demo-shop?branch=master"><img src="https://circleci.com/gh/wertgarantie-ecom/demo-shop.svg?style=shield" alt="build status"></a>
  <!-- <a href="#"><img src="https://heroku-badge.herokuapp.com/?app=wertgarantie-bifrost&root=healthcheck" alt="heroku status"></a> -->
</p>
<br/>

# Demo-Shop
Mit dem Demo-Shop können die Wertgarantie-Komponenten getestet werden. Die Konfiguration der einzelnen Dummy-Demo-Shops können über die Admin UI vom Bifrost gesteuert werden. 

Codeseitig sind dazu keine Änderungen notwendig (die Platzhalter für die Komponenten sind auf den entsprechenden Seiten hinterlegt). Alleine die Client-Konfiguration (Shop) entscheidet darüber, ob eine Komponente gerendet wird.

## Setup
The demo shop gets started by the `docker-compose up -d` command within the bifrost. The demo shop needs to have the bifrost running.

To run locally:
```
npm i
npm run dev
```

### Troubleshooting dev
If the components are not displayed, even though all containers are running, try rebuilding the bifrost-components, then hard reloading the browser.

## Related projects

| Package                                                       | Description                                                                                                                         |
| :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Wertgarantie-ecom](https://github.com/wertgarantie-ecom)                                         | Overview over all 'wertgarantie-ecom' projects                                          |
| [Bifrost](https://github.com/wertgarantie-ecom/bifrost)                     | "Backend-for-frontend" between Wertgaranties's webservices and the custom elements                               |
| [Bifrost components](https://github.com/wertgarantie-ecom/bifrost-components)             | Contains all custom elements.                   |
| [Demo Shop](https://github.com/wertgarantie-ecom/demo-shop) | Demo-Shop for end-to-end testing of components/bifrost and/or new products/changed client configurations |
| [Integrations](https://github.com/wertgarantie-ecom/integrations)               | Contains example pages for some clients                      |
| [Heimdall mock](https://github.com/wertgarantie-ecom/heimdall-mock)                     | Service to mock Wertgarantie's webservices API                               |


## License

MIT













