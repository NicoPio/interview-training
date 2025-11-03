---
id: 19
slug: what-are-callback-functions-in-javascript-and-what-is-callback-hell
title: "What are callback functions in JavaScript and what is callback hell?"
category: javascript
difficulty: medium
tags: ["this", "context", "call", "apply", "bind"]
---

::question
What are callback functions in JavaScript and what is callback hell?
::

::answer
In JavaScript, a callback is a function that is passed as an argument to another function and is executed after the completion of some asynchronous operation or at a specified time. Callbacks are commonly used in scenarios like handling asynchronous tasks, event handling, and other situations where the order of execution is not guaranteed.

**Example:**

```javascript
function customGreeting(name) {
  console.log("Welcome, " + name + "! How can we assist you today?");
}

function outerFunction(callback) {
  let name = prompt("Please enter your name.");
  callback(name);
}

outerFunction(customGreeting);
```

In this example, the `customGreeting` function is the callback function passed to `outerFunction`.

**Callback Hell:**
Callback hell (or "pyramid of doom") is a situation in which multiple nested callbacks make the code difficult to read and maintain. This often occurs when dealing with asynchronous operations, such as making multiple API calls or handling multiple events.

**Example of Callback Hell:**

```javascript
getUser(function (user) {
  getProfile(user.id, function (profile) {
    getPosts(user.id, function (posts) {
      displayUserProfile(user, profile, posts, function () {
        // More nested callbacks...
      });
    });
  });
});
```

In this example, we have nested callbacks for getting a user, fetching their profile, retrieving their posts, and finally displaying the user profile. As more asynchronous operations are added, the code becomes more difficult to read and maintain.

To address callback hell, developers often use techniques like Promises or `async/await` in modern JavaScript to make code more readable and manageable.
