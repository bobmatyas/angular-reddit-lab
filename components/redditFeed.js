function RedditFeed(RedditService, $q) {
  // have to add $q to use promises 

    const ctrl = this;
    
    // load on initial page load

    ctrl.$onInit = function() {
      ctrl.feed = [];
      ctrl.fetchAwwSubreddit();
    };

   
    ctrl.fetchAwwSubreddit = () => {

      return $q(function(resolve, reject) {
        RedditService.fetchAwwSubreddit()
          .then( (response) => {

            ctrl.feed = response;
            ctrl.arrayToLoad = [];

            response.data.data.children.slice(1, 11).forEach( (child) => {
              // skipped the first post which is just an ad for a random sub-reddit
              
              //format the post date
              let redditPostDate = new Date();
              redditPostDate.setTime(child.data.created*1000);
              let dateString = redditPostDate.toLocaleString();
                     
              //modify permalink to add reddit link 
              let realPermalink = `https://www.reddit.com/${child.data.permalink}`;

              //create an object of the current post
              let childObj = {
                title: child.data.title,
                thumbnail: child.data.thumbnail,
                permalink: realPermalink,
                postDate: dateString
              }

              // add post information to array to be parsed later
              ctrl.arrayToLoad.push(childObj);
                
            });
            resolve();
          })
          

      });

        
    }
  }
  
  angular.module('RedditApp').component('redditFeed', {
    template: `
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