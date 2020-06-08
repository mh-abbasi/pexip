# Pexip Assignment

1. Open a terminal
2. Navigate to backend directory
3. Run `npm install`
4. Navigate to frontend directory
5. Run `npm install`
6. First run `npm run start` or `yarn start` in backend directory
8. Cause we are using ssl certs on localhost we should disable insecure checks
on the browser, for chrome open `chrome://flags/#allow-insecure-localhost` and enable the flag.
on Firefox you can navigate to `Options > Certificates > View Certificates > Servers` and click on
Add exception, then type in `localhost:5000` and click on `Get Certificate` and `Confirm Security Exception`.
7. Then run `npm start` or `yarn start` in frontend directory
8. Login with any username
