const { getNextSequence } = require("../models/counter");
const webProvider = require("../models/provider");



// To Create a Task
exports.addProvider = (req, res, next) => {
    const  provider = new webProvider(req.body);
    provider.save()
        .then(
            addedProvider => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'provider added SuccessFully!',
                    'data': {
                        addedProvider
                    }
                })
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}
exports.getAllProvider = (req, res, next) => {

    const query = webProvider.find()

    query.then(
        provider => {
                if (!provider.length) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No provider found!',
                        'provider': provider,
                        'providerCount': provider.length
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'provider Fetched Successfully!',
                    'provider': provider,
                    'providerCount': provider.length
                });
            }
        )
        .catch(
            error => {
                res.status(500).json({
                    'status': 'Error',
                    'message': 'Error in DB Operation!',
                    'error': error
                });
            }
        )
}