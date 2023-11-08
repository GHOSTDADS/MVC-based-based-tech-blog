async function newCommentHandler(event) {
    event.preventDefault();
  
    const content = document.getElementById("comment").value.trim();
    const url = window.location.toString().split("/");
    const blog_id = url[url.length - 1];
    console.log(blog_id)

    console.log(content);
  
    if (content) {
      const response = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({
          blog_id,
          content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
}

document
    .getElementById("comment-form")
    .addEventListener("submit", newCommentHandler);