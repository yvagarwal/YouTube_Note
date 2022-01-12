let user_signed_in = false;

const CLIENT_ID = encodeURIComponent (
  '655758608879 - ldb1rpg4qqroiijnvrgvh2ikq20f2io0.apps.googleusercontent.com'
);
const RESPONSE_TYPE = encodeURIComponent ('id_token');
const REDIRECT_URI = encodeURIComponent ('https://www.google.com/');
const STATE = encodeURIComponent ('akdjkfj');
const SCOPE = encodeURIComponent ('youtube-note');
const PROMPT = encodeURIComponent ('consent');

function create_oauth2_url () {
  let nonce = encodeURIComponent (
    Math.random ().toString (36).substring (2, 15) +
      Math.random ().toString (36).substring (2, 15)
  );

  let url = `https://account.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}&prompt=${PROMPT}&nonce=${nonce}`;

  console.log (url);

  return url;
}

function is_user_signed_in () {
  return user_signed_in;
}

chrome.runtime.onMessage.addListener ((request, sender, sendResponse) => {
  if (request.message == 'login') {
    if (user_signed_in) {
      console.log ('User is already signed in');
    } else {
      chrome.identity.getAuthToken ({interactive: true}, function (auth_token) {
        user_signed_in = true;
        console.log (auth_token);
      });
      sendResponse (true);
    }
  } else if (request.message == 'get_profile') {
    // chrome.identity.getAuthToken ({interactive: true}, function (auth_token) {
    //   user_signed_in = true;
    //   console.log (auth_token);
    // });
    console.log ('get_profile');
    chrome.identity.getProfileUserInfo ({accountStatus: 'ANY'}, function (
      user_info
    ) {
      console.log (user_info);
    });
  } else if (request.message == 'isUserSignedIn') {
  } else if (request.message == 'getAccount') {
    chrome.identity.getAccounts (account => {
      console.log (account);
    });
  }
});
