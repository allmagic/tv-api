/**
 * IncommingController
 *
 * @description :: API when new calling arrived socket will blast all params
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	"index": (req, res) => {
		var params = req.allParams();

		if(Object.keys(params).length == 0) // Check params > 0
			return res.json(404, {"error": "please provide one or more params"});

		// Notify all user
		sails.sockets.blast('incoming', params);

		res.json(200, {"message": "new message blast"});
	}
}

