let basket = JSON.parse(localStorage.getItem("addReact")) || []   
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


    let isReacted = basket.find((x) => x.id === post.id)
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
    let content = `
    <div class="post" id="${post.id}">
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
      <img onclick="openSinglePost(${post.id})" class="main-img" src="${post.image}" alt="">
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
          <h3>
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
  localStorage.removeItem("token")
  localStorage.removeItem("user")
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
function checkPostImages() {
  let postImageInputs = document.getElementById("postImageInput")
  let userImageSelected = document.querySelector(".add-post .imageSelected")
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
  let postImageInput = document.getElementById("postImageInput").files[0]
  let token = localStorage.getItem("token")

  let formData = new FormData()
  formData.append("title", postTitleInput)
  formData.append("body", postBodyInput)
  formData.append("image", postImageInput)

  headerss = {
    "Content-Type": "multipart/form-data",
    "authorization": `Bearer ${token}`
  }
  if(bolem) {
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
        getPosts()
      }
      mainAlert("success", "check",  "Good", "you have send a comment successfully")
      openAlert()
      let comment = document.getElementById(`send-comment-${postId}`)
      let commentbtn = document.getElementById(`clickComment-${postId}`)
      comment.style.display ="none"
      commentbtn.innerHTML = `
      <i class="bi bi-chat-left-text comment"></i>
      Comment
      `
    }).catch((error) =>{
      console.log(error);
      mainAlert("error", "exclamation",  "warning", error)
      openAlert()
    })
  }
}
//!======= Single Post =======
let seePost = document.querySelector(".see-post") 
let inglePostHolder = document.querySelector(".single-post-holder") 

function openSinglePost(postId) {
  axios.get(`http://tarmeezAcademy.com/api/v1/posts/${postId}`)
  .then((response) => {
    let info = response.data.data
    
    let user = getCurrentUser()
    let isMyPost = user != null && info.author.id == user.id
    let postSettingMenue = ``
    if(isMyPost) {
      postSettingMenue = `
        <li onclick="openAddEditPost(false,'${encodeURIComponent(JSON.stringify(info))}')">
        <i class="fa-regular fa-pen-to-square"></i> Edit Post
        </li>
        <li><i class="bi bi-bookmarks"></i> Save Post</li>
        <hr>
        <li class="red-hover"><i class="bi bi-calendar2-x"></i> Hide Post</li>
        <li onclick="openDeletePost('${encodeURIComponent(JSON.stringify(info))}')" class="red-hover"><i class="bi bi-trash"></i> Delete Post</li>
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

    inglePostHolder.innerHTML = 
    `
    <i onclick="closeSinglePost()" class="fa-solid fa-xmark seePostClose"></i>
    <div class="image imageTop"><img class="main-img" src="${info.image}" alt=""></div>
    <div  class="post" id="${postId}">
      <div class="seePostTopHolder">
        <div class="holder">
          <div class="info">
            <div onclick="clickUserProfile(${info.author.id})" class="user">
              <i onclick="closeSinglePost()" class="fa-solid fa-xmark seePostClose mopile"></i>
              <div>
                <img src="${info.author.profile_image == "[object Object]" ? "img/aulter.png" : info.author.profile_image}" alt="">
                <div class="text">
                  <h4 class="user-name">${info.author.username}</h4>
                  <span class="time">${info.created_at}</span>
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
            <h4>${info.title === null ? "" : info.title}</h4>
            <p>${info.body  === null ? "" : info.body}</p>
          </div>
          <hr>
        </div>
        <div class="image imageMiddle"><img class="main-img" src="${info.image}" alt=""></div>
        <div class="otherUsersComment">
        

        </div>
      </div>
      <div class="holder holder-2">
        <div class="comment">
            <div class="reactsss">
              <img src="img/emoji img/like.svg" alt="">
              <img src="img/emoji img/love.svg" alt="">
              <img src="img/emoji img/haha.svg" alt="">
              <h6>5</h6>
            </div>
            <h5><span>${info.comments_count}</span> comments</h5>
        </div>
        <hr>
        <div class="other">

        <div id="reacts-holder-${info.id}" class="reacts-holder">
          <img onclick="clickLikeEmoje(${info.id})" src="img/emoji img/like.svg"></img>
          <img onclick="clickEmoje(${info.id}, 'Love', '#e65065')" src="img/emoji img/love.svg"></img>
          <img onclick="clickEmoje(${info.id}, 'Care', '#e0a93b')" src="img/emoji img/care.svg"></img>
          <img onclick="clickEmoje(${info.id}, 'Haha', '#e0a93b')" src="img/emoji img/haha.svg"></img>
          <img onclick="clickEmoje(${info.id}, 'wow', '#e0a93b')" src="img/emoji img/wow.svg"></img>
          <img onclick="clickEmoje(${info.id}, 'Sad', '#e0a93b')" src="img/emoji img/sad.svg"></img>
          <img onclick="clickEmoje(${info.id}, 'Angry', '#cb732b')" src="img/emoji img/angry.svg"></img>
        </div>

          <h3 onclick="clickLike(${info.id})" onmouseenter="showReactsHolder(${info.id})" onmouseleave="hideReactsHolder(${info.id})" class="reacts-btn" id="reacts-btn-holder-${info.id}">
              <div id="reacts-btn-${info.id}">
                <i class="fa-regular fa-thumbs-up"></i>
                Like
              </div>

          </h3>
          <h3>
            <i class="bi bi-chat-left-text comment"></i>
            Comment
          </h3>
          <h3>
            <i class="fa-regular fa-share-from-square"></i>
            Share
          </h3>
        </div>
        <div id="send-comment" class="send-comment">
          <img src="img/icon.jpeg" alt="">
          <div class="input">
          <textarea name="" id="comment-input-${postId}" placeholder="Type a Comment"></textarea>
          <i onclick="createCommentClicked(${postId}, true)" class="bi bi-send" id="xasxax"></i>
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
  inglePostHolder.classList.remove("active")
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
  inglePostHolder.classList.add("active")
  body.style.setProperty("overflow", "hidden")
  
  if (localStorage.getItem("token") == null) {
    let sendCommentIcon = document.getElementById("xasxax")
    sendCommentIcon.classList.add("notLog")
  }
}
//!======= DeletePost =======
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
      mainAlert("success", "check", "Good", "your post has been deleted successfully")
      openAlert()
      getPosts()
    })
    .catch((error) => {
      mainAlert("error", "exclamation", "warning", error.response.data.message)
      openAlert()
    }) 
}
function closeDeletePost() {
  document.querySelector(".delete-post").classList.remove("active")
  document.querySelector(".delete-post-holder").classList.remove("active")
  body.style.setProperty("overflow", "hidden")
}
//!======= Emoje =======

function clickLike(postId) {
  let likeBtn = document.getElementById(`reacts-btn-${postId}`)
  let likeBtnHolder = document.getElementById(`reacts-btn-holder-${postId}`)
      if (likeBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> Like` && !likeBtnHolder.classList.contains("active")) {
        likeBtn.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> Like`
        likeBtnHolder.classList.add("active")
          let search = basket.find((x) => x.id === postId) 
          if (search === undefined) {
            basket.push({
              id: postId,
              emoje: "Like",
            }) 
          } else {
            search.emoje = "Like"
          }
          localStorage.setItem("addReact", JSON.stringify(basket))
      } else if (likeBtn.innerHTML != `<i class="fa-regular fa-thumbs-up"></i> Like` && likeBtnHolder.classList.contains("active")) {
        likeBtn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i> Like`
        likeBtnHolder.classList.remove("active")

        basket = basket.filter((x) => x.id !== postId)
        localStorage.setItem("addReact", JSON.stringify(basket))
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
  document.getElementById(`reacts-btn-${postId}`).innerHTML = `
    <img src="img/emoji img/${type}.svg"></img>
    <h4 style="color: ${color}; font-size: 16px;">${type}</h4>
  `
  let search = basket.find((x) => x.id === postId) 
  if (search === undefined) {
    basket.push({
      id: postId,
      emoje: type,
      color: color
    }) 
  } else {
    search.emoje = type
    search.color = color
  }
  localStorage.setItem("addReact", JSON.stringify(basket))
}
function clickLikeEmoje(postId) {
  let likeBtn = document.getElementById(`reacts-btn-${postId}`)
  likeBtn.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> Like`
  let likeBtnHolder = document.getElementById(`reacts-btn-holder-${postId}`)
  likeBtnHolder.classList.add("active")
  let search = basket.find((x) => x.id === postId) 
  if (search === undefined) {
    basket.push({
      id: postId,
      emoje: "Like",
    }) 
  } else {
    search.emoje = "Like"
  }
  localStorage.setItem("addReact", JSON.stringify(basket))
}