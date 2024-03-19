const { getNextSequence } = require("../models/counter");
const webProvider = require("../models/provider");

const { sendMail } = require("../helper/mail");

// To Create a Task
exports.addProvider = async (req, res, next) => {
    let  provider = new webProvider(req.body);
    const user_id = await getNextSequence("provider_counter");
    provider.user_id = user_id
    const text = `Dear ${provider.name},

    Thank you for showing interest in being part of the Loudgrounds community and organizing amazing events together.
    
    Please find below the details shared by you:
    
    Organizer Type         : ${provider.organizer_type}
    Business Type          : ${provider.business_type}
    Company / Brand Name   : ${provider.comp_name}
    Website                : ${provider.website}
    Instagram / TikTok     : ${provider.instagram}
    Service Details        : ${provider.service_details}
    Standard Packages      : ${provider.standard_packages}
    Email ID               : ${provider.email_id}
    Phone Number           : ${provider.phone_number}
    Desgination            : ${provider.designation}
    
    Our team will reach out to you in the next 1-3 working days and take our discussion ahead.
    
    Regards,
    Loudgrounds Team`

    provider.save()
        .then(
            async addedProvider => {
                const messageId = await sendMail("New Request for Partnering with Loudgrounds", text, "partner@loudgrounds.com", [], false);
                console.log(messageId)
                
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