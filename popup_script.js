async function getCurrentTab () {
  let queryOptions = {active: true, currentWindow: true};
  let [tab] = await chrome.tabs.query (queryOptions);
  return tab;
}

const button_note = document.querySelector ('body > div > button');


button_note.addEventListener ('click', function () {
  chrome.runtime.sendMessage({message : "login"}, response => {
    console.log("Logged In");
  });
});
