---
title: DDO Metadata
description: Specification of the DDO subset dedicated to asset metadata
slug: /concepts/ddo-metadata/
section: concepts
---

## Overview

This page defines the schema for asset _metadata_. Metadata is the subset of an Ocean DDO that holds information about the asset.

The schema is based on public schema.org [DataSet schema](https://schema.org/Dataset).

Standardizing labels is key to effective searching, sorting and filtering (discovery).

This page specifies metadata attributes that _must_ be included, and that _may_ be included. These attributes are organized hierarchically, from top-layer attributes like `"main"` to sub-level attributes like `"main.type"`. This page also provides DDO metadata examples.

## Rules for Metadata Storage and Control in Ocean

The publisher publishes an asset DDO (including metadata) onto the chain. 

The publisher may be the asset owner, or a marketplace acting on behalf of the owner.

Most metadata fields may be modified after creation. The blockchain records the provenance of changes.

DDOs (including metadata) are found in two places:

- _Remote_ - main storage, on-chain. File URLs are always encrypted. One may actually encrypt all metadata, at a severe cost to discoverability.
- _Local_ - local cache. All fields are in plaintext. 

Ocean Aquarius helps manage metadata. It can be used to write DDOs to the chain, read from the chain, and has a local cache of the DDO in plaintext with fast search. 

## Fields for Metadata

An asset represents a resource in Ocean, e.g. a dataset or an algorithm.

A `metadata` object has the following attributes, all of which are objects. Some are only required for local or remote, and are specified as such.

| Attribute                   | Required | Description                                                |
| --------------------------- | -------- | ---------------------------------------------------------- |
| **`main`**                  | **Yes**  | Main attributes                                            |
| **`encryptedFiles`**        | Remote   | Encrypted string of the `attributes.main.files` object.    |
| **`encryptedServices`**     | Remote   | Encrypted string of the `attributes.main.services` object. |
| **`status`**                | No       | Status attributes                                          |
| **`additionalInformation`** | No       | Optional attributes                                        |

The `main` and `additionalInformation` attributes are independent of the asset type. 

## Fields for `attributes.main`

The `main` object has the following attributes. 

| Attribute           | Type                  | Required | Description                                                                                                                                                                                       |
| ------------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`name`**          | Text                  |**Yes**   | Descriptive name or title of the asset.                                                                                                                                                           |
| **`type`**          | Text                  |**Yes**   | Asset type. Includes `"dataset"` (e.g. csv file), `"algorithm"` (e.g. Python script). Each type needs a different subset of metadata attributes. |
| **`author`**        | Text                  |**Yes**   | Name of the entity generating this data (e.g. Tfl, Disney Corp, etc.).                                                                                                                            |
| **`license`**       | Text                  |**Yes**   | Short name referencing the license of the asset (e.g. Public Domain, CC-0, CC-BY, No License Specified, etc. ). If it's not specified, the following value will be added: "No License Specified". |
| **`files`**         | Array of files object |**Yes**   | Array of `File` objects including the encrypted file urls.   |
| **`dateCreated`**   | DateTime              |**Yes**   | The date on which the asset was created by the originator. ISO 8601 format, Coordinated Universal Time, e.g. `2019-01-31T08:38:32Z`.                                                              |
| **`datePublished`** | DateTime              | Remote   | The date on which the asset DDO is registered into the metadata store (Aquarius)                                                                                                                  |

## Fields for `attributes.main.files` 

The `files` object has a list of `file` objects.

Each `file` object has the following attributes, with the details necessary to consume and validate the data.

| Attribute            | Required | Description                                                                                                                                                                              |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`index`**          |**Yes**   | Index number starting from 0 of the file.                                                                                                                                                |
| **`contentType`**    |**Yes**   | File format.                                                                                                                                                                             |
| **`url`**            | Local    | Content URL. Omitted from the remote metadata. Supports `http(s)://` and `ipfs://` URLs.                                                                                                 |
| **`name`**           | No       | File name.                                                                                                                                                                               |
| **`checksum`**       | No       | Checksum of the file using your preferred format (i.e. MD5). Format specified in `checksumType`. If it's not provided can't be validated if the file was not modified after registering. |
| **`checksumType`**   | No       | Format of the provided checksum. Can vary according to server (i.e Amazon vs. Azure)                                                                                                     |
| **`contentLength`**  | No       | Size of the file in bytes.                                                                                                                                                               |
| **`encoding`**       | No       | File encoding (e.g. UTF-8).                                                                                                                                                              |
| **`compression`**    | No       | File compression (e.g. no, gzip, bzip2, etc).                                                                                                                                            |
| **`encrypted`**      | No       | Boolean. Is the file encrypted? If is not set is assumed the file is not encrypted                                                                                                       |
| **`encryptionMode`** | No       | Encryption mode used. Just valid if `encrypted=true`                                                                                                                                     |
| **`resourceId`**     | No       | Remote identifier of the file in the external provider. It is typically the remote id in the cloud provider.                                                                             |
| **`attributes`**     | No       | Key-Value hash map with additional attributes describing the asset file. It could include details like the Amazon S3 bucket, region, etc.                                                |

## Fields for `attributes.status`

A `status` object has the following attributes.

| Attribute             | Type    | Required | Description                                                                                                                                                                        |
| --------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`isListed`**        | Boolean | No       | Use to flag unsuitable content. True by default. If it's false, the content must not be returned.                                                                                  |
| **`isRetired`**       | Boolean | No       | Flag retired content. False by default. If it's true, the content may either not be returned, or returned with a note about retirement.                                            |
| **`isOrderDisabled`** | Boolean | No       | For temporarily disabling ordering assets, e.g. when file host is in maintenance. False by default. If it's true, no ordering of assets for download or compute should be allowed. |

## Fields for `attributes.additionalInformation`

All the additional information will be stored as part of the `additionalInformation` section.

| Attribute             | Type          | Required |
| --------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`tags`**            | Array of Text | No       | Array of keywords or tags used to describe this content. Empty by default.                                                                                                                                                                                                                                                                                                                                                                                       |
| **`description`**     | Text          | No       | Details of what the resource is. For a dataset, this attribute explains what the data represents and what it can be used for.                                                                                                                                                                                                                                                                                                                                    |
| **`copyrightHolder`** | Text          | No       | The party holding the legal copyright. Empty by default.                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`workExample`**     | Text          | No       | Example of the concept of this asset. This example is part of the metadata, not an external link.                                                                                                                                                                                                                                                                                                                                                                |
| **`links`**           | Array of Link | No       | Mapping of links for data samples, or links to find out more information. Links may be to either a URL or another Asset. We expect marketplaces to converge on agreements of typical formats for linked data: The Ocean Protocol itself does not mandate any specific formats as these requirements are likely to be domain-specific. The links array can be an empty array, but if there is a link object in it, then an "url" is required in that link object. |
| **`inLanguage`**      | Text          | No       | The language of the content. Please use one of the language codes from the [IETF BCP 47 standard](https://tools.ietf.org/html/bcp47).                                                                                                                                                                                                                                                                                                                            |
| **`categories`**      | Array of Text | No       | Optional array of categories associated to the asset. Note: recommended to use `"tags"` instead of this.                                                                      |

## Fields - Other Suggestions

Here are example attributes to help an asset's discoverability.

| Attribute              | Description                                                                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`updateFrequency`**  | An indication of update latency - i.e. How often are updates expected (seldom, annually, quarterly, etc.), or is the resource static that is never expected to get updated. |
| **`structuredMarkup`** | A link to machine-readable structured markup (such as ttl/json-ld/rdf) describing the dataset.                                                                              |

## DDO Metadata Example - Local

This is what the DDO metadata looks like. All fields are in plaintext. This is before it's stored on-chain or when it's retrieved and decrypted into a local cache.

```json
{
  "main": {
    "name": "Madrid Weather forecast",
    "dateCreated": "2019-05-16T12:36:14.535Z",
    "author": "Norwegian Meteorological Institute",
    "type": "dataset",
    "license": "Public Domain",
    "price": "123000000000000000000",
    "files": [
      {
        "index": 0,
        "url": "https://example-url.net/weather/forecast/madrid/350750305731.xml",
        "contentLength": "0",
        "contentType": "text/xml",
        "compression": "none"
      }
    ]
  },
  "additionalInformation": {
    "description": "Weather forecast of Europe/Madrid in XML format",
    "copyrightHolder": "Norwegian Meteorological Institute",
    "categories": ["Other"],
    "links": [],
    "tags": [],
    "updateFrequency": null,
    "structuredMarkup": []
  },
  "status": {
    "isListed": true,
    "isRetired": false,
    "isOrderDisabled": false
  }
}
```

## DDO Metadata Example - Remote

The previous example was for a local cache, with all fields in plaintext.

Here's the same example, for remote on-chain storage. That is, it's how metadata looks as a response to querying Aquarius (remote metadata).

How remote is changed, compared to local:

- `url` is removed from all objects in the `files` array
- `encryptedFiles` is added.

```json
{
  "service": [
    {
      "index": 0,
      "serviceEndpoint": "http://aquarius:5000/api/v1/aquarius/assets/ddo/{did}",
      "type": "metadata",
      "attributes": {
        "main": {
          "type": "dataset",
          "name": "Madrid Weather forecast",
          "dateCreated": "2019-05-16T12:36:14.535Z",
          "author": "Norwegian Meteorological Institute",
          "license": "Public Domain",
          "files": [
            {
              "contentLength": "0",
              "contentType": "text/xml",
              "compression": "none",
              "index": 0
            }
          ],
          "datePublished": "2019-05-16T12:41:01Z"
        },
        "encryptedFiles": "0x7a0d1c66ae861…df43aa9",
        "additionalInformation": {
          "description": "Weather forecast of Europe/Madrid in XML format",
          "copyrightHolder": "Norwegian Meteorological Institute",
          "categories": ["Other"],
          "links": [],
          "tags": [],
          "updateFrequency": null,
          "structuredMarkup": []
        },
        "status": {
          "isListed": true,
          "isRetired": false,
          "isOrderDisabled": false
        }
      }
    }
  ]
}
```

## Fields when `attributes.main.type = algorithm`

An asset of type `algorithm` has the following additional attributes under `main.algorithm`:

| Attribute       | Type     | Required | Description                                   |
| --------------- | -------- | -------- | --------------------------------------------- |
| **`container`** | `Object` |**Yes**   | Object describing the Docker container image. |
| **`language`**  | `string` | No       | Language used to implement the software       |
| **`format`**    | `string` | No       | Packaging format of the software.             |
| **`version`**   | `string` | No       | Version of the software.                      |

The `container` object has the following attributes:

| Attribute        | Type     | Required | Description                                                       |
| ---------------- | -------- | -------- | ----------------------------------------------------------------- |
| **`entrypoint`** | `string` |**Yes**   | The command to execute, or script to run inside the Docker image. |
| **`image`**      | `string` |**Yes**   | Name of the Docker image.                                         |
| **`tag`**        | `string` |**Yes**   | Tag of the Docker image.                                          |
| **`checksum`**   | `string` |**Yes**   | Checksum of the Docker image.                                     |

```json
{
  "index": 0,
  "serviceEndpoint": "http://localhost:5000/api/v1/aquarius/assets/ddo/{did}",
  "type": "metadata",
  "attributes": {
    "main": {
      "author": "John Doe",
      "dateCreated": "2019-02-08T08:13:49Z",
      "license": "CC-BY",
      "name": "My super algorithm",
      "type": "algorithm",
      "algorithm": {
        "language": "scala",
        "format": "docker-image",
        "version": "0.1",
        "container": {
          "entrypoint": "node $ALGO",
          "image": "node",
          "tag": "10",
          "checksum": "efb2c764274b745f5fc37f97c6b0e761"
        }
      },
      "files": [
        {
          "name": "build_model",
          "url": "https://raw.gith ubusercontent.com/oceanprotocol/test-algorithm/master/javascript/algo.js",
          "index": 0,
          "checksum": "efb2c764274b745f5fc37f97c6b0e761",
          "contentLength": "4535431",
          "contentType": "text/plain",
          "encoding": "UTF-8",
          "compression": "zip"
        }
      ]
    },
    "additionalInformation": {
      "description": "Workflow to aggregate weather information",
      "tags": ["weather", "uk", "2011", "workflow", "aggregation"],
      "copyrightHolder": "John Doe"
    }
  }
}
```

## Fields when `attributes.main.type = compute`

An asset with a service of type `compute` has the following additional attributes under `main.privacy`:

| Attribute                         | Type               | Required | Description                                                |
| --------------------------------- | ------------------ | -------- | ---------------------------------------------------------- |
| **`allowRawAlgorithm`**           | `boolean`          |**Yes**   | If True, a drag & drop algo can be runned                  |
| **`allowNetworkAccess`**          | `boolean`          |**Yes**   | If True, the algo job will have network access (stil WIP)  |
| **`publisherTrustedAlgorithms `** | Array of `Objects` |**Yes**   | If Empty , then any published algo is allowed. (see below) |

The `publisherTrustedAlgorithms ` is an array of objects with the following structure:

| Attribute                      | Type     | Required | Description                                                        |
| ------------------------------ | -------- | -------- | ------------------------------------------------------------------ |
| **`did`**                      | `string` |**Yes**   | The did of the algo which is trusted by the publisher.             |
| **`filesChecksum`**            | `string` |**Yes**   | Hash of ( algorithm's encryptedFiles + files section (as string) ) |
| **`containerSectionChecksum`** | `string` |**Yes**   | Hash of the algorithm container section (as string)                |

To produce `filesChecksum`:

```javascript
sha256(
  algorithm_ddo.service['metadata'].attributes.encryptedFiles +
    JSON.Stringify(algorithm_ddo.service['metadata'].attributes.main.files)
)
```

To produce `containerSectionChecksum`:

```javascript
sha256(
  JSON.Stringify(
    algorithm_ddo.service['metadata'].attributes.main.algorithm.container
  )
)
```

### Example of a compute service

```json
{
  "type": "compute",
  "index": 1,
  "serviceEndpoint": "https://provider.oceanprotocol.com",
  "attributes": {
    "main": {
      "name": "dataAssetComputingService",
      "creator": "0xA32C84D2B44C041F3a56afC07a33f8AC5BF1A071",
      "datePublished": "2021-02-17T06:31:33Z",
      "cost": "1",
      "timeout": 3600,
      "privacy": {
        "allowRawAlgorithm": true,
        "allowNetworkAccess": false,
        "publisherTrustedAlgorithms": [
          {
            "did": "0xxxxx",
            "filesChecksum": "1234",
            "containerSectionChecksum": "7676"
          },
          {
            "did": "0xxxxx",
            "filesChecksum": "1232334",
            "containerSectionChecksum": "98787"
          }
        ]
      }
    }
  }
}
```
