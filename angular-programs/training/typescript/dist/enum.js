"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginStatus;
(function (LoginStatus) {
    LoginStatus["Success"] = "SUCCESS";
    LoginStatus["Failure"] = "FAILURE";
    LoginStatus["Pending"] = "PENDING";
})(LoginStatus || (LoginStatus = {}));
// Variable with type annotation
let status = LoginStatus.Success;
// Function that accepts only LoginStatus values
function printLoginStatus(status) {
    if (status === LoginStatus.Success) {
        console.log(status); // Output: SUCCESS
    }
}
// Call the function
printLoginStatus(status);
