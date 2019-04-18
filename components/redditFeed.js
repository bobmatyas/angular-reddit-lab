function RedditFeed(RedditService) {
    const ctrl = this;
    
    // load on initial page load

    ctrl.$onInit = function() {
      ctrl.feed = [];
      ctrl.fetchAwwSubreddit();
    };

   
    ctrl.fetchAwwSubreddit = () => {
        RedditService.fetchAwwSubreddit()
          .then( (data) => {
            // do something with this data
            console.log(data);
            console.log('then called');
            console.log(`title: ${data.data.data.children[3].data.title}`);
            console.log(`thumbnail: ${data.data.data.children[3].data.thumbnail}`);
            let postURL = `https://reddit.com/${data.data.data.children[3].data.permalink}`;
            console.log(`permalink: ${postURL}`);
            ctrl.feed = data;
            console.log(ctrl.feed);
            
            ctrl.arrayToLoad = [];

            data.data.data.children.slice(1, 11).forEach( (child) => {
        
              // skipped the first post which is just an ad for a random sub-reddit
      
              let redditPostDate = new Date();
              redditPostDate.setTime(child.data.created*1000);
              let dateString = redditPostDate.toLocaleString();
      
              ctrl.arrayToLoad.push(
                `{ Permalink: ${child.data.permalink},
                   Thumbnail: ${child.data.thumbnail},
                   Title: ${child.data.title},
                   Date: ${dateString}
                }`
              );            
            });
            
            console.log(ctrl.arrayToLoad);
          });
    }
  }
  
  angular.module('RedditApp').component('redditFeed', {
    template: `
      
      <!-- <p ng-click="$ctrl.fetchAwwSubreddit()">test api loading</p> -->

      <!-- <p>data: {{ $ctrl.feed }} -->
      
      <h2>component test</h2>

      <div data-ng-repeat="post in $ctrl.arrayToLoad">
        
        <h2> {{ post.Title }}</h2>
      </div>
   `, // or use templateUrl
    controller: RedditFeed,
});