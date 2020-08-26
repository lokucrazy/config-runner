import { execSync } from 'child_process'
import { config } from 'process'

const SUPPORTED_CONFIGS = [
  'webpack',
  'rollup',
]


function runConfigs(cli = '', configs: string[] = []): boolean {
  if (!cli || !configs.length) {
    console.error('cli or configs not given!')
    return false
  }
  if (!SUPPORTED_CONFIGS.includes(cli)) {
    console.error('cli not supported yet')
    return false
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
if (!(process.argv.length >= 4)) {
  console.error('need cli and configs')
} else {
  const [, , cli, ...configs] = process.argv
  result = runConfigs(cli, configs)
}
console.groupEnd()
result ? console.log('config-runner succeeded!') : console.error('config-runner failed!')
