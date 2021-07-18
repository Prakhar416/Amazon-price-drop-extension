chrome.runtime.onInstalled.addListener(()=>{
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/products",
        data: { testData: "Hi i am the test data from the ajax post request call" },
        success: function(response){
            console.log(response.data);
        }
    });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`I am ${message.form}'s credentials:- email: ${message.email}, password: ${message.password}`);
    if(message.form==='signup'){
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/user/signup",
            data: { username: message.username, email: message.email, password: message.password },
            success: function(response){
               alert(response.message);
               chrome.storage.local.set({
                token: response.token
            });
            sendResponse({status:'success'});
            },
            error: function(response) {
                console.log('error: ', response)
                if(response.statusCode === 500) {
                    sendResponse({
                        status: 'Database Error',
                        action: 'Relogin'
                    })
                } else if(response.statuscode === 400) {
                    if(response.message === "User Already Exists") {
                        sendResponse({
                            status: 'Duplicate User',
                            action: 'Redirect Login'
                        })
                    } else if(response.errors) {
                        sendResponse({
                            status: 'Invalid Credentials',
                            errors: response.errors,
                            action: 'Reenter Creds'
                        }) 
                    }
                } else {
                    sendResponse({status: "error", response: response});
                }
            }
        });
        return true;
    }else{
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/user/login",
            data: { email: message.email, password: message.password },
            success: function(response){
               chrome.storage.local.set({
                   token: response.token
               });
               sendResponse({status:'success'});
            },
            error: function(response) {
                console.log('error: ', response)
                if(response.statusCode == 500) {
                    sendResponse({
                        status: 'Invalid Token',
                        action: 'Relogin'
                    })
                } else if(response.statusCode == 401) {
                    sendResponse({
                        status: 'Auth Error',
                        action: 'Relogin'
                    })
                } else if(response.statuscode == 400) {
                    sendResponse({
                        status: 'Invalid Credentials',
                        action: 'Reenter Credentials'
                    })
                } else {
                    sendResponse({status: "error", response: response});
                }
            }
        });
        return true;
    }
    
});