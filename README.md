# PulseCheck - Passive Team Activity & Collaboration Tracker
This is an app built using Next.js and Firebase as the backend.

## Features
- Modern Landing Page
- Connection to Github and Slack Accounts
- Authentication using Firebase
- Charts with usage data of github and slack (mock)
- Track the number of commits,messages sent, pull requests and blockers.

## How to run the app

The following variables are required in `.env` file

```
NEXT_PUBLIC_FIREBASE_API_KEY= 
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID= 
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= 
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= 
NEXT_PUBLIC_FIREBASE_APP_ID= 
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID= 

FIREBASE_PROJECT_ID= 
FIREBASE_PRIVATE_KEY= 
FIREBASE_CLIENT_EMAIL= 


NEXT_PUBLIC_SLACK_CLIENT_ID=
SLACK_CLIENT_SECRET=
NEXT_PUBLIC_SLACK_REDIRECT_URI=

RESEND_API_KEY = 
MAILERSEND_API_KEY =
```

These variables can be found while setting up firebase and while setting up slack oAuth Clients.
Resend and mailersend are mail providers, you may pick any one based on your choice.

Set `https://localhost:3000/api/slack/callback` as callback URL in slack (OAuth and Permissions).
You may setup Github with firebase Auth, by creating an OAuth application on github and linking to firebase.

Once the above steps are done, enter `npm run dev` to start the server.
