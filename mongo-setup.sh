#!/bin/bash
mongoimport --db clothy --collection products --file /tmp/products.json
mongoimport --db clothy --collection collections --file /tmp/collections.json
mongoimport --db clothy --collection showcases --file /tmp/showcase.json