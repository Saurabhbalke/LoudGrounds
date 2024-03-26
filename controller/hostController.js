const { sendMail } = require("../helper/mail");
const { getNextSequence } = require("../models/counter");
const webHost = require("../models/host");
const {getGoogleSheetClient, writeGoogleSheet, readGoogleSheet} = require("../helper/googleSheet")

const sheetId = process.env.SHEET_ID
const tabName = 'Host' //by default Sheet1
const range = 'A:N'  

// To Create a host
exports.addHost = async (req, res, next) => {
    let host = new webHost(req.body);
    // auto increment user_id
    const user_id = await getNextSequence("host_counter");
    host.user_id = user_id;

    // inserting data in googlesheet, change tabName and range as per requirement 
    const googleSheetClient = await getGoogleSheetClient();
    const support_needed = host.support_needed.toString();
    const dataToBeInserted = [
        [   
            host.time_stamp, 
            host.IP_address, 
            host.user_id, 
            host.event_type, 
            host.preferred_date, 
            host.preferred_venue, 
            host.ticketed_event, 
            host.guest_count, 
            host.total_budget, 
            support_needed, 
            host.name, 
            host.email_id, 
            host.phone_number, 
            host.notes
        ],
     ]
     await writeGoogleSheet(googleSheetClient, sheetId, tabName, range, dataToBeInserted);
    

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