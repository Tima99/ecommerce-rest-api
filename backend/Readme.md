# API for ecommerce website

## Features

* Send Otp to Given Phone
* Verify Otp
* Sign Up
* Log in

### Get Otp to verify Phone

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

```
"Otp Verified!"
```

Otherwise errors if found.