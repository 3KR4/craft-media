function getCurrentUserId () {
  let urlParams = new URLSearchParams(window.location.search)
  let postid = urlParams.get("postid")
  return postid
}
let postId = getCurrentUserId()

axios.get(`http://tarmeezAcademy.com/api/v1/posts/${postId}`)
.then((response) => {
  let post = response.data.data
    //! allChecksInPost
    let user = getCurrentUser()
    let isMyPost = user != null && post.author.id == user.id
    let postSettingMenue = ``

    let isReacted = emojePasket.find((x) => x.id === post.id)
    if (isReacted) {
      if (isReacted.emoje == "Like") {
        postEmoje =`
          <i class="fa-solid fa-thumbs-up"></i>
          <h4 font-size: 16px;">${isReacted.emoje}</h4>
      `
      } else {
          postEmoje =`
          <img src="img/emoji img/${isReacted.emoje}.svg"></img>
          <h4 style="color: ${isReacted.color}; font-size: 16px;">${isReacted.emoje}</h4>
        `
      }
      isliked = "active"
    } else {
      postEmoje =`
        <i class="fa-regular fa-thumbs-up"></i>
        Like
      `
      isliked = ""
    }
    const isLogin = localStorage.getItem("token")
      if (isLogin) {

        if(isMyPost) {
          postSettingMenue = `
            <li onclick="openAddEditPost(false, '${encodeURIComponent(JSON.stringify(post))}')">
            <i class="fa-regular fa-pen-to-square"></i> Edit Post</li>
            <li class="savePost" onclick="clickSavePost('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-bookmarks-fill"></i> Save Post</li>
            <li class="unsavePost" onclick="clickUnSavePost(${post.id})"><i class="bi bi-bookmarks"></i> unSave Post</li>
            <hr>
            <li onclick="clickHidePost(${post.id})" class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
            <li onclick="openDeletePost('${encodeURIComponent(JSON.stringify(post))}')" class="red-hover"><i class="bi bi-trash"></i> Delete Post</li>
          `
        } else {
          postSettingMenue = `
          <li class="savePost" onclick="clickSavePost('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-bookmarks-fill"></i> Save Post</li>
            <li class="unsavePost" onclick="clickUnSavePost(${post.id})"><i class="bi bi-bookmarks"></i> unSave Post</li>
            <li class="addFriendBtn" onclick="clickAddFriends('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-person-plus"></i> Add Frind</li>
            <li class="removeFriendBtn" onclick="clickRemoveFriends('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-person-x"></i> Remove Frind</li>
            <hr>
            <li onclick="clickHidePost(${post.id})" class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
            <li class="red-hover blockUser" onclick="clickBlock('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-exclamation-circle"></i> Block User</li>
            <li class="red-hover unblockUser" onclick="removeBlock('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-exclamation-circle"></i>unBlock</li>
          `
        }

        postSetting = `
        <div class="icon-setting">
          <i class="bi bi-three-dots open"></i>
          <i class="bi bi-x close"></i>
          <ul class="postSettingMenu">
          ${postSettingMenue}
          </ul>
        </div>
        `

        likeHolder = `
          <h3 onclick="clickLike(${post.id})" onmouseenter="showReactsHolder(${post.id})" onmouseleave="hideReactsHolder(${post.id})" class="reacts-btn ${isliked}" id="reacts-btn-holder-${post.id}">
            <div id="reacts-btn-${post.id}">
              ${postEmoje}
            </div>
          </h3>
        `
      } else { 
        postSetting = ""

        likeHolder = `
          <h3 onclick="clickLikeWithoutLogin(${post.id})" class="reacts-btn" id="reacts-btn-holder-${post.id}">
            <div id="reacts-btn-${post.id}">
              <i class="fa-regular fa-thumbs-up"></i>
              Like
            </div>
            <small class="notLoginHidden1">you need to login first</small>
          </h3>
        `
      }
    let isHide = hidePasket.find((x) => x.id === post.id)
    if (isHide) {
      hidePost = "hidePost"
    } else {
      hidePost = ""
    }
    let isBlock = blockPasket.find((x) => x.id === post.author.id)
    if (isBlock) {
      blockUser = "blocked"
    } else {
      blockUser = ""
    }
    let isFriend = friendsPasket.find((x) => x.id === post.author.id)
    if (isFriend) {
      friendPost = "friend"
    } else {
      friendPost = ""
    }
    let isFavorit = favoritBasket.find((x) => x.id === post.id)
    if (isFavorit) {
      favoritPost = "favorit"
    } else {
      favoritPost = ""
    }

  document.querySelector(".single-post-holder").innerHTML = 
  `
  <a class="seePostClose" href="index.html"><i class="fa-solid fa-xmark"></i></a>
  <div class="image imageTop"><img class="main-img" src="${post.image == "[object Object]" ? "img/ifnoimg.png" : post.image}" alt=""></div>
  <div class="post ${favoritPost} ${friendPost} ${hidePost} ${blockUser}" id="${post.id}">
    <div class="seePostTopHolder">
      <div class="holder">
        <div class="info">
        <div class="holderrr">
        <a href="index.html"><i onclick="closeSinglePost()" class="fa-solid fa-xmark seePostClose-mopile"></i></a>
          <div onclick="clickUserProfile(${post.author.id})" class="user">
            <div>
              <img src="${post.author.profile_image == "[object Object]" ? "img/aulter.png" : post.author.profile_image}" alt="">
              <div class="text">
                <h4 class="user-name">${post.author.username}</h4>
                <span class="time">${post.created_at}</span>
              </div>
            </div>
          </div>
        </div>
          ${postSetting}
        </div>
        <div class="titles">
          <h4>${post.title === null ? "" : post.title}</h4>
          <p>${post.body  === null ? "" : post.body}</p>
        </div>
        <hr>
      </div>
      <div class="image imageMiddle"><img class="main-img" src="${post.image == "[object Object]" ? "img/ifnoimg.png" : post.image}" alt=""></div>
      <div class="otherUsersComment">
      

      </div>
    </div>
    <div class="holder holder-2">
      <div class="comment">
          <div class="reactsss">
            <img src="img/emoji img/like.svg" alt="">
            <img src="img/emoji img/love.svg" alt="">
            <img src="img/emoji img/haha.svg" alt="">
            <h6>${post.comments_count + 3}</h6>
          </div>
          <h5><span>${post.comments_count}</span> comments</h5>
      </div>
      <hr>
      <div class="other">

      <div id="reacts-holder-${post.id}" class="reacts-holder">
        <img onclick="clickLikeEmoje(${post.id})" src="img/emoji img/like.svg"></img>
        <img onclick="clickEmoje(${post.id}, 'Love', '#e65065')" src="img/emoji img/love.svg"></img>
        <img onclick="clickEmoje(${post.id}, 'Care', '#e0a93b')" src="img/emoji img/care.svg"></img>
        <img onclick="clickEmoje(${post.id}, 'Haha', '#e0a93b')" src="img/emoji img/haha.svg"></img>
        <img onclick="clickEmoje(${post.id}, 'wow', '#e0a93b')" src="img/emoji img/wow.svg"></img>
        <img onclick="clickEmoje(${post.id}, 'Sad', '#e0a93b')" src="img/emoji img/sad.svg"></img>
        <img onclick="clickEmoje(${post.id}, 'Angry', '#cb732b')" src="img/emoji img/angry.svg"></img>
      </div>

        ${likeHolder}
        <h3>
          <i class="bi bi-chat-left-text comment"></i>
          Comment
        </h3>
        <h3 onclick="openSharePost(${post.id})">
          <i class="fa-regular fa-share-from-square"></i>
          Share
        </h3>
      </div>
      <div id="send-comment" class="send-comment">
        <img src="img/icon.jpeg" alt="">
        <div class="input">
        <textarea name="" id="comment-input-${post.id}" placeholder="Type a Comment"></textarea>
        <i onclick="createCommentClicked(${post.id}, true, false, true)" class="bi bi-send" id="xasxax"></i>
        </div>
      </div>
    </div>
  </div>
  `

singlePostComments(response, true)
}).catch((error) => {
    console.log(error);
})