function getCurrentUserId () {
  let urlParams = new URLSearchParams(window.location.search)
  let userProfileId = urlParams.get("userid")
  return userProfileId
}
let getUserFriends = () => {   
  let friendsHolder = document.querySelector(".bigBigHolder .left .friends")
  let profileHolder = document.querySelector(".main-ProfilePage-holder .bigBigHolder")
  if (friendsPasket.length !== 0) {
    profileHolder.classList.remove("nofrind")   
    
    return (friendsHolder.innerHTML = friendsPasket.map((x) => {
        return `
        <div  class="friend">
          <i title="Remove Friend" onclick="clickRemoveFriendsinProfile('${encodeURIComponent(JSON.stringify(x))}')" class="bi bi-x close"></i>
          <img onclick="clickUserProfile(${x.id})" src="${x.img == "[object Object]" ? "img/aulter.png" : x.img}" alt="">
          <h5 onclick="clickUserProfile(${x.id})">${x.name}</h5>
        </div>
        `
      }).join("")
    )
  } else {   
    profileHolder.classList.add("nofrind")   
    document.querySelector(".bigBigHolder .left").innerHTML = ""
  }
}
let profileHolder = document.querySelector(".main-ProfilePage-holder .bigBigHolder")

function userProfileInfo () {
  let id = getCurrentUserId()
  axios.get(`http://tarmeezAcademy.com/api/v1/users/${id}`)
    .then((response) => {
      const user = response.data.data
      console.log(user);

      let myId = getCurrentUser()
      const isLogin = localStorage.getItem("token")
      if(!isLogin) {
        document.querySelector(".notMY").style.display = "none"
      }
      if (!isLogin || Number(id) != myId.id) {
        document.querySelector(".profile-buttons.my").style.display = "none"
        document.querySelector(".main-ProfilePage-holder .holders").style.display = "none"
        profileHolder.classList.add("nofrind")   
        document.querySelector(".bigBigHolder .left").innerHTML = ""
        document.querySelector(".profile-buttons.my").style.display = "none"
        document.querySelector(".image-cover button").style.display = "none"
        document.querySelector("nav li.li").style.display = "none"
        document.querySelector(".manege-post-holder .filters").style.display = "none"
        document.querySelector(".manege-post-holder hr").style.display = "none"
        document.getElementById("userImage").src = user.profile_image == "[object Object]" ? "img/aulter.png" : user.profile_image
        
    
        let isFriend = friendsPasket.find((x) => x.id == id)
        if (isFriend) {
          document.querySelector(".main-ProfilePage-holder .user-info").classList.add("friend")
        } else {
          document.querySelector(".main-ProfilePage-holder .user-info").classList.remove("friend")
        }
        
      } else {
        const storageUser = localStorage.getItem("user")
        userLocal = JSON.parse(storageUser)
        document.getElementById("userImage").src = userLocal.profile_image == "[object Object]" ? "img/aulter.png" : userLocal.profile_image
        document.querySelector(".bio").innerHTML = userLocal.bio == "" ? "There are no bio yet" : userLocal.bio
        document.querySelector(".profile-buttons.my").style.display = "flex"
        document.querySelector(".notMY").style.display = "none"
        profileHolder.classList.remove("nofrind")   
        document.querySelector(".profile-buttons").style.display = "flex"
        getUserFriends() 
        document.querySelector(".image-cover img").src = userPasket.cover == "" ? "img/cover.png" : userPasket.cover
    
        if (userPasket.cover == "") {
          document.getElementById("typeOfCoverImg").innerHTML = "Add Cover Photo"
        } else {
          document.getElementById("typeOfCoverImg").innerHTML = "Edit Cover Photo"
        }
        document.querySelector(".main-ProfilePage-holder .holders").style.display = "flex"
      }

      document.getElementById("userName").innerHTML = user.name
      document.getElementById("userPostsCount").innerHTML = user.posts_count
      document.getElementById("userTweet").innerHTML = user.comments_count
      friendsLength()
    })
}
userProfileInfo()

let coverInput = document.getElementById("coverimginput")
let coverImg = document.querySelector(".image-cover img")
coverInput.addEventListener("change", function() { 
  coverImg.src = URL.createObjectURL(coverInput.files[0]);

  if (userPasket.cover === undefined) {
    userPasket["cover"] = coverImg.src
  } else {
    userPasket["cover"] = coverImg.src
  }
  localStorage.setItem("user", JSON.stringify(userPasket))
})

let userImageInput = document.querySelector(".user-image-input")
let userImg = document.querySelector("#userImage")
userImageInput.addEventListener("change", function() { 
  userImg.src = URL.createObjectURL(userImageInput.files[0]);
    userPasket["profile_image"] = userImg.src
  localStorage.setItem("user", JSON.stringify(userPasket))
  setTimeout(() => {
    location.reload()
  }, 50);
})

function friendsLength () {
  let userFriendsCount = document.querySelectorAll(".userFriendsCount")
  for (let frindsNumper of userFriendsCount) {
    frindsNumper.innerHTML = friendsPasket.length
  }
}
function blockLength () {
  let blockNum = document.querySelector(".black-List .top span")
  blockNum.innerHTML = blockPasket.length
}
let userPosts = document.querySelector(".userPosts")
let bigBigHolderRight = document.querySelector(".bigBigHolder")
function listOrGrid () {
  let listGrid =  document.querySelectorAll(".list-grid button")

listGrid.forEach((li) => {
  li.addEventListener("click", removeClicked)
});
function removeClicked() {
  listGrid.forEach((el) => {
    el.classList.remove("active")
    this.classList.add("active")
  });

  if(listGrid[1].classList.contains("active")) {
    localStorage.setItem("post-style", "list")
    userPosts.classList.remove("active")
    if (bigBigHolderRight.classList.contains("nofrind")) { 
      document.querySelector(".bigBigHolder.nofrind .right").style.width = "56%"
    }
  } else {
    localStorage.setItem("post-style", "grid")
    userPosts.classList.add("active")
    if (bigBigHolderRight.classList.contains("nofrind")) { 
      document.querySelector(".bigBigHolder.nofrind .right").style.width = "82%"
    }
  }
}

if (localStorage.getItem("post-style") === "list") {
  listGrid[0].classList.remove("active")
  listGrid[1].classList.add("active")
  userPosts.classList.remove("active")

    document.querySelector(".bigBigHolder .right").style.width = "56%"
} else {
  listGrid[0].classList.add("active")
  listGrid[1].classList.remove("active")
  userPosts.classList.add("active")
}
}
listOrGrid ()

function getUserPosts () {
  userPosts.innerHTML = ""
  let id = getCurrentUserId()
  axios.get(`http://tarmeezAcademy.com/api/v1/users/${id}/posts`)
.then((response) => {
  const posts = response.data.data
  posts.reverse()
  for(let post of posts) {
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

      commentHolder = `
        <div id="send-comment-${post.id}" class="send-comment">
          <img src="${user.profile_image}" alt="">
          <div class="input">
          <textarea name="" id="comment-input-${post.id}" placeholder="Type a Comment"></textarea>
            <i onclick="createCommentClicked(${post.id}, false)" class="bi bi-send"></i>
          </div>
        </div>
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
      commentHolder = ``
    }
    let isHide = hidePasket.find((x) => x.id === post.id)
    if (isHide) {
      hidePost = "hidePost"
    } else {
      hidePost = ""
    }
    let isFavorit = favoritBasket.find((x) => x.id === post.id)
    if (isFavorit) {
      favoritPost = "favorit"
    } else {
      favoritPost = ""
    }
    let content = `
    <div class="post ${favoritPost} ${hidePost}" id="${post.id}">
    <div class="holder">
      <div class="info">
        <div class="user">
          <img src="${post.author.profile_image == "[object Object]" ? "img/aulter.png" : post.author.profile_image}" alt="">
          <div class="text">
            <h4 class="user-name">${post.author.username}</h4>
            <span class="time">${post.created_at}</span>
          </div>
        </div>
        <div class="icon-setting">
          <i class="bi bi-three-dots open"></i>
          <i class="bi bi-x close"></i>
          <ul class="postSettingMenu">
          ${postSettingMenue}
          </ul>
        </div>
      </div>
      <div class="titles">
        <h4>${post.title === null ? "" : post.title}</h4>
        <p>${post.body  === null ? "" : post.body}</p>
      </div>
    </div>

    <div onclick="openSinglePost(${post.id})" class="grid-img-holder">
      <img onclick="openSinglePost(${post.id})" class="main-img" src="${post.image == "[object Object]" ? "img/ifnoimg.png" : post.image}" alt="">
      <h4 class="gridComment"><i class="bi bi-chat-left-text"></i>  ${post.comments_count}</h4>
      <h4 class="gridTitle">${post.title === null ? "" : post.title}</h4>
    </div>
    
    <div class="holder">
      <div class="comment">
          <div class="reactsss">
              <img src="img/emoji img/like.svg" alt="">
              <img src="img/emoji img/love.svg" alt="">
              <img src="img/emoji img/haha.svg" alt="">
            <h6>5</h6>
          </div>
          <h5 onclick="openSinglePost(${post.id})"><span>${post.comments_count}</span> comments</h5>
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
        <h3 id="clickComment-${post.id}" onclick="clickComment(${post.id})">
          <i class="bi bi-chat-left-text comment"></i>
          Comment
          <small>you need to login first</small>
        </h3>
        <h3 onclick="openSharePost(${post.id})">
          <i class="fa-regular fa-share-from-square"></i>
          Share
        </h3>
      </div>

      ${commentHolder}
    </div>
  </div>
    `
    userPosts.innerHTML += content
  }
})
}
getUserPosts()

let leftHolder = document.querySelector(".bigBigHolder .left")
window.addEventListener("scroll", function () {
  leftHolder.classList.toggle("start", window.scrollY > 665);
},);
window.addEventListener("scroll", function () {
  leftHolder.classList.toggle("stop", window.scrollY > document.body.scrollHeight - 1000);
});
function addFrindIntopProfile () {
  let id = getCurrentUserId()
  axios.get(`http://tarmeezAcademy.com/api/v1/users/${id}`)
    .then((response) => {
      const user = response.data.data
      let search = friendsPasket.find((x) => x.id === user.id) 
      if (search === undefined) {
        friendsPasket.push({
          id: user.id,
          name: user.name,
          img: user.profile_image
        })
      }
      localStorage.setItem("friends", JSON.stringify(friendsPasket)) 
      document.querySelector(".main-ProfilePage-holder .user-info").classList.add("friend")
  })
}
function removeFrindIntopProfile () {
  let id = getCurrentUserId()
  friendsPasket = friendsPasket.filter((x) => x.id != id)
  localStorage.setItem("friends", JSON.stringify(friendsPasket))
  document.querySelector(".main-ProfilePage-holder .user-info").classList.remove("friend")
}
function  clickRemoveFriendsinProfile (userFriend) {
  let post = JSON.parse(decodeURIComponent(userFriend))
  friendsPasket = friendsPasket.filter((x) => x.id !== post.id)
  localStorage.setItem("friends", JSON.stringify(friendsPasket))
  getUserFriends()
  friendsLength()
}

let choosePosts = document.querySelector(".choosePosts")
let postsOptions = document.querySelectorAll("ul.choosePosts li")
postsOptions[1].addEventListener("click", () => {
  choosePosts.classList.add("active")
  getUserFavorietsPosts()
  document.querySelector(".postsType").innerHTML = "My Favorites"
})
postsOptions[0].addEventListener("click", () => {
  choosePosts.classList.remove("active")
  getUserPosts()
  document.querySelector(".manege-post-holder").classList.remove("favoriets")
  document.querySelector(".postsType").innerHTML = "My Posts"
  userPosts.classList.add("active")
})
function getUserFavorietsPosts() {
  userPosts.innerHTML = ""
  document.querySelector(".manege-post-holder").classList.add("favoriets")
  if (favoritBasket.length !== 0) {
    userPosts.classList.add("active")
    favoritBasket.reverse()
    return (userPosts.innerHTML = favoritBasket.map((x) => {
      console.log(x);
        return `
        <div class="post" id="${x.id}">
        <i onclick="clickUnSavePost(${x.id}, 'profile')" title="unSave This Post" class="bi bi-x close"></i>
        <div onclick="openSinglePost(${x.id})" class="grid-img-holder">
          <img onclick="openSinglePost(${x.id})" class="main-img" src="${x.img}" alt="">
          <h4 class="gridTitle">${x.body === null ? "" : x.body}</h4>
        </div>
      </div>
        `
      }).join("")
    )
  } else {
    userPosts.classList.remove("active")
    var newSpan = document.createElement("span");
    newSpan.textContent = "There are no videos added to the favorites list!";
    userPosts.appendChild(newSpan);
  }
}
function openBlackList () {
  document.querySelector(".black-List").classList.add("active")
  document.querySelector(".black-List-holder").classList.add("active")
  body.style.setProperty("overflow", "hidden")
  if (blockPasket.length === 0) {
    document.querySelector(".black-List span.p").style.display = "block"
    document.querySelector(".black-List .top").style.display = "none"
  } else {
    blockLength ()
    let blocksHolder = document.querySelector(".blocksHolder")
    return (blocksHolder.innerHTML = blockPasket.map((x) => {
        return `
        <div class="block">
          <div>
            <img src="${x.img == "[object Object]" ? "img/aulter.png" : x.img}" alt="">
            <h5 class="name">${x.name}</h5>
          </div>
          <button class="removeBlock create-post-btn" onclick="removeBlock('${encodeURIComponent(JSON.stringify(x))}', 'profile')">Remove Block</button>
        </div>
        `
      }).join("")
    )
  }
}
function closeBlackList () {
  document.querySelector(".black-List").classList.remove("active")
  document.querySelector(".black-List-holder").classList.remove("active")
  body.style.setProperty("overflow", "auto")
}


//!============== BIO ================
let bioInput = document.getElementById("bio")
function openEditBio () {
  document.querySelector(".editBio").classList.add("active")
  document.querySelector(".editBio-holder").classList.add("active")
  body.style.setProperty("overflow", "hidden")

  const storageUser = localStorage.getItem("user")
  userLocal = JSON.parse(storageUser)
  bioInput.value = userLocal.bio
}
function closeEditBio () {
  document.querySelector(".editBio").classList.remove("active")
  document.querySelector(".editBio-holder").classList.remove("active")
  body.style.setProperty("overflow", "auto")
}
function editBio () {
  if (bioInput.value != "") {
    userPasket["bio"] = bioInput.value
    localStorage.setItem("user", JSON.stringify(userPasket))
    document.querySelector(".bio").innerHTML = bioInput.value
    closeEditBio()
  } else {
    mainAlert("error", "exclamation",  "warning", "You haven't written anything yet")
    openAlert()
  }
}
function deleteBio () {
  userPasket["bio"] = ""
  localStorage.setItem("user", JSON.stringify(userPasket))
  document.querySelector(".bio").innerHTML = "There are no bio yet"
  closeEditBio()
}