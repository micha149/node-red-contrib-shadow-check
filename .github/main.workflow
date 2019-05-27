workflow "Build and deploy releases" {
  resolves = [
    "Install dependencies",
    "ESLint",
  ]
  on = "release"
}

action "Install dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "ESLint" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install dependencies"]
  args = "run lint"
}
