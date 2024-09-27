# Retry failed network requests

### - utilizing promises

When users encounter failed network requests and errors, it's a better user experience to

give them the capability to *retry* previously failed requests. Hence I have created this minimal project to practice for this idea.

failed requests are hold in a promise and in a 'pending' state, because we don't 'reject' the promise so it is not 'settled', until we receive a successful response. 
