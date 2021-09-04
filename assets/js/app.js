const switchBtn = document.querySelector(".switch-btn");
const userContainer = document.querySelector(".user-container");
const searchInput = document.querySelector(".search-input");;
const searchBtn = document.querySelector(".search-btn");
const form = document.querySelector("#form");

switchBtn.addEventListener("click", switchMode);

function switchMode(e) {
  const clicked = e.target;
  document.body.classList.toggle("dark");
  userContainer.classList.toggle("dark");
  searchInput.classList.toggle("dark");
  clicked.previousElementSibling.textContent === "Dark" ? clicked.previousElementSibling.textContent = "Light" : clicked.previousElementSibling.textContent = "Dark";

}

const URL = "https://api.github.com/users";
form.addEventListener("submit", getData);

const displayUser = (results) => {
  let {
    avatar_url,
    bio,
    name,
    login,
    created_at,
    followers,
    following,
    public_repos,
    location,
    company,
    twitter_username,
    html_url,
  } = results;

  bio === null ? bio = "This profile has no bio" : bio = bio
  twitter_username === null ? twitter_username = "Not available" : twitter_username = twitter_username
  company === null ? company = "Not available" : company = company
  location === null ? location = "Not available" : location = location

  if (results.message === "Not Found") {
    document.querySelector('.alert').style.display = "block"
    userContainer.innerHTML = null;
  }
  else {
    document.querySelector('.alert').style.display = "none"
    let formattedDate = new Date(created_at);
    formattedDate = formattedDate.toDateString().split(' ').slice(1).join(' ');
    userContainer.innerHTML = "";
    const div = document.createElement("div");
    div.setAttribute('class', 'user-content')
    div.innerHTML = `
         <div class="user-img">
          <img src="${avatar_url}">
         </div>
        <div class="user-info">
        <div class="user-top">
          <div class="user-title">
            <h1 class="user-name">${name}</h1>
            <a href="#" class="user-email">@${login}</a>
          </div>
          <div class="user-date">
            <span class="date">Joined ${formattedDate}</span>
          </div>
        </div>
        <div class="bottom">
          <p class="user-bio">${bio}</p>
          <div class="user-details">
            <div class="repos">
              <span>repos</span>
              <a href="">${public_repos}</a>
            </div>
            <div class="following">
              <span>following</span>
              <a href="">${following}</a>
            </div>
            <div class="follower">
              <span>follower</span>
              <a href="">${followers}</a>
            </div>
          </div>
          <div class="user__social-media">
            <div class="location">
              <p>
    
                <img src="images/icon-location.svg">
                ${location}
              </p>
            </div>
            <div class="twitter">
              <p>
                <img src="images/icon-twitter.svg">
             <a href="${twitter_username}">${twitter_username}
             \
             </a>
              </p>
            </div>
            <div class="website">
              <p>
                <img src="images/icon-website.svg">
               <a href="${html_url}">${html_url}</a>
              </p>
            </div>
    
            <div class="github">
              <p>
                <img src="images/icon-company.svg">
             ${company}
              </p>
            </div>
          </div>
        </div>
      </div>
      `;
    userContainer.append(div);

  }


};

async function getData(e) {
  e.preventDefault();
  let searchQuery = searchInput.value;
  const response = await fetch(URL + "/" + searchQuery);
  const results = await response.json();
  displayUser(results);
  searchInput.value = ""

}
