import axios from 'axios'
class Network {
  static async get(url) {
    try {
      console.log('response', url)

      const response = await axios.get(url)
      return response.data
    } catch (error) {
      let err = {}
      if (error.response) {
        err.statusCode = error.response.status
        console.log('Message:', error.message)
        err.message =
          err.statusCode === 401 ? 'Invalid Token' : error.response.data.msg || 'Not Found.'
        console.log('ERROR:1', error.response.data.msg)
      } else if (error.request) {
        err.message = 'Server Timeout.'
        err.statusCode = 503
        console.log('ERROR:2', error.request)
      } else {
        err.message = error.message || 'opps! something went wrong while setting up request'
        console.log('Error:3', error.message)
      }
      throw err
    }
  }
}

module.exports = Network
