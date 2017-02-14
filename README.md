# freerider-slack-notifier
### Introduction
This script searches the Hertz Freerider website for free cars between specific locations and then notifies via a slack hook.

### What is Hertz Freerider?
Hertz Freerider is a service that enables you to drive cars that needs to be moved for free. Find out more here: https://www.hertzfreerider.se/

### How to use
Index.js exports a function that takes an origin and destination to search for available cars between, and notifies via a Slack hook if any matches was found. Set the SLACK_HOOK_PATH environment variable to the PATH-part of your Slack Hook URL. For an example of how to use the script, take a look at /worker.js 