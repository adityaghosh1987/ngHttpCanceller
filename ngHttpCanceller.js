(function(){
  'use strict';

  angular.module('ngHttpCanceller', [])
    .factory('httpCanceller', httpCanceller);

  httpCanceller.$inject = [];

  function httpCanceller(){
    var httpCanceller = {};
    var cacheMemory = {};

    /**
    * Add the current API config to  cacheMemory array
    * @param = Api name or an unique value.
    * @param = Api httpconfig object.
    */
    httpCanceller.pushEntry = function(key, data) {
            var isValidKey = httpCanceller.hasEntryInCacheMemory(key);
            if (isValidKey) {
                //Check wih parameters
                //if Yes
                httpCanceller.abortRequest(key);
            }
            cacheMemory[key] = data;
            //console.log("Push : "+JSON.stringify(cacheMemory));
        },

        // Reove a API config entry from cacheMemory array
        httpCanceller.removeEntry = function(key) {
            var isValidKey = httpCanceller.hasEntryInCacheMemory(key);
            if (isValidKey) {
                //console.log("Removed : "+JSON.stringify(cacheMemory));
                delete cacheMemory[key];
            }
        },

        //Check if Api entry is present in cacheMemory
        httpCanceller.hasEntryInCacheMemory = function(key) {
            return cacheMemory.hasOwnProperty(key);
        },

        //Cancel an Api entry that is in progress
        httpCanceller.abortRequest = function(key) {
            var isValidKey, defer, targetHttpConfig;
            isValidKey = httpCanceller.hasEntryInCacheMemory(key);

            if (isValidKey) {
                targetHttpConfig = cacheMemory[key];

                if (!targetHttpConfig) {
                    httpCanceller.removeEntry(key);
                    return;
                }

                targetHttpConfig.resolve("API has cancelled!");
                httpCanceller.removeEntry(key);
            }
        },

        //Cancel all Api entry that is in progress
        httpCanceller.abortAllRunningRequest = function() {
            var key;
            for (key in cacheMemory) {
                httpCanceller.abortRequest(key);
            }
        };

    return httpCanceller;
  }
})();
