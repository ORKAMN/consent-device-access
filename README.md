# Consent-Based Device Access Demo

This project demonstrates browser permissions with explicit user consent.

## Important limitations

A normal web page cannot obtain "full access to a phone". Browsers intentionally restrict access to private device data.

This demo can request:
- Camera
- Microphone
- Geolocation
- User-selected files
- User-selected screen sharing

The browser/OS controls each permission. Contacts, SMS, call history, arbitrary files, installed apps, and unrestricted device control are not available to a normal web page.

## Run locally

Use a local HTTPS server (camera/microphone/geolocation generally require a secure context such as HTTPS or localhost).

## Deploy to Cloudflare Workers

1. Create a GitHub repository and upload `worker.js`.
2. In Cloudflare, create a Worker.
3. Paste/deploy `worker.js`.
4. Open the generated HTTPS `workers.dev` URL.
5. Test each permission separately.

Never collect or upload recordings/location/files unless the user has separately agreed to that specific collection and you clearly explain what is stored, why, and for how long.
