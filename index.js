#! /usr/bin/env node
console.log("hi");

var exec = require("child_process").exec;

exec("npm list -json", function(err, stdout, stderr) {
  if (err) {
    // handle error
  }

  console.log(stdout);
});