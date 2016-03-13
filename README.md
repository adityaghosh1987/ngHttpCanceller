# ng-http-canceller
This module will help you to cancel $http requests

## Install
You can install this package either with `npm` or with `bower`.


### npm

```shell
npm install angular
```

Then add a `<script>` to your `index.html`:

```html
<script src="/node_modules/ng-http-canceller/httpCancellerModule.js"></script>
```

Or `require('ng-http-canceller')` from your code.

### bower

```shell
bower install ng-http-canceller
```

Then add a `<script>` to your `index.html`:

```html
<script src="/bower_components/ng-http-canceller/ngHttpCanceller.js"></script>
```

## Dependency Injection
Import it to the angular applicaiton:
```javascript
angular.module('myApp', ['ngHttpCanceller']);
```

## Documentation:
This package helps you to prevent the same API call multiple times. 
It cancels all the running API calls except the latest one. For example, 
the user needs some data after pressing some button. That button internally 
calls an API which returns some data & that data reflects into the UI. 
If the user presses that button very frequently then same API will get 
called multiple times before getting its response & All called API returns 
same response & user face flicker issue.

## To achieve this functionality please follow the bellow following steps:

1. Register your API entry into  httpCanceller factory using some unique key.
```javascript
httpCanceller.pushEntry(apiKey, canceler);
```

2. Unregister your entry using same unique key from the factory after getting the API response(error or success) 
   to prevent the memory leaks.
```javascript
httpCanceller.removeEntry(apiKey);
```

## How to use it :

### 1. Register API entry for $http :
```javascript
/**
* This is the unique key for the API registration to httpCanceller factory.
*/
var apiKey = 'key_' + uniqueKey; 
var canceler = $q.defer(),
    request = {
  		method : method type like 'get', 'post', 'delete', 'put',
  		url : '',
  		headers : {
  			'Content-Type': 'application/json'
  		},
  		params : {},
  		data : {},
  		timeout : canceler.promise
    };
/**
*	Registering the API entry to httpCanceller factory(Step 1)
*/  
httpCanceller.pushEntry(apiKey, canceler);
$http(req).then(function onSuccess(response){
  /**
	*	Unregistering the API entry from httpCanceller factory(Step 2)
	*/
	httpCanceller.removeEntry(apiKey);
	return response
}, function onError(){
  /**
	*	Unregistering the API entry from httpCanceller factory(Step 2)
	*/ 
	httpCanceller.removeEntry(apiKey);
});
```
### 2. Register API entry for restangular : 
```javascript
/**
* This is the unique key for the API registration to httpCanceller factory.
*/
var apiKey = 'key_' + uniqueKey;

var canceler = $q.defer(),
	httpConfig  = {
		timeout  : canceler.promise
	},
apiResponse = !newRouteName ? Restangular.one(apiPath) : Restangular.oneUrl(newRouteName, apiPath);
apiResponse = apiResponse.post('api_path', urlParameters);
apiResponse = apiResponse.withHttpConfig(httpConfig);
/**
*	Registering the API entry to httpCanceller factory(Step 1)
*/	
httpCanceller.pushEntry(apiKey, canceler);

apiResponse.then(function onSuccess(response){
	/**
	*	Unregistering the API entry from httpCanceller factory(Step 2)
	*/
	httpCanceller.removeEntry(apiKey);
	return response
}, function onError(){
  /**
	*	Unregistering the API entry from httpCanceller factory(Step 2)
	*/
	httpCanceller.removeEntry(apiKey);
});
```

### 3. To cancel all the running requests which has been registered:
```javascript
httpCanceller.abortAllRunningRequest();
```

### 4.  To cancel specific request:
```javascript
httpCanceller.abortRequest(apiKey);
```

### 5. To delete the entry from the factory after getting response:
```javascript
httpCanceller.removeEntry(apiKey);
```
