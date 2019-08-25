document.addEventListener('DOMContentLoaded', function() {
  const allTweetsList = document.querySelector('.tweets');
  const form = document.querySelector('.new-tweet');

  form.addEventListener('submit', function(event) {
    console.log('--User clicked submit.')
    event.preventDefault();
    let formData = new FormData(this);

    axios
    .post(
      this.action,
      formData,
    )

    .then(function(response) {
      console.log('--Request has been sent.')
      // console.log(response);
      console.log(response.data);
      console.log(typeof(response.data.created_at));
      // console.log(response.data.message);

      let tweetDate = new Date(response.data.created_at);

      let readableDate = formatted_date = (tweetDate.getMonth() + 1) + "-" + tweetDate.getDate() + "-" + tweetDate.getFullYear() + " " + tweetDate.getHours() + ":" + tweetDate.getMinutes(); //Needs some work.
      
      let dataElem = document.createElement('li');
      let timeElem = document.createElement('time');
      let messageElem = document.createElement('p');

      dataElem.className = 'tweet';
      timeElem.innerText = `${readableDate}`;
      messageElem.innerText = `${response.data.message}`;
      dataElem.appendChild(timeElem);
      dataElem.appendChild(messageElem);

      allTweetsList.append(dataElem);
    })
    .catch(function(error) {
      console.log('--An error has occurred.')
      console.log(error);
    });
  });
});