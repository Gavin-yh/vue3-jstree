module.exports = {
  transform: { 
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/?(*.)+(spec).[jt]s?(x)']
}