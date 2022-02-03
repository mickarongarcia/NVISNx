1. What is your strategy for handling large amounts of data returned by an API? How does it
impact the user experience?
-- In cases where API call returns large amount of data, we can create an asynchronous function that will allow the user to perform other tasks and not create some blocks. We can use some loading behaviors to inform users that something is happening in the background.

2. Say you’ve received data from an API, and you want to supply a sorting option to it within
your typescript or JavaScript. Give an example of how you might go about doing this.
-- We can perform sorting on the actual data returned by the API call. For example using the Array.sort() method.

3. How would you attach an event to a component?
-- By using Angular's event binding. We can track different events that happened on an element. For components, we can use the EventEmitter assigned to an @Output variable that is triggered by the emit() function.

4. Can you cancel an http request? If yes, how?
-- By unsubscribing to the get() before it returns a data.
