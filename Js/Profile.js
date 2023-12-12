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
    friendsPasket.reverse()
    return (friendsHolder.innerHTML = friendsPasket.map((x) => {
        return `
        <div  class="friend">
          <i onclick="clickRemoveFriendsinProfile('${encodeURIComponent(JSON.stringify(x))}')" class="bi bi-x close"></i>
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
function isMyProfile () {
  let id = getCurrentUserId()
  let myId = getCurrentUser()

  if (Number(id) != myId.id) {
    document.querySelector(".profile-buttons.my").style.display = "none"
    document.querySelector(".profile-buttons.notMY").style.display = "flex"


    profileHolder.classList.add("nofrind")   
    document.querySelector(".bigBigHolder .left").innerHTML = ""
    document.querySelector(".profile-buttons.my").style.display = "none"

    let isFriend = friendsPasket.find((x) => x.id == id)
    if (isFriend) {
      document.querySelector(".main-ProfilePage-holder .user-info").classList.add("friend")
    } else {
      document.querySelector(".main-ProfilePage-holder .user-info").classList.remove("friend")
    }


  } else {
    document.querySelector(".profile-buttons.my").style.display = "flex"
    document.querySelector(".profile-buttons.notMY").style.display = "none"

    profileHolder.classList.remove("nofrind")   
    document.querySelector(".profile-buttons").style.display = "flex"
    getUserFriends() 
  }
}
isMyProfile()

function userProfileInfo () {
  let id = getCurrentUserId()
  axios.get(`http://tarmeezAcademy.com/api/v1/users/${id}`)
    .then((response) => {
      const user = response.data.data
      coverImg.src = userPasket.cover
      
      document.getElementById("userImage").src = user.profile_image == "[object Object]" ? "img/aulter.png" : user.profile_image
      document.getElementById("userName").innerHTML = user.name
      document.getElementById("userPostsCount").innerHTML = user.posts_count
      document.getElementById("userTweet").innerHTML = user.comments_count
      friendsLength()
    })
}
userProfileInfo()

if (userPasket.cover == "") {
  document.getElementById("typeOfCoverImg").innerHTML = "Add Cover Photo"
} else {
  document.getElementById("typeOfCoverImg").innerHTML = "Edit Cover Photo"
}

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
  console.log(coverImg.src);
})


function friendsLength () {
  let userFriendsCount = document.querySelectorAll(".userFriendsCount")
  for (let frindsNumper of userFriendsCount) {
    frindsNumper.innerHTML = friendsPasket.length
  }
}
let userPosts = document.querySelector(".userPosts")
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
  } else {
    localStorage.setItem("post-style", "grid")
    userPosts.classList.add("active")
  }
}

if (localStorage.getItem("post-style") === "list") {
  listGrid[0].classList.remove("active")
  listGrid[1].classList.add("active")
  userPosts.classList.remove("active")
} else {
  listGrid[0].classList.add("active")
  listGrid[1].classList.remove("active")
  userPosts.classList.add("active")
}
}
listOrGrid ()
let friendsHolder = document.querySelector(".bigBigHolder .left .friends")

function getUserPosts () {
  let id = getCurrentUserId()
  axios.get(`http://tarmeezAcademy.com/api/v1/users/${id}/posts`)
.then((response) => {
  const posts = response.data.data
  posts.reverse()
  for(let post of posts) {
    let user = getCurrentUser()
    let isMyPost = user != null && post.author.id == user.id
    let postSettingMenue = ``
    if(isMyPost) {
      postSettingMenue = `
        <li onclick="openAddEditPost(false, '${encodeURIComponent(JSON.stringify(post))}')">
        <i class="fa-regular fa-pen-to-square"></i> Edit Post
        </li>
        <li><i class="bi bi-bookmarks"></i> Save Post</li>
        <hr>
        <li class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
        <li onclick="openDeletePost('${encodeURIComponent(JSON.stringify(post))}')" class="red-hover"><i class="bi bi-trash"></i> Delete Post</li>
      `
    } else {
      postSettingMenue = `
        <li><i class="bi bi-bookmarks"></i> Save Post</li>
        <li><i class="bi bi-person-plus"></i> Add Frind</li>
        <hr>
        <li class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
        <li class="red-hover"><i class="bi bi-exclamation-circle"></i> Report Post</li>
      `
    }

    let content = `
    <div class="post" id="${post.id}">
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
      <img onclick="openSinglePost(${post.id})" class="main-img" src="${post.image}" alt="">
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
          <img onclick="clickEmoje(${post.id}, 'Care')" src="img/emoji img/care.svg"></img>
          <img onclick="clickEmoje(${post.id}, 'Haha')" src="img/emoji img/haha.svg"></img>
          <img onclick="clickEmoje(${post.id}, 'wow')" src="img/emoji img/wow.svg"></img>
          <img onclick="clickEmoje(${post.id}, 'Sad')" src="img/emoji img/sad.svg"></img>
          <img onclick="clickEmoje(${post.id}, 'Angry', '#cb732b')" src="img/emoji img/angry.svg"></img>
        </div>

          <h3 onclick="clickLike(${post.id})" onmouseenter="showReactsHolder(${post.id})" onmouseleave="hideReactsHolder(${post.id})" class="reacts-btn" id="reacts-btn-holder-${post.id}">
              <div id="reacts-btn-${post.id}">
                <i class="fa-regular fa-thumbs-up"></i>
                Like
              </div>

          </h3>
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

      <div id="send-comment-${post.id}" class="send-comment">
        <img src="img/icon.jpeg" alt="">
        <div class="input">
        <textarea name="" id="comment-input-${post.id}" placeholder="Type a Comment"></textarea>
          <i onclick="createCommentClicked(${post.id})" class="bi bi-send"></i>
        </div>
      </div>
    </div>
  </div>
    `
    userPosts.innerHTML += content
  }
}).catch((error) => {

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