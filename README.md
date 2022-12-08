# Shopgate Connect - Youtube PDP Extension

[![GitHub license](http://dmlc.github.io/img/apache2.svg)](LICENSE)

Shows a youtube video on the product detail page.

## Configuration

Currently it's possible to configure a Youtube Video which is rendered on the Product Detail Page.

The configuration is done in the deployment process, as an extension config.

- `videoProperty`: Property name, which includes the YouTube URL/ID
- `portalName`: String to configure the portal position
- `addPaddingAroundVideo`: Adds some padding around the YouTube container. Default: `false`
- `headlineText`: Adds a headline to the YouTube container. Default: `product.description.after`

## Example

```json
{
  "videoProperty": "Youtube",
  "portalName": "product.description.after",
  "addPaddingAroundVideo": true,
  "headlineText": "Awesome YouTube Video"
}
```

## Available portal positions

```
{
  "product.header.before"
  "product.header.after"
  "product.name.before"
  "product.name.after"
  "product.info.before"
  "product.info.after"
  "product.shipping.before"
  "product.shipping.after"
  "product.availability.before"
  "product.availability.after"
  "product.stock-info.before"
  "product.stock-info.after"
  "product.price-info.before"
  "product.price-info.after"
  "product.description.before"
  "product.description.after"
  "product.price.before"
  "product.price.after"
  "product.price-striked.before"
  "product.price-striked.after"
  "product.properties.before"
  "product.properties.after"
  "product.reviews.before"
  "product.reviews.after"
```


## Changelog

See [CHANGELOG.md](CHANGELOG.md) file for more information.

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) file for more information.

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.

## License

This extension is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.
