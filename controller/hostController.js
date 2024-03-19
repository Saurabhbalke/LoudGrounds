const { sendMail } = require("../helper/mail");
const { getNextSequence } = require("../models/counter");
const webHost = require("../models/host");

// To Create a Task
exports.addHost = async (req, res, next) => {
    let host = new webHost(req.body);
    const user_id = await getNextSequence("host_counter");
    host.user_id = user_id;
    

    const text = `Dear ${host.name},

    Thank you for reaching out and sharing plans for your upcoming event. We look forward to making it an memorable experience for everyone joining that special occasion.
    
    Please find below the details share by you:
    
    Event type        : ${host.event_type}
    Preferred date    : ${host.preferred_date}
    Preferrred venue  : ${host.preferred_venue}
    Tickedted event   : ${host.ticketed_event}
    Guest count       : ${host.guest_count}
    Total budget      : ${host.total_budget}
    Support needed    : ${host.support_needed}
    Email id          : ${host.email_id}
    
    Our team will reach out to you in the next 2 working day and get started on your event.
    
    Regards,
    Loudgrounds Team`
    


    host.save()
        .then(
            async addedHost => {
                const messageId = await sendMail("New Request for Hosting with Loudgrounds ", text, "host@loudgrounds.com", [], false);
                console.log(messageId)
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