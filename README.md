# NodeCovidHelper
Node Covid helper is a resp API built using NODEJS and Mongodb. It registers the doctors using JWT authentication. Logs in the doctor helps them to create patients reports and list all the reports as per the patients id or disease status.

Steps to set up the project
1. clone the repository by using the command "git clone https://github.com/alpsz/NodeCovidHelper"
2. Initialize the package manager using the command "npm init"
3. install express using commmand "npm install express --save"
4. install cookie-parser using command "npm install cookie-parser"
5. install mongoose using command "npm install mongoose"
6. install express-session using command "npm install express-session"
7. install passport using command "npm install passport"
8. install passport-local-strategy using command "npm install passport-local"
9. install passport-jwt-strategy using command "npm install passport-jwt"

Steps to use the API

1. Register the doctor : http://localhost:8000/doctors/register pass the parameters as username: name, password : pass
2. Login the doctor : http://localhost:8000/doctors/login pass the username and password. It will return the JWT token save token for        future purpose.
3. Register the pateint : http://localhost:8000/patients/register pass the parameters as phone : phone number. If the pateint already        registered then pateint details will be returned.
4. Create patients report : http://localhost:8000/patients/5e9b0f0279e29c15b036edf7(patient key)/create_report. Pass doctor's JWT token    as (x-access-token: JWT Token). 
5. Find all the reports of a specific patient (sorted date wise): http://localhost:8000/patients/5e9b0f0279e29c15b036edf7(patient          key)/all_reports.
6. Find reports based on disease status : http://localhost:8000/reports/Positive-Admit (pass on the status name to get the reports)
  
