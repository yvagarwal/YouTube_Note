let boookmarkNo = 0;

var ytpointer = document.querySelector (
  '#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar > div.ytp-scrubber-container'
);

function markBookmark (pos) {
  var bookmarkContainer = document.querySelector ('#bookmarks-container');

  bookmarkContainer.insertAdjacentHTML (
    'beforeend',
    '<div class="bookmarks-container__item" id="bookmark' +
      boookmarkNo +
      '"  style="left:' +
      pos +
      '%;"/>;'
  );

  console.log ('Bookmark Inserted');

  boookmarkNo = boookmarkNo + 1;
}

// inserting the stored bookmarks
function insertBookmarks () {
  let urlSearch = window.location.search;
  let vidId = urlSearch.substr (urlSearch.search ('v=') + 2, 11);

  chrome.runtime.sendMessage (
    {message: 'getSavedBookmarks', vidId: vidId},
    response => {
      if (response.message === 'success') {
        let bookmarks = response.payload;
        console.log (bookmarks.marks);

        for (let i = 0; i < bookmarks.marks.length; i = i+1) {
          console.log (bookmarks.marks[i]);
          markBookmark (bookmarks.marks[i]);
        }
      }
    }
  );
}

insertBookmarks ();

// adding bookmark on click
chrome.runtime.onMessage.addListener ((request, sender, sendResponse) => {
  if (request.message == 'addBookmark') {
    const x = document.querySelector ('#movie_player > div.ytp-chrome-bottom')
      .style.width.length;
    var lbar = parseInt (
      document
        .querySelector ('#movie_player > div.ytp-chrome-bottom')
        .style.width.substr (0, x - 2)
    );
    var pos = parseInt (ytpointer.style.transform.substr (11, 6));
    pos = pos / lbar * 100;

    //

    markBookmark (pos); // mark on porogress bar

    // tell backgroundjs to save bookmark in background
    let urlSearch = window.location.search;
    let vidId = urlSearch.substr (urlSearch.search ('v=') + 2, 11);
    chrome.runtime.sendMessage (
      {message: 'saveBookmark', vidId: vidId, pos: pos, note: request.note},
      () => {
        console.log ('BookMark Saved!');
      }
    );
  }
});
