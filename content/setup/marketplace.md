---
title: Set Up a Marketplace
description: Set up and run a data marketplace in the Ocean network.
---

## What Does it Mean to Set Up a Marketplace?

An Ocean marketplace app is one of the primary ways that end users use the Ocean network. For example, a data scientist could use a marketplace app to see what [assets](/concepts/terminology/#asset-or-data-asset) a marketplace has available. They can use the marketplace app to buy access to assets. Publishers make those assets available.

**Note: In the early days of the Ocean network, there won't be many marketplaces or publishers, so marketplaces will often also act as publishers.**

If you want to set up and run a marketplace in the Ocean network, then at a technical level, you must:

1. Have [assets](/concepts/terminology/#asset-or-data-asset) to offer in your marketplace.
1. Get those assets set up to work with Ocean Protocol.
1. Develop a marketplace application (app).
1. Run your marketplace app in production.

## Prepare Assets

At the time of writing, the following kinds of [assets](/concepts/terminology/#asset-or-data-asset) were supported:

- data sets stored in Azure Storage (i.e. with "core.windows.net" in their URL). See [the tutorial about setting up Azure Storage to work with Ocean Protocol](/tutorials/azure-for-brizo/).
- data sets stored in Amazon S3 storage (i.e. with "s3://" in their URL). See [the tutorial about setting up Amazon S3 storage to work with Ocean Protocol](/tutorials/amazon-s3-for-brizo/).
- data sets stored in on-premise storage. See [the tutorial about setting up on-premise storage to work with Ocean Protocol](/tutorials/on-premise-for-brizo/).

Note: You can use _all_ of the above. You aren't restricted to using only one storage provider.

Support for other kinds of assets (e.g. computing in Azure) is coming.

## Develop a Marketplace App

At the time of writing, we recommend the following steps to develop a marketplace app:

1. Do the [React App Tutorial](/tutorials/react-setup/).
1. Grow your app from there.

For inspiration, check out [the source code for Pleuston](https://github.com/oceanprotocol/pleuston), a demo marketplace app (also written using React). It has an Apache v2 open source license.

<repo name="pleuston"></repo>

Note that Pleuston is a "serverless" app: it runs entirely in the browser and has no server-side component.

### Other Options for Developing a Marketplace App

There are many ways to create an Ocean marketplace app. For example, you could use one of the existing e-commerce platforms and frameworks (e.g. WooCommerce, Magento, Shopify). Or you could use a lower-level framework like Django or Vue.js. The main consideration is that you should probably use a programming language with an existing Squid library.

<repo name="squid-js"></repo>
<repo name="squid-py"></repo>
<repo name="squid-java"></repo>

Note: There are examples of how to use squid-py in the [Tutorials](/tutorials/introduction/). squid-py is to Ocean like boto3 is to AWS.

Of course, you could always write your own Squid library in the language of your choice.

## Run Your Marketplace App in Production

The Ocean Mainnet is slated to go live in March 2019.

Before running your marketplace app in production with the Ocean Mainnet, you may want to test it with an [Ocean testnet](/concepts/testnets/).
The Ocean testnets are similar to the Ocean Mainnet.
The main difference is that there is less risk on the Ocean testnets.

Of course, there are many other things that must be handled for live production apps:

- Security of the infrastructure where the software is running
- Monitoring
- Log aggregation, storage and search
- Handling crashes or other faults

Each of those is a big topic beyond the scope of these docs.
