const imageProfile = document.querySelector("#profile");
const githubName = document.querySelector("#github-name");
const githubUsername = document.querySelector("#github-username");
const githubJoined = document.querySelector("#github-joined");
const githubRepos = document.querySelector("#github-repos");
const githubFollowers = document.querySelector("#github-followers");
const githubFollowing = document.querySelector("#github-following");
const githubLocation = document.querySelector("#github-location");
const githubTwitter = document.querySelector("#github-twitter");
const githubUrl = document.querySelector("#github-url");
const githubBuild = document.querySelector("#github-build");
const githubBio = document.querySelector("#github-bio");

//input y boton
const githubActionSearch = document.querySelector("#github-action-search");
const githubSearch = document.querySelector("#github-search");

githubActionSearch.onclick = () => {
  const username = githubSearch.value;
  githubSearch.value = "";

  //tenemos que validar si el input esta vacio
  if (username === "") {
    Swal.fire({
      title: "Error",
      text: "Debe llenar el campo Buscar Usuario",
      icon: "error"
    });
        return;
  };
  obtenerDatosGithub(username);
};

//vamos a detectar el evento de enter cuando estemos en el input
githubSearch.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    obtenerDatosGithub(event.target.value);
    githubSearch.value = "";
  }
  
})



const obtenerDatosGithub = async(username = "The_Octocat") => {
  const response = await fetch (`https://api.github.com/users/${username}`);
  const data = await response.json();
  if(data.message === "Not Found") {
    Swal.fire ({
      title:"Error",
      text:"El usuario no existe",
      icon:"warning",
    });
    return;
  }

  setDataUser (data);
}

const setDataUser = (data) => {
  imageProfile.src = data.avatar_url;
  githubName.innerHTML = data.name;
  githubUsername.innerHTML = `@${data.login}`;
  githubJoined.innerHTML = data.created_at;
  githubRepos.innerHTML = data.public_repos;
  githubFollowers.innerHTML = data.followers;
  githubFollowing.innerHTML = data.following;
  githubLocation.innerHTML = data.location;
  githubTwitter.innerHTML = data.twitter_username;
  githubUrl.innerHTML = data.html_url;
  githubBuild.innerHTML = `@${data.login}`;
  githubBio.innerHTML = data.bio;
}









