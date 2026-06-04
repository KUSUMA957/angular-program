enum LoginStatus {
    Success = "SUCCESS",
    Failure = "FAILURE",
    Pending = "PENDING"
}

// Variable with type annotation
let status: LoginStatus = LoginStatus.Success;

// Function that accepts only LoginStatus values
function printLoginStatus(status: LoginStatus) {
    if (status === LoginStatus.Success) {
        console.log(status); // Output: SUCCESS
    }
}

// Call the function
printLoginStatus(status);