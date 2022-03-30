var key = 'S5lavVQpEHhko7mNFELNSZk9AkTEY7Wsyc0pkIVJ4OGRHFbdN5';
var secret = 'USP6tKhxq7c2txA3OOmANHMlYLcr775EuNVOkSPM';
var org = 'TX1218';
var status = 'adoptable';



fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (resp) {

    // Return the response as JSON
    return resp.json();

}).then(function (data) {

    // Log the API data
    console.log('token', data);


    async function main() {
        const animals = await fetch("https://api.petfinder.com/v2/animals?organization=" + org + '&status=' + status, {
            headers: {
                'Authorization': data.token_type + ' ' + data.access_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }


        })

        // Store token data
        token = data.access_token;
        tokenType = data.token_type;
        expires = new Date().getTime() + (data.expires_in * 1000);

        const animalsData = await animals.json();
        const animalListEl = document.querySelector('.animal-list');
        console.log(animalsData);
        animalListEl.innerHTML = animalsData.animals
            .map(animal => `<div class="animal-card">
        <div class="animal-card__container">
            <img class="animal__img" src="${animal.photos[0]?.full}">
            <h3>${animal.name}</h3>
            <p><b>Animal Type:</b> ${animal.type}<br>
            <b>Age:</b> ${animal.age}<br>
            <b>Gender:</b> ${animal.gender}<br>
            <b>Breed:</b> ${animal.breeds.primary}<br>
            <b>Size:</b> ${animal.size}<br>
            </p>
        </div>
    </div>`)
            .join("")
    }

    main();

})

