const urlAPI = 'https://gorest.co.in/public/v2/users';
const userID = new URLSearchParams(window.location.search).get('id');


function loadPosts(){
    fetch(`${urlAPI}/${userID}`)
    .then((response) => response.json())
    .then((user) => {
        const userTitle= document.getElementById('user-title')
        userTitle.textContent =`${user.name} posts`;
        userTitle.insertAdjacentHTML('beforebegin',
        `<img class="h-12 w-12 flex-none rounded-full bg-gray-50 inline-block m-2" src="https://api.dicebear.com/6.x/initials/svg?seed=${user.name}" alt="${user.name} avatar">`
        )
    });
    
    fetch(`${urlAPI}/${userID}/posts`)
    .then((response) => response.json())
      .then((data) => {
        let userPosts = document.getElementById('user-posts');

        if (data.length === 0) {
            userPosts.innerHTML = `<h2 class='m-16 text-xl'>User has no posts.</h2>`;
          } else {
            data.forEach((post) => {
                userPosts.insertAdjacentHTML(
                'beforeend',
                `<li class="flex justify-between gap-x-6 py-2">
                    <div class="flex gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <a class="text-lg font-semibold leading-6 text-gray-900" href=post-comments.html?id=${post.id}'>${post.title}</a>
                            <p class="mt-1 truncate text-sm italic leading-5 text-gray-500">${post.body.substring(0, 90)}...</p>
                        </div>
                    </div>
                </li>`
              );
            });

            userPosts.insertAdjacentHTML('beforeend',
            `<a href="javascript:history.back()" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-15">Return</a>`
            );
          }
    })

}

loadPosts()