const urlAPI = 'https://gorest.co.in/public/v2/posts';
const postID = new URLSearchParams(window.location.search).get('id');

function loadPostData() {
    fetch(`${urlAPI}/${postID}`)
    .then((response) => response.json())
      .then((post) => {
        document.getElementById('post-data').innerHTML = `
          <h1 class='text-2xl my-10'>${post.title}</h1>
          <p class="mt-1 text-base italic leading-5 text-gray-800">${post.body}</p>
        `;
      });

      fetch(`${urlAPI}/${postID}/comments`)
      .then((response) => response.json())
      .then((data) => {
        const comments = document.getElementById('comments');
        comments.textContent='Comments';

        if (data.length === 0) {
            comments.insertAdjacentHTML('beforeend',
            `<h2 class='text-lg text-pink-800'>There are no comments for the post.</h2>`
            )  
          } else {
            data.forEach((comment) => {
                comments.insertAdjacentHTML(
                'beforeend',
                `<li class="flex justify-between gap-x-6 py-2">
                    <div class="flex gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <h4 class="text-lg font-semibold leading-6 text-gray-900 no-underline">${comment.name}</h4>
                            <p class="mt-1 truncate text-xs leading-5 text-gray-500 no-underline">${comment.email}</p>
                            <p class="mt-1 truncate text-lg italic leading-5 text-pink-800 no-underline">Comment: ${comment.body}</p>
                        </div>
                    </div>
                </li>`
              );
            }); 
        }
        comments.insertAdjacentHTML('beforeend',
        `<a href="javascript:history.back()" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-15">Return</a>`
        );
      })
}

loadPostData()