function RedditService(http) { // $ removed from $http to show that it is possible to rename
  const service = this;
    
  /**
    * Call .json
    * and set ctrl.feed to be the results
    */
    
     service.fetchAwwSubreddit = () => {
      // $http stuff goes here
      // call to reddit API goes here, retur back to redditFeed controller
    }

}

angular.module('RedditApp')
.service('RedditService', ['$http', RedditService])
// passing $http service as dependency for our service