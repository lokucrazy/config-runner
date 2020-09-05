import * as fs from 'fs'
import { execSync } from 'child_process'

const SUPPORTED_CONFIGS = [
  'webpack',
  'rollup',
]

function findConfigs(): string[] {
  try {
    fs.accessSync('./configs')
    return fs.readdirSync('./configs')
  } catch (error) {
    console.error(`could not read configs directory: ${error}`)
    return []
  }
}

function runConfigs(cli = '', configs: string[] = []): boolean {
  if (!cli) {
    console.error('cli not given')
    return false
  }
  if (!SUPPORTED_CONFIGS.includes(cli)) {
    console.error('cli not supported yet')
    return false
  }
  if (!configs.length) {
    configs = findConfigs().map(config => `./configs/${config}`)
    if (!configs.length) return false
  }
  if (configs.some(config => !config.match(/[A-Za-z]+\.config\.js$/g))) {
    console.error('one of the config files does not end with .config.js')
    return false
  }

  console.group('config-runner-execution')
  let passed = true
  for (const config of configs) {
    console.log(`executing ${cli} --config ${config}`)
    try {
      execSync(`./node_modules/.bin/${cli} --config ${config}`, { stdio: 'inherit' })
    } catch (error) {
      passed = false
      break
    }
  }
  console.groupEnd()
  console.log('config-runner-execution finished')
  return passed
}

console.group('config-runner')
let result = false
if (!(process.argv.length >= 3)) {
  console.error('need cli')
} else {
  const [, , cli, ...configs] = process.argv
  result = runConfigs(cli, configs)
}
console.groupEnd()
result ? console.log('config-runner succeeded!') : console.error('config-runner failed!')
