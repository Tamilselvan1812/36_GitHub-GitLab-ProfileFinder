async function searchProfile() {
  const username = document.getElementById("username").value.trim();
  const platform = document.querySelector('input[name="platform"]:checked').value;
  const result = document.getElementById("result");

  if (!username) {
    result.innerHTML = "<p>Please enter a username</p>";
    return;
  }

  result.innerHTML = "<p>Loading...</p>";

  try {
    let url = "";

    if (platform === "github") {
      url = `https://api.github.com/users/${username}`;
    } else {
      url = `https://gitlab.com/api/v4/users?username=${username}`;
    }

    const res = await fetch(url);

    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    let user;

    if (platform === "github") {
      user = data;
    } else {
      if (data.length === 0) throw new Error("User not found");
      user = data[0];
    }

    result.innerHTML = `
      <img src="${user.avatar_url}" />
      <h3>${user.name || "No Name"}</h3>
      <p>${user.bio || "No Bio"}</p>
      <a href="${platform === "github" ? user.html_url : user.web_url}" target="_blank">
        View Profile
      </a>
    `;

  } catch (error) {
    result.innerHTML = "<p>User not found</p>";
  }
}