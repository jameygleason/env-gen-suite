const devKeys = {}

const prodKeys = {}

const sharedKeys = {}

export default {
  development: { ...devKeys, ...sharedKeys },
  production: { ...prodKeys, ...sharedKeys },
}
