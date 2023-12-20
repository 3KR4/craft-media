// //! sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss Header
let header = document.querySelector(".header");
mainHeader = () => {
  return (header.innerHTML = `
  <div class="preLoader-holder">
  <div class="preLoader">
  <span class="loading-circle sp1">
    <span class="loading-circle sp2">
      <span class="loading-circle sp3"></span>
      </span>
    </span>
  </div>
</div>
<div class="container-fluid">
<div class="logo">
  <a href="index.html"><i class="bi bi-bing"></i></a>
  <div onclick="showSearch()" class="icons">
    <i class="fa-solid fa-magnifying-glass search-ico"></i>
    <i class="bi bi-x close"></i>
  </div>
  <div class="search-holder">
    <div class="form__group field">
      <input onfocus="focusSearch()" type="input" class="form__field" placeholder="Name" required="">
      <label for="name" class="form__label">Search</label>
  </div>
  </div>
</div>
<div class="nav">
  <a title="Home" href="index.html"><i class="bi bi-house-door active"></i></a>
  <a title="Friends" href=""><i class="bi bi-people"></i></a>
  <a title="Videos" href=""><i class="bi bi-fast-forward-btn"></i></a>
  <a title="MarketPlace" href=""><i class="bi bi-shop-window"></i></a>
  <a title="Groups" href=""><i class="fa-regular fa-comments"></i></a>
</div>
<div class="user">
  <div class="sign-in">
    <a class="main-btn Sign-Up" href="register.html">Sigu Up</a>
    <a class="main-btn" href="login.html">Sign in</a>
  </div>
  <ul class="user-info">
    <div class="bar">
      <input onclick="barsBtn()" id="checkbox" type="checkbox">
      <label class="toggle" for="checkbox">
          <div id="bar1" class="bars"></div>
          <div id="bar2" class="bars"></div>
          <div id="bar3" class="bars"></div>
      </label>
    </div>
    <li class="setting-icon">
      <i class="bi bi-grid-3x3-gap-fill mainicons"></i>
        <ul class="setting-menu menu">
          <h3>Create</h3>
          <li onclick="openAddEditPost(true)"><i class="fa-solid fa-pen-to-square mainicons"></i>Post</li>
          <li><i class="bi bi-fast-forward-circle-fill mainicons"></i>Reel</li>
          <li><i class="bi bi-bookmarks-fill mainicons"></i>Story</li>
          <li>
            <a href="">
                <div class="image">
                  <img src="img/chat.png" alt="">
                </div> 
                Chat
            </a>
          </li>

        </ul>
    </li>
    <li><i class="bi bi-messenger mainicons"></i></li>
    <li class="notifications-icon">
      <i class="bi bi-bell-fill mainicons"></i>
      <div class="notifications-menu menu">
        <div class="top">
          <h3>Notifications</h3>
          <button onclick="focusNotifications()" class="notifications-btn">
            <i class="bi bi-sliders2 f789 mainicons open"></i>
            <i class="bi bi-x mainicons close"></i>
            <ul class="notifications-menu-btn">
              <li><i class="bi bi-check-all mainicons " style="font-size: 22px;"></i> Mark All As Read</li>
              <li><a href=""><i class="bi bi-gear-wide-connected mainicons "></i> Notifications Setting</a></li>
              <li><a href=""><i class="bi bi-card-text mainicons "></i> Open Notifications</a></li>
            </ul>
          </button>
        </div>
        <div class="middle">
          <h3 class="All active">All</h3>
          <h3 class="Unread">Unread</h3>
        </div>
        <div class="request">
          <div class="top">
            <h3>Friend Requests</h3>
            <a href="">See all</a>
          </div>
          <div class="friend-request-holder">
          </div>
        </div>

      </div>
    </li>
    <li class="profile-icon">
      <img onclick="profileClicked()" class="user-main-img" src="img/aulter.png" alt="">
      <ul class="user-menu menu">
        <li onclick="profileClicked()" class="user">
          <img class="user-main-img" src="img/aulter.png" alt="">
          <h3 class="user-main-name">aaaaa</h3>
        </li>
        <li><div><i class="bi bi-gear-wide-connected mainicons"></i> Setting & Privacy</div> <i class="fa-solid fa-angle-right"></i></li>
        <li><div><i class="bi bi-question-octagon mainicons"></i> Help & Support</div> <i class="fa-solid fa-angle-right"></i></li>
        <li onclick="showClickDisplay()"><div><i class="bi bi-brilliance mainicons"></i>Display & Accessibility</div> <i class="fa-solid fa-angle-right"></i></li>
        <hr style="margin:6px 10px 6px;">
        <li onclick="logOut()" class="LogOut"><i class="fa-solid fa-arrow-right-from-bracket mainicons"></i> Log Out</li>
      </ul>



    </li>
  </ul>
  
  <div class="theme-holder">
    <div class="top">
      <h4>Display & Accessibility</h4>
      <i onclick="closeClickDisplay()" class="bi bi-x close"></i>
    </div>
  <div class="darkModeHolder">
    <div class="icon">
      <i class="bi bi-sun-fill sun mainicons"></i>
      <i class="bi bi-moon-fill moon mainicons"></i>
    </div>
    <input onclick="darkMode()" id="checkbox_toggle" type="checkbox" class="check">
    <div class="checkbox">
      <label class="slide" for="checkbox_toggle">
        <label class="toggle" for="checkbox_toggle"></label>
        <label class="text textLight" for="checkbox_toggle">Light Mode</label>
        <label class="text text-2" for="checkbox_toggle">Dark Mode</label>
      </label>
    </div>
  </div>
  <div class="colorsHolder">
  <div class="theme3btn"><i class="fa-solid fa-circle-half-stroke theme3 mainicons"></i> Main Color <input type="color" id="colorPicker" value="#ff0000" onchange="updateColor(this.value)"></div>
    <div class="holder">
      <span class="theme-buttons" data-color="#2a84ff"><i style="color: #2a84ff;" class="fa-solid fa-layer-group"></i></span>
      <span class="theme-buttons" data-color="#fe5b3d"><i style="color: #fe5b3d;" class="fa-solid fa-layer-group"></i></span>
      <span class="theme-buttons" data-color="#27ae60"><i style="color: #27ae60;" class="fa-solid fa-layer-group"></i></span>
      <span class="theme-buttons" data-color="#f39c12"><i style="color: #f39c12;" class="fa-solid fa-layer-group"></i></span>
      <span class="theme-buttons" data-color="#e84393"><i style="color: #e84393;" class="fa-solid fa-layer-group"></i></span>
    </div>
  </div>
</div>
</div>

</div>
  `);
};
mainHeader();


let body = document.querySelector("body");
let loadIcon = document.querySelector(".preLoader-holder")
window.addEventListener("load", function() {
  loadIcon.style.display = "none"
  body.style.overflow = "auto"
})
function focusSearch () {
  document.querySelector(".form__group").classList.add("focus")
}
function showSearch () {
  searchHolder.classList.toggle("active")
  nav.classList.remove("active")
  document.querySelector(".logo .search-ico").classList.toggle("hide")
} 
function focusNotifications () {
  document.querySelector(".notifications-menu-btn").classList.toggle("active")
  document.querySelector(".notifications-btn i.open").classList.toggle("hide")
}
let nav = document.querySelector(".header .nav")
let searchHolder = document.querySelector(".search-holder")
function barsBtn () {
  nav.classList.toggle("active")
  searchHolder.classList.remove("active")
  document.querySelector(".logo .search-ico").classList.remove("hide")
}

//!======= themeButtons =======

let darkLight = document.querySelector(".check");
function darkMode () {
  if (darkLight.checked) {
    body.classList.add("dark");
    localStorage.setItem("mode", "dark-mode");
  } else {
    body.classList.remove("dark");
    localStorage.setItem("mode", "light-mode");
  }
}
if (localStorage.getItem("mode") === "light-mode") {
  body.classList.remove("dark");
  darkLight.checked = false;
} else {
  body.classList.add("dark");
  darkLight.checked = true;
}

let themeHolder = document.querySelector(".theme-holder")
let themeButtons = document.querySelectorAll(".theme-buttons")
let inputColor = document.getElementById("colorPicker")

function showClickDisplay () {
  themeHolder.classList.add("active")
}
function closeClickDisplay () {
  themeHolder.classList.remove("active")
}

if (window.localStorage.getItem("theme")) {
  document.querySelector(':root').style.setProperty('--main-color', window.localStorage.getItem("theme"));
}
themeButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
  
  themeButtons.forEach((li) => {
    li.classList.remove("active")
  })
  e.currentTarget.classList.add("active")
  window.localStorage.setItem("theme", e.currentTarget.dataset.color)
  inputColor.value = localStorage.getItem("theme")
  document.querySelector(':root').style.setProperty('--main-color', e.currentTarget.dataset.color);
  });
});
inputColor.oninput = function () {
  document.querySelector(':root').style.setProperty('--main-color', inputColor.value);
}
inputColor.value = localStorage.getItem("theme") || "#2a84ff"
function updateColor (color) {
  window.localStorage.setItem("theme", color)
  document.querySelector(':root').style.setProperty('--main-color', color);
}
//!======= ALERT MASSEGE =======

let alertMsdg = document.querySelector(".alert");
let alertMsdgDev = document.querySelector(".alert .alert-dev");
mainAlert = (type, icon, operation, massege) => {
  return (alertMsdg.innerHTML = `
  <div class="alert-dev ${type}">
    <div class="holder">
      <i class="fa-solid fa-circle-${icon}"></i>
      <h5><span>${operation}:</span> ${massege}</h5>
    </div>
  </div>
  `);
};
function openAlert() {
  alertMsdg.classList.remove("hide")
  alertMsdg.classList.add("show")
  // location.href = "index.html"
  setTimeout(() => {
    alertMsdg.classList.add("hide")
  }, 1500) 
}

function goToProfile() {
  location.href = "profile.html"
}




let notificationsPasket = JSON.parse(localStorage.getItem("Notifications"))   || []   
let hideRequestPasket = JSON.parse(localStorage.getItem("hideRequest"))   || []   

function getNotifications () {
  axios.get(`http://tarmeezAcademy.com/api/v1/posts?limit=6`)
.then((response) => {
  const posts = response.data.data
  for(let post of posts) {
    let search = notificationsPasket.find((x) => x.id === post.author.id) 
    let hideReqest = ""
    if (search === undefined) {
      notificationsPasket.push({
        id: post.author.id
      }) 
    } else {
      hideReqest = "hideRequest"
    }


    let isHideReq = hideRequestPasket.find((x) => x.id === post.author.id)
    if (isHideReq) {
      hideReqest = "hideRequest"
    }

    let user = getCurrentUser()
    let isMyPost = user != null && post.author.id == user.id
    if (isMyPost) { 
      hideReqest = "hideRequest"
    }
    
    let content = `
      <div id="friend-request-${post.author.id}" class="friend-request ${hideReqest}">
        <div class="card">
          <img onclick="clickUserProfile(${post.author.id})" src="${post.author.profile_image == "[object Object]" ? "img/aulter.png" : post.author.profile_image}" alt="">
          <div class="text">
            <h6><span>${post.author.username}</span> Sent You a Friend Request</h6>
            <h5><span>${post.created_at}</span></h5>
            <p><span>4</span> Mutual Friends</p>
            <div class="btns">
              <button onclick="removeNot(${post.author.id})" class="main-btn Confirm">Confirm</button>
              <button onclick="removeNot(${post.author.id})" class="main-btn Delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `
    document.querySelector(".friend-request-holder").innerHTML += content
  }
}).catch((error) => {
  console.log(error);
})
}
getNotifications()




function removeNot (userID) {
  let useRequest = document.getElementById(`friend-request-${userID}`)
  useRequest.classList.add("hideRequest")
  hideRequestPasket.push({
        id: userID
      }) 
  localStorage.setItem("hideRequest", JSON.stringify(hideRequestPasket))
}