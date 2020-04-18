const Report = require('../models/report');

//finding all the reports of every patients based on the status of disease.
module.exports.reports = function(req,res){
    try{
        Report.find({ status: req.params.status}, function (err, reports) {
            return res.json(200,{
                all_reports:reports
            }); 
        });
    }catch (err) {
        return res.json(500, {
            message: "Internal server error"
        });
    }
}
