function RedditService($http) { // $ removed from $http to show that it is possible to rename
  const service = this;
    
  /**
    * Call .json
    * and set ctrl.feed to be the results
    */
    
     service.fetchAwwSubreddit = () => {
        // $http stuff goes here
        // https://www.reddit.com/r/aww/.json
        // call to reddit API goes here, return back to redditFeed controller
        return $http.get('https://www.reddit.com/r/aww/.json');
      };
      
}

angular.module('RedditApp')
.service('RedditService', ['$http', RedditService])
// passing $http service as dependency for our service