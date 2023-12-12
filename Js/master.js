let userPasket = JSON.parse(localStorage.getItem("user")) || []   
let emojePasket = JSON.parse(localStorage.getItem("Reacts")) || []   
let friendsPasket = JSON.parse(localStorage.getItem("friends")) || []
let hidePasket = JSON.parse(localStorage.getItem("hide")) || []      
let currentPage = 1
let lastPage = 1
window.addEventListener("scroll", function() {
    const endOfPage = window.innerHeight + window.pageYOffset >=  this.document.body.scrollHeight;
    if (endOfPage && currentPage < lastPage) {
      currentPage++
      getPosts(false, currentPage)
    }
  }
)
function getPosts (reload = true, page = 1) {
  axios.get(`http://tarmeezAcademy.com/api/v1/posts?limit=10&page=${page}`)
.then((response) => {
  const posts = response.data.data
  lastPage = response.data.meta.last_page
  if(reload){
      document.querySelector(".All-Posts").innerHTML = ""
  }
  for(let post of posts) {
    //! allChecksInPost
      let user = getCurrentUser()
      let isMyPost = user != null && post.author.id == user.id
      let postSettingMenue = ``
      if(isMyPost) {
        postSettingMenue = `
          <li onclick="openAddEditPost(false, '${encodeURIComponent(JSON.stringify(post))}')">
          <i class="fa-regular fa-pen-to-square"></i> Edit Post</li>
          <li><i class="bi bi-bookmarks"></i> Save Post</li>
          <hr>
          <li onclick="clickHidePost(${post.id})" class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
          <li onclick="openDeletePost('${encodeURIComponent(JSON.stringify(post))}')" class="red-hover"><i class="bi bi-trash"></i> Delete Post</li>
        `
      } else {
        postSettingMenue = `
          <li><i class="bi bi-bookmarks"></i> Save Post</li>
          <li class="addFriendBtn" onclick="clickAddFriends('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-person-plus"></i> Add Frind</li>
          <li class="removeFriendBtn" onclick="clickRemoveFriends('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-person-x"></i> Remove Frind</li>
          <hr>
          <li onclick="clickHidePost(${post.id})" class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
          <li class="red-hover"><i class="bi bi-exclamation-circle"></i> Report Post</li>
        `
      }
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
      let isHide = hidePasket.find((x) => x.id === post.id)
      if (isHide) {
        hidePost = "hidePost"
      } else {
        hidePost = ""
      }
      let isFriend = friendsPasket.find((x) => x.id === post.author.id)
      if (isFriend) {
        friendPost = "friend"
      } else {
        friendPost = ""
      }

    let content = `
    <div class="post ${hidePost} ${friendPost}" id="${post.id}">
      <div class="holder">
        <div class="info">
          <div onclick="clickUserProfile(${post.author.id})" class="user">
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
      <img onclick="openSinglePost(${post.id})" class="main-img" src="${post.image == "[object Object]" ? "img/ifnoimg.png" : post.image}" alt="">
      <div class="holder">
        <div class="comment">
            <div class="reactsss">
              <img src="img/emoji img/like.svg" alt="">
              <img src="img/emoji img/love.svg" alt="">
              <img src="img/emoji img/haha.svg" alt="">
              <h6>${post.comments_count == 0 ? 0 : post.comments_count + 2}</h6>
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

          <h3 onclick="clickLike(${post.id})" onmouseenter="showReactsHolder(${post.id})" onmouseleave="hideReactsHolder(${post.id})" class="reacts-btn ${isliked}" id="reacts-btn-holder-${post.id}">
              <div id="reacts-btn-${post.id}">
                ${postEmoje}
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
            <i onclick="createCommentClicked(${post.id}, false)" class="bi bi-send"></i>
          </div>
        </div>
      </div>
    </div>
    `
    document.querySelector(".All-Posts").innerHTML += content
  }
}).catch((error) => {
  console.log(error);
})
}
getPosts()

let addPost = document.querySelector(".add-post")
let addPostHolder = document.querySelector(".add-post-holder")
let username = document.querySelectorAll(".user-main-name")
let userimage = document.querySelectorAll(".user-main-img")

function setubUi () {
  const token = localStorage.getItem("token")
  if (token) { //YESSSSSSSSSS
    document.querySelector(".header .user .sign-in").style.display = "none"
    document.querySelector(".header .user .user-info").style.display = "flex"
    getCurrentUser()

  } else { //!NOOOOOOOOOOO
    document.querySelector(".header .user .sign-in").style.display = "block"
    document.querySelector(".header .user .user-info").style.display = "none"
    document.querySelector(".add-post-icon").style.display = "none"
    addPostHolder.style.display = "none"
  }
}
setubUi()
function getCurrentUser () {
  let user = null 
  const storageUser = localStorage.getItem("user")
  if(storageUser != null) {
    user = JSON.parse(storageUser)
    for (X of username) {
      X.innerHTML = user.username
    }
    for (y of userimage) {
      y.src = user.profile_image
    }
  }

  return user
}
function logOut () {
  localStorage.clear()
  location.href = "index.html"
  setubUi()
}
function clickUserProfile (userId) {
  window.location = `Profile.html?userid=${userId}`
}
function profileClicked () {
  let user = getCurrentUser()
  let userId = user.id
  window.location = `Profile.html?userid=${userId}`
}
//!======= CREATE AND EDIT POST =======
let postImage = document.querySelector(".add-post .imageSelected")
function openAddEditPost(bolem, postObject) {
  closeSinglePost()
  if (bolem) {
    document.querySelector(".add-post h2").innerHTML = "CREATE POST"
    document.querySelector(".add-post .create-post-btn").style.setProperty("display", "block")
    document.querySelector(".add-post .edit-btn").style.setProperty("display", "none")
    document.getElementById("postTitleInput").value = ""
    document.getElementById("postBodyInput").value = ""
    postImage.src = ""
    postImage.classList.remove("active")
  } else {
    let post = JSON.parse(decodeURIComponent(postObject))
    document.getElementById("post-id-input").innerHTML = `${post.id}`
    document.querySelector(".add-post h2").innerHTML = "EDIT POST"
    document.querySelector(".add-post .create-post-btn").style.setProperty("display", "none")
    document.querySelector(".add-post .edit-btn").style.setProperty("display", "block")
    document.getElementById("postTitleInput").value = post.title
    document.getElementById("postBodyInput").value = post.body
    postImage.src = post.image
    postImage.classList.add("active")
  }
  addPost.classList.add("active")
  addPostHolder.classList.add("active")
  body.style.setProperty("overflow", "hidden")
}
function closeAddPost () {
  addPost.classList.remove("active")
  addPostHolder.classList.remove("active")
  body.style.setProperty("overflow", "auto")
}
window.addEventListener("click" , (event) => {
  if (event.target.matches(".model")) {
    if (addPost.classList.contains("active")) {
      closeAddPost()
    }
  }
}) 
let postImageInputs = document.getElementById("postImageInput")
let userImageSelected = document.querySelector(".add-post .imageSelected")
function checkPostImages() {
  // img change
  postImageInputs.addEventListener("change", function() { 
  userImageSelected.classList.add("active")
  userImageSelected.src = URL.createObjectURL(postImageInputs.files[0]);
})
}
checkPostImages()
function CreateAndEditPost (bolem) { 
  let postTitleInput = document.getElementById("postTitleInput").value
  let postBodyInput = document.getElementById("postBodyInput").value
  let postImageInput = postImageInputs.files[0]
  let token = localStorage.getItem("token")

  let formData = new FormData()
  formData.append("title", postTitleInput)
  formData.append("body", postBodyInput)

  console.log(postImageInput);

  headerss = {
    "Content-Type": "multipart/form-data",
    "authorization": `Bearer ${token}`
  }
  if(bolem) {
    formData.append("image", postImageInput)
    axios.post("http://tarmeezAcademy.com/api/v1/posts", formData, {
      headers: headerss
    })
    .then((response) => {
      closeAddPost()
      mainAlert("success", "check", "Good", "the post has been created successfully")
      openAlert()
      getPosts()
    })
    .catch((error) => {
      mainAlert("error", "exclamation", "warning", error.response.data.message)
      openAlert()
    }) 
  } else {
    userImageSelected.src = URL.createObjectURL(postImageInputs.files[0]);
    formData.append("image", postImageInput)
    formData.append("_method", "put")
    let postId = document.getElementById("post-id-input").textContent
    axios.post(`http://tarmeezAcademy.com/api/v1/posts/${postId}`, formData, {
      headers: headerss
    })
    .then((response) => {
      closeAddPost()
      mainAlert("success", "check", "Good", "your post has been edit successfully")
      openAlert()
      getPosts()
    })
    .catch((error) => {
      mainAlert("error", "exclamation", "warning", error.response.data.message)
      openAlert()
    }) 
  }

}
//!======= Create Comment =======
function clickComment(postId){
  if (localStorage.getItem("token") == null) {
    let commentbtn = document.getElementById(`clickComment-${postId}`)
    commentbtn.querySelector("small").classList.add("active")

    setTimeout(() => {
      commentbtn.querySelector("small").classList.remove("active")
    }, 1500);

  } else {
    let comment = document.getElementById(`send-comment-${postId}`)
    let commentbtn = document.getElementById(`clickComment-${postId}`)
    commentbtn.classList.toggle("active")
    if (commentbtn.classList.contains("active")) {
      comment.style.display ="flex"
      commentbtn.innerHTML = `
      <i class="fa-solid fa-xmark"></i>
      Close Comment
      `
    } else {
      comment.style.display ="none"
      commentbtn.innerHTML = `
      <i class="bi bi-chat-left-text comment"></i>
      Comment
      `
    }
  }
}
function createCommentClicked(postId, bolem){
  if (localStorage.getItem("token") == null) {

    mainAlert("error", "exclamation",  "warning", "you have to login first")
    openAlert()
  } else {
    let id = postId
    let commentBody = document.getElementById(`comment-input-${postId}`).value
    let params = {
        "body": commentBody
    }
    let token = localStorage.getItem("token")
    let url = `http://tarmeezAcademy.com/api/v1/posts/${id}/comments`
    axios.post(url, params, {
        headers:{
            "authorization":`Bearer ${token}`
        }
    })
    .then((response) => {
      document.getElementById(`comment-input-${postId}`).value = ""
      if (bolem) {
        singlePostComments(response, false, postId)
      } else {
        let comment = document.getElementById(`send-comment-${postId}`)
        let commentbtn = document.getElementById(`clickComment-${postId}`)
        comment.style.display ="none"
        commentbtn.innerHTML = `
        <i class="bi bi-chat-left-text comment"></i>
        Comment
        `
        getPosts()
      }
      mainAlert("success", "check",  "Good", "you have send a comment successfully")
      openAlert()
    }).catch((error) =>{
      console.log(error);
      mainAlert("error", "exclamation",  "warning", error)
      openAlert()
    })
  }
}
//!==== DeletePost ====
function openDeletePost(postObject) {
  let post = JSON.parse(decodeURIComponent(postObject))
  document.getElementById("deletePostId").innerHTML = `${post.id}`

  document.querySelector(".delete-post").classList.add("active")
  document.querySelector(".delete-post-holder").classList.add("active")
  body.style.setProperty("overflow", "hidden")
}
function DeletePost () {
  let postId = document.getElementById("deletePostId").textContent
  let token = localStorage.getItem("token")
    axios.delete(`http://tarmeezAcademy.com/api/v1/posts/${postId}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
      }
    })
    .then((response) => {
      closeDeletePost()
      getPosts()
      mainAlert("success", "check", "Good", "your post has been deleted successfully")
      openAlert()
      closeSinglePost()
    })
}
function closeDeletePost() {
  document.querySelector(".delete-post").classList.remove("active")
  document.querySelector(".delete-post-holder").classList.remove("active")
  body.style.setProperty("overflow", "hidden")
}
//!====== Emoje ======
function clickLike(postId) {
  let likeBtn = document.getElementById(`reacts-btn-${postId}`)
  let likeBtnHolder = document.getElementById(`reacts-btn-holder-${postId}`)
      if (likeBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> Like` && !likeBtnHolder.classList.contains("active")) {
        likeBtn.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> Like`
        likeBtnHolder.classList.add("active")
          let search = emojePasket.find((x) => x.id === postId) 
          if (search === undefined) {
            emojePasket.push({
              id: postId,
              emoje: "Like",
            }) 
          } else {
            search.emoje = "Like"
          }
          localStorage.setItem("Reacts", JSON.stringify(emojePasket))
      } else if (likeBtn.innerHTML != `<i class="fa-regular fa-thumbs-up"></i> Like` && likeBtnHolder.classList.contains("active")) {
        likeBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> Like`
        likeBtnHolder.classList.remove("active")

        emojePasket = emojePasket.filter((x) => x.id !== postId)
        localStorage.setItem("Reacts", JSON.stringify(emojePasket))
      }
}
function showReactsHolder (postId) {
  setTimeout(() => {
    document.getElementById(`reacts-holder-${postId}`).classList.add("active")
  }, 500);
}
function hideReactsHolder (postId) {
  setTimeout(() => {
    document.getElementById(`reacts-holder-${postId}`).classList.remove("active")
  }, 500);
}
function clickEmoje(postId, type, color) {
  let likeBtnHolder = document.getElementById(`reacts-btn-holder-${postId}`)
  likeBtnHolder.classList.add("active")
  document.getElementById(`reacts-btn-${postId}`).innerHTML =`
    <img src="img/emoji img/${type}.svg"></img>
    <h4 style="color: ${color}; font-size: 16px;">${type}</h4>
  `
  let search = emojePasket.find((x) => x.id === postId) 
  if (search === undefined) {
    emojePasket.push({
      id: postId,
      emoje: type,
      color: color
    }) 
  } else {
    search.emoje = type
    search.color = color
  }
  localStorage.setItem("Reacts", JSON.stringify(emojePasket))
}
function clickLikeEmoje(postId) {
  let likeBtn = document.getElementById(`reacts-btn-${postId}`)
  likeBtn.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> Like`
  let likeBtnHolder = document.getElementById(`reacts-btn-holder-${postId}`)
  likeBtnHolder.classList.add("active")
  let search = emojePasket.find((x) => x.id === postId) 
  if (search === undefined) {
    emojePasket.push({
      id: postId,
      emoje: "Like",
    }) 
  } else {
    search.emoje = "Like"
  }
  localStorage.setItem("Reacts", JSON.stringify(emojePasket))
}
function clickHidePost(postId) {
  let post = document.getElementById(`${postId}`)
  post.classList.add("hidePost")
  let search = hidePasket.find((x) => x.id === postId) 
  if (search === undefined) {
    hidePasket.push({
      id: postId,
    }) 
  }
  localStorage.setItem("hide", JSON.stringify(hidePasket))
}
function clickAddFriends(userObject) {
  let post = JSON.parse(decodeURIComponent(userObject))
  let webpost = document.getElementById(`${post.id}`)
  webpost.classList.add("friend")
  let search = friendsPasket.find((x) => x.id === post.author.id) 
  if (search === undefined) {
    friendsPasket.push({
      id: post.author.id,
      name: post.author.name,
      img: post.author.profile_image
    })
  }
  localStorage.setItem("friends", JSON.stringify(friendsPasket)) 
}
function clickRemoveFriends(userObject) {
  let post = JSON.parse(decodeURIComponent(userObject))
  let webpost = document.getElementById(`${post.id}`)
  webpost.classList.remove("friend")
  friendsPasket = friendsPasket.filter((x) => x.id !== post.author.id)
  localStorage.setItem("friends", JSON.stringify(friendsPasket))
}
//!======= Share =======
function openSharePost(postId) {
  document.querySelector(".share-div").classList.add("active")
  document.querySelector(".share-holder").classList.add("active")
  body.style.setProperty("overflow", "hidden")
  document.querySelector(".hiddenId").textContent = `${postId}`

  let linkDiv = document.getElementById("linkDiv")
  linkDiv.value = `${document.location.origin}/single-post.html?postid=${postId}`
  let link = linkDiv.value

  document.querySelector(".share-div .Facebook").href =`https://www.facebook.com/share.php?u=${link}`
  document.querySelector(".share-div .Twitter").href  =`https://twitter.com/intent/tweet?text=${link}`
  document.querySelector(".share-div .Whatsapp").href =`https://api.whatsapp.com/send?text=${link}`
}
function sharedPost (postId) {
  window.location = `single-post.html?postid=${postId}`
}
let copyBtn = document.getElementById("copy")
  copyBtn.addEventListener("click", ()=>{
  
  let hiddenId = document.querySelector(".hiddenId").textContent
  
  let linkDiv = document.getElementById("linkDiv")
  linkDiv.value = `${document.location.origin}/single-post.html?postid=${hiddenId}`

  linkDiv.select()
  document.execCommand('copy');
  
  console.log(document.execCommand('copy'))

})
function closeSharePost() {
  document.querySelector(".share-div").classList.remove("active")
  document.querySelector(".share-holder").classList.remove("active")
  body.style.setProperty("overflow", "auto")
}
//!======= Single Post =======
let seePost = document.querySelector(".see-post") 
let singlePostHolder = document.querySelector(".single-post-holder") 
function openSinglePost(postId) {
  axios.get(`http://tarmeezAcademy.com/api/v1/posts/${postId}`)
  .then((response) => {
    let post = response.data.data
    //! allChecksInPost
      let user = getCurrentUser()
      let isMyPost = user != null && post.author.id == user.id
      let postSettingMenue = ``
      if(isMyPost) {
        postSettingMenue = `
          <li onclick="openAddEditPost(false, '${encodeURIComponent(JSON.stringify(post))}')">
          <i class="fa-regular fa-pen-to-square"></i> Edit Post</li>
          <li><i class="bi bi-bookmarks"></i> Save Post</li>
          <hr>
          <li onclick="clickHidePost(${post.id})" class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
          <li onclick="openDeletePost('${encodeURIComponent(JSON.stringify(post))}')" class="red-hover"><i class="bi bi-trash"></i> Delete Post</li>
        `
      } else {
        postSettingMenue = `
          <li><i class="bi bi-bookmarks"></i> Save Post</li>
          <li class="addFriendBtn" onclick="clickAddFriends('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-person-plus"></i> Add Frind</li>
          <li class="removeFriendBtn" onclick="clickRemoveFriends('${encodeURIComponent(JSON.stringify(post))}')"><i class="bi bi-person-x-fill"></i> Remove Frind</li>
          <hr>
          <li onclick="clickHidePost(${post.id})" class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
          <li class="red-hover"><i class="bi bi-exclamation-circle"></i> Report Post</li>
        `
      }
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
      let isHide = hidePasket.find((x) => x.id === post.id)
      if (isHide) {
        hidePost = "hidePost"
      } else {
        hidePost = ""
      }
      let isFriend = friendsPasket.find((x) => x.id === post.author.id)
      if (isFriend) {
        friendPost = "friend"
      } else {
        friendPost = ""
      }

    singlePostHolder.innerHTML = 
    `
    <i onclick="closeSinglePost()" class="fa-solid fa-xmark seePostClose"></i>
    <div class="image imageTop"><img class="main-img" src="${post.image == "[object Object]" ? "img/ifnoimg.png" : post.image}" alt=""></div>
    <div  class="post ${friendPost}" id="${post.id}">
      <div class="seePostTopHolder">
        <div class="holder">
          <div class="info">
            <div onclick="clickUserProfile(${post.author.id})" class="user">
              <i onclick="closeSinglePost()" class="fa-solid fa-xmark seePostClose mopile"></i>
              <div>
                <img src="${post.author.profile_image == "[object Object]" ? "img/aulter.png" : post.author.profile_image}" alt="">
                <div class="text">
                  <h4 class="user-name">${post.author.username}</h4>
                  <span class="time">${post.created_at}</span>
                </div>
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

          <h3 onclick="clickLike(${post.id})" onmouseenter="showReactsHolder(${post.id})" onmouseleave="hideReactsHolder(${post.id})" class="reacts-btn ${isliked}"" id="reacts-btn-holder-${post.id}">
              <div id="reacts-btn-${post.id}">
                ${postEmoje}
              </div>

          </h3>
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
          <i onclick="createCommentClicked(${post.id}, true)" class="bi bi-send" id="xasxax"></i>
          </div>
        </div>
      </div>
    </div>
    `
  
  singlePostComments(response, true)
  }).catch((error) => {
      console.log(error);
  })

}
function closeSinglePost () {
  seePost.classList.remove("active")
  singlePostHolder.classList.remove("active")
  body.style.setProperty("overflow", "auto")
}
function singlePostComments (response, bolem, postId) {
  let otherUsersComment = document.querySelector(".otherUsersComment")
  let comments = response.data.data.comments;
  if(bolem) {
    if (comments.length != 0) {
      for (let comment of comments) {
        comentContent = `
          <div class="user">
            <img class="otherUserImg" src="${comment.author.profile_image == "[object Object]" ? "img/aulter.png" : comment.author.profile_image}">
            <div class="text">
              <span class="otherUserName">${comment.author.username}</span>
              <h4 class="otherUserComent">${comment.body}</h4>
            </div>
          </div>
        `
        otherUsersComment.innerHTML += comentContent
      }
    } else {
      otherUsersComment.innerHTML = comentContent = `
        <h1 class="noComment">No comments have been posted so far. Feel free to be the first to share your thoughts!</h1>
      `
  }
  }else {
    axios.get(`http://tarmeezAcademy.com/api/v1/posts/${postId}`)
  .then((response) => {
    let comments = response.data.data.comments;
    console.log(comments);
    document.querySelector(".otherUsersComment") .innerHTML = ""
    for (let comment of comments) {
      comentContent = `
        <div class="user">
          <img class="otherUserImg" src="${comment.author.profile_image == "[object Object]" ? "img/aulter.png" : comment.author.profile_image}">
          <div class="text">
            <span class="otherUserName">${comment.author.username}</span>
            <h4 class="otherUserComent">${comment.body}</h4>
          </div>
        </div>
      `
      otherUsersComment.innerHTML += comentContent
    }
  })
  }

  seePost.classList.add("active")
  singlePostHolder.classList.add("active")
  body.style.setProperty("overflow", "hidden")
  
  if (localStorage.getItem("token") == null) {
    let sendCommentIcon = document.getElementById("xasxax")
    sendCommentIcon.classList.add("notLog")
  }
}