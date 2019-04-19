function RedditFeed(RedditService) {
  // have to add $q to use promises 

    const ctrl = this;
    
    // load on initial page load

    ctrl.$onInit = function() {
      ctrl.feed = [];
      ctrl.fetchAwwSubreddit();
    };

   
    ctrl.fetchAwwSubreddit = () => {
     // have to pass in $q at top for this to work
     // return $q(function (resolve, reject) {
     // then( (response) => {
     // put code here 
     /// resolve();

        RedditService.fetchAwwSubreddit()
          .then( (data) => {
            // do something with this data
            
            ctrl.feed = data;
            
            ctrl.arrayToLoad = [];

            data.data.data.children.slice(1, 11).forEach( (child) => {
        
              // skipped the first post which is just an ad for a random sub-reddit
              
              //  setting up and formating the post date

              let redditPostDate = new Date();
              redditPostDate.setTime(child.data.created*1000);
              let dateString = redditPostDate.toLocaleString();
      
              //create an object of the current post 

              let realPermalink = `https://www.reddit.com/${child.data.permalink}`;

              let childObj = {
                title: child.data.title,
                thumbnail: child.data.thumbnail,
                permalink: realPermalink,
                postDate: dateString
              }

              // add post information to array to be parsed later

              ctrl.arrayToLoad.push(childObj);
                
            });
            
          
          });
    }
  }
  
  angular.module('RedditApp').component('redditFeed', {
    template: `
      

      <h2>component test</h2>

      <div data-ng-repeat="post in $ctrl.arrayToLoad">
        
        <h2> {{ post.title }}</h2>
        {{ post.thumnail }}
        <img src="{{ post.thumbnail }}" />

        {{ post.postDate }}

        {{ post.permalink }}
      </div>
   `, // or use templateUrl
    controller: RedditFeed,
});