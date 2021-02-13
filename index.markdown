---
layout: default
---

# Postie Web Service

This is a simple REST web-service that provides searching of Australian suburbs and postcodes. Here's some example URLs:

* [auspostie.com/Northcote](/northcote) - basic suburb search
* [auspostie.com/Northcote.json](/northcote.json) - get the data as JSON
* [auspostie.com/Northcote.xml](/northcote.xml) - get the data as XML
* [auspostie.com/3000](/3000) - if the request is four digits, it's treated as a postcode
* [auspostie.com/3000.json](/3000.json) - same extensions work for postcode seaches
* [auspostie.com/West](/west) - partial matches (by full words) return all matching suburbs.

This service is written by [Pat Allan](https://freelancing-gods.com), using a free (and likely out-of-date) dataset from [Australia Post](https://www.auspost.com.au). If you find it useful, [let me know](https://twitter.com/pat).
