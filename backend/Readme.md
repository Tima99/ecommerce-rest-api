# API for ecommerce website

## Features

* Send Otp to Given Phone
* Verify Otp
* Sign Up
* Log in

### Send Otp to verify Phone

You have to make a post request on __<WEB_DOMAIN>/api/otp__ to send otp to phone

Provide data as an json
```
{
    phone : 0123456789
}
```

On sucessfull send otp to given phone return message
```
"Otp sent sucessfully" 
```

Otherwise shows error if found.

### Verify Otp

You have to make a GET request on __<WEB_DOMAIN>/api/otp/verify/\<phone>/\<otp>__

On Sucessful otp verify returns msg

Returns User Document when login and null when signup.

Otherwise errors if found.

### Sign Up

Make post request on __<WEB_DOMAIN>/signup__ 

Returns user document which is generated while signup 

### Update user document

Make post request on __<WEB_DOMAIN>/update/profile__

Passed data user document to update
```
{
    phone : "1919010..",
    name: "xxx",
    city: "xxxx",
    ....
}
```

Returns updated user document

### Authenticate user 

Make get Request on __<WEB_DOMAIN>/auth__

if user authenticated returns
userDocument

Otherwise returns statusCode = 401 and false as data

## logout 

Make get request on __/logout/<PhoneToLogout>

On sucess Logout

```
"Logout sucess! You have to login again"
```

Otherwise error message if found!