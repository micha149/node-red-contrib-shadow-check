workflow "Build and deploy releases" {
  on = "release"
  resolves = ["ESLint"]
}

action "ESLint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "npm run lint"
}
