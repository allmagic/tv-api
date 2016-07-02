/**
 * HomepageController
 *
 * @description :: Server-side logic for managing homepages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (request, response) => {
    console.log('request', request)
    return response.view('homepage', {
      currentDate: (new Date()).toString()
    })
  }
}

