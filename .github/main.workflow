workflow "Build and deploy releases" {
  on = "release"
  resolves = [
    "Install dependencies",
    "ESLint",
  ]
}

action "Install dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm install"
}

action "ESLint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install dependencies"]
  runs = "npm run lint"
}
