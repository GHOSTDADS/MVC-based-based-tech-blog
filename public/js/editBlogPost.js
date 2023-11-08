let blog = window.location.pathname.split("/");

const submitEdit = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#titleInput").value.trim();
  console.log(title);
  const content = document.querySelector("#bodyInput").value.trim();
  console.log(content);
  if (title && content) {
    const response = await fetch(`/api/blogs/${blog[2]}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.assign('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.createBlog')
  .addEventListener('submit', submitEdit);
