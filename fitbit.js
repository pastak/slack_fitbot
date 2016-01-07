const FitbitClient = require('fitbit-client-oauth2')
const config = require('./config')
const clientId = config.CLIENT_ID
const clientSecret = config.CONSUMER_SECRET
const client = new FitbitClient(clientId, clientSecret)
const token = client.createToken({
    access_token: config.ACCESS_TOKEN,
    refresh_token: config.REFRESH_TOKEN,
    expires_at: config.EXPIRES_AT
})
const getActivities = new Promise((resolve) => {
  client.refreshAccessToken(token).then((newToken) => {
    const _config = `module.exports = ${JSON.stringify(Object.assign(config, {
      ACCESS_TOKEN: newToken.token.access_token,
      REFRESH_TOKEN: newToken.token.refresh_token,
      EXPIRES_AT: newToken.token.expires_at
    }))}`
    require('fs').writeFile('./config.js', _config)
    client.getDailyActivitySummary(newToken, {units: 'METRIC'}).then((res) => {
      resolve(res.summary)
    }).catch((err) => console.log(err.error))
  }).catch((e) => console.log(e))
})
const getStep = () => {
  return new Promise((resolve) => {
    getActivities.then((data) => {
      resolve(data.steps)
    })
  })
}

const getDistance = () => {
  return new Promise((resolve) => {
    getActivities.then((data) => {
      data.distances.forEach((item) => {
        if (item.activity === 'total') {
          resolve(item.distance)
        }
      })
    })
  })
}

const getHeartRate = () => {
  return new Promise((resolve) => {
    client.refreshAccessToken(token).then((newToken) => {
      const _config = `module.exports = ${JSON.stringify(Object.assign(config, {
        ACCESS_TOKEN: newToken.token.access_token,
        REFRESH_TOKEN: newToken.token.refresh_token,
        EXPIRES_AT: newToken.token.expires_at
      }))}`
      require('fs').writeFile('./config.js', _config)
      client.getTimeSeries(newToken, {resourcePath: 'activities/heart', period: '1d/1sec'}).then((res) => {
        const dataset = res['activities-heart-intraday'].dataset
        resolve(dataset[dataset.length - 1])
      })
    })
  })
}

const getSleepData = () => {
  return new Promise((resolve) => {
    client.refreshAccessToken(token).then((newToken) => {
      const _config = `module.exports = ${JSON.stringify(Object.assign(config, {
        ACCESS_TOKEN: newToken.token.access_token,
        REFRESH_TOKEN: newToken.token.refresh_token,
        EXPIRES_AT: newToken.token.expires_at
      }))}`
      require('fs').writeFile('./config.js', _config)
      client.getSleepLog(newToken).then((res) => {
        resolve(res)
      }).catch((e) => console.log(e.error))
    })
  })
}

const getLastSleepingTime = () => {
  return new Promise((resolve) => {
    getSleepData().then((res) => {
      const startTime = res.sleep.startTime
      if (!startTime) return resolve(null)
      const lastSleepInfo = (res.sleep.pop().minuteData).filter((item) => item.value === '1').pop()
      resolve({lastSleepInfo, startTime})
    })
  })
}
module.exports = {getStep, getDistance, getHeartRate, getLastSleepingTime}
