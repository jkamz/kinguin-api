# KINGUIN Integration API

KINGUIN integration api using :

- [axios](https://github.com/axios/axios)

## Informations

This API is create by using offical documentation

All requests to KINGUIN API are made by using axios library. In response you are getting Promise and when Promise resolve you are getting Axios object (https://github.com/axios/axios#response-schema)


## Usage

### API Connection
Class constructor accepts two parameters. First parameter is api key and the second is boolean value representing type of connection (prod = true, sandbox = false).
```
 import Kinguin from 'kinguin-api';
 const api = new Kinguin(api_key, true);
```

### Get product list

```
api.getProductList(filter).then( (response) => {
    // response is Axios object (response.data is answer from kinguin)
})
```

Filter is just optional object with informations about filtering. Every option is optional and not required. 
```
{
    page : [number],
    limit : [number],
    name : [string],
    sortBy : ["price"],
    sortType : ["ASC" | "DESC"],
    priceFrom : [number],
    priceTo : [number]
}
```

### Get product details (price and stock) by id

```
api.getProductDetails(kinguinId).then( (response) => {
    // response is Axios object (response.data is answer from kinguin)
})
```

### Place order

```
api.placeOrder(products).then( (response) => {
    // response is Axios object (response.data is answer from kinguin)
})
```

Products object is array with the items you want to buy.
```
[
    {
            kinguinId: [number],
            qty: [number],
            name: [string],
            price: [number],
    }
]
```

### Get order id

```
api.getOrderID(orderId).then( (response) => {
    // response is Axios object (response.data is answer from kinguin)
})
```

### Get the key

```
api.getKey(dispatchId).then( (response) => {
    // response is Axios object (response.data is answer from kinguin)
})
```