async function deletePost(event) {
    event.preventDefault();

    const url = window.location.href.split("/")
    const id = url[(url.length-1)]

    console.log(id)

    const response = await fetch('/api/posts/'+id, { method: 'DELETE' });

    if (response.ok) {
        document.location.replace('/dashboard')
    }
}
document.getElementById("deletebutton").addEventListener("click", deletePost);