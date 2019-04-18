function RedditFeed(RedditService) {
    const ctrl = this;
    
    // list of reddit posts to display
    ctrl.feed = [];

    ctrl.fetchAwwSubreddit = () => {
        RedditService.fetchAwwSubreddit()
          .then( (data) => {
            // do something with this data
          })
    }
  }
  
  angular.module('RedditApp').component('redditFeed', {
    template: `
      <h2>component test</h2>
      <div data-ng-repeat="post in $ctrl.feed">
        <h2>{{post.title}}</h2>
      </div>
   `, // or use templateUrl
    controller: RedditFeed,
});