#! /usr/bin/env node
console.log("running...");


// category if package is healthy


const exec = require("child_process").exec;
let projectDependencies = {};

const recurse = function (key, object) {

  // keep track of what versions our packages require
  const packageVersion = object.version;
  if (typeof projectDependencies[key] === "undefined") {
    projectDependencies[`${key}`] = [packageVersion];
  } else {
    projectDependencies[`${key}`].push(packageVersion);
  }

  // recursively step down through all dependencies
  if (typeof object.dependencies !== "undefined") {
    const deps = Object.keys(object.dependencies);

    for (let j = 0; j < deps.length; j++) {
      recurse(deps[j], object.dependencies[deps[j]]);
    }
  }
}

exec("npm list -json", function (err, stdout, stderr) {
  if (err) {
    // handle error
  }

  // save all unique dependencies
  const dependencies = JSON.parse(stdout).dependencies;
  const topLevelDeps = Object.keys(dependencies);

  for (let i = 0; i < topLevelDeps.length; i++) {
    projectDependencies[topLevelDeps[i]] = [dependencies[topLevelDeps[i]].version];

    // store all inner dependencies
    const innerDependencies = dependencies[topLevelDeps[i]].dependencies;
    if (typeof innerDependencies !== "undefined") {
      const keys = Object.keys(innerDependencies);
      for (let j = 0; j < keys.length; j++) {
        recurse(keys[j], innerDependencies[keys[j]]);
      }
    }
  }

  //console.log(projectDependencies);
});