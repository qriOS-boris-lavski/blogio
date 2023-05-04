const users_URL = 'https://gorest.co.in/public/v2/users?page=1&per_page=100';
const usersList = document.getElementById('users-list');

function getUsers () {
  fetch(users_URL)
    .then(response => {
      if (!response.ok) {
        usersList.insertAdjacentHTML('beforeend', `<h2 class="text-2xl">Users are not found</h2>`);
        throw new Error('Error loading data');
        
      }
      return response.json();
    })
    .then((data) => {
        data.forEach((user) => {
          function postsQty(userPostsQty) {
            const postsURL =`https://gorest.co.in/public/v2/users/${user.id}/posts`;
            return fetch(postsURL)
              .then(response => response.json())
              .then((userPosts) => {
                const userPostsQty = userPosts.length;
                return userPostsQty;
              });
          }
          postsQty().then((userPostsQty) => {
            usersList.insertAdjacentHTML('beforeend',
              `<li class="flex justify-between gap-x-6 py-2">
                <div class="flex gap-x-4">
                  <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://api.dicebear.com/6.x/initials/svg?seed=${user.name}" alt="${user.name} avatar">
                  <div class="min-w-0 flex-auto">
                    <a class="text-sm font-semibold leading-6 text-gray-900" href='posts.html?id=${user.id}'>${user.name}</a>
                    <p class="mt-1 truncate text-xs leading-5 text-gray-500">${user.email}</p>
                  </div>
                </div>
                <div class="hidden sm:flex sm:flex-col sm:items-end">
                  <p class="text-sm leading-6 text-gray-900">Posts: ${userPostsQty}</p>
                </div>
              </li>`
            );
          });
        });
      
    });
}

getUsers();

