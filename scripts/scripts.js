let curentPage = 1;
let totalPages;

function getUsers(page) {
    fetch('https://reqres.in/api/users?page=' + page, {
        method: 'GET',
    })
    
    .then(function(responseText){
       if(responseText.status !==200) {
        throw 'error';
       }
        return responseText.json();
    })
    .then(function(textJs) {
        
        const fragment = new DocumentFragment();
        textJs.data.forEach(element => {
          let li = document.createElement('li');
          let p = document.createElement('p');
          let img = document.createElement('img');
          img.src = element.avatar
           p.textContent = `${element.first_name} ${element.last_name}`
           li.appendChild(p);
           li.appendChild(img);
    
           fragment.appendChild(li);
       });
       document.getElementById('sia').innerHTML = ' ';
       document.getElementById('sia').appendChild(fragment);
       totalPages = textJs.total_pages ;
    
    })
    .catch(function(error) {
        let p = document.createElement('p');
        p.textContent = 'page not found'
        document.getElementById('ragaca').appendChild(p);
       })
}

 

document.getElementById('load-more').addEventListener('click', function() {
    if(curentPage == totalPages) {
        return ;
    }
    curentPage += 1;
    getUsers(curentPage);
})


document.getElementById('load-previous').addEventListener('click', function() {
    if(curentPage == 1){
        return;
     }
    curentPage -= 1;
    getUsers(curentPage);
})
getUsers();