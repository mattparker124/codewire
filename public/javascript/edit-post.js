async function newFormHandler(event) {
    event.preventDefault();
    

    const title = document.querySelector('textarea[name="post-title"]').value;
    const post_body = document.querySelector('textarea[name="post-body"]').value;
    const url = window.location.href.split("/")
    const id = url[(url.length-1)]

    const response = await fetch(`/api/posts/`+id, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
            document.location.replace('/post/'+id)
        }
}

document.querySelector('.new-post-form-edit').addEventListener('submit', newFormHandler);