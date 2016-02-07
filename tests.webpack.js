var context = require.context('./__tests__', true, /.*spec\.js$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);
