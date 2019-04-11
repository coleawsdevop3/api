'use strict'

const fs = require('fs')

// grab our base task
// this file is only available after it's been created, which will be a sure thing if this script is run
// eslint-disable-next-line
const { taskDefinition } = require('./base.json')

// The only things we need for the update
const { family, containerDefinitions, taskRoleArn } = taskDefinition

// Only include properties relevant to the CLI call found in --generate-cli-skeleton
const task = {
  family,
  containerDefinitions,
  taskRoleArn,
}

// tag of updated image
const image = `${process.env.IMAGE}:${process.env.CIRCLE_SHA1}`

// set the container image to our updated image
task.containerDefinitions[0].image = image

// convert it to json
const jsonTask = JSON.stringify(task)

// create the tmp file
fs.writeFileSync('updated-task.json', jsonTask, 'utf8')
