if (Meteor.isClient) {
  Template.home.ramble = function () {
    return Rambles.find();
  };

function getInfo (e) {
      var formInfo = {};

          formInfo.first = $(e.target).find('#line-1').val(),
          formInfo.second = $(e.target).find('#line-2').val(),
          formInfo.third = $(e.target).find('#line-3').val(),
          formInfo.lines = [formInfo.first, formInfo.second, formInfo.third],
          formInfo.user = [Meteor.userId()];

      return formInfo;
}

  Template.add.rendered = function () {
    Rambles.update(Router.current().params._id, {
     $set: {locked: true}
    }); 
  };

  Template.add.events({
    'submit form': function(e) {
      e.preventDefault();

      if (Meteor.userId()) {   
        var formInfo = getInfo(e);

        console.log(formInfo);

        Rambles.update(this._id, {
          $inc: {length: -3},
          $set: {lastLine: formInfo.third,
                 lastUser: formInfo.user,
                 locked: false},
          $push: {lines: {$each: formInfo.lines},
                  userList: {$each: formInfo.user}}
        }, function(error){
          errorHandler(error);
        });
    } else {
      alert('please sign in');
    }
   }
  })
  
  Template.newRamble.events({
    'submit form': function(e) {
      e.preventDefault();

      if (Meteor.userId()) {   
        var formInfo = getInfo(e),
            ramble = {
              lines: formInfo.lines,
              lastLine: formInfo.third,
              userList: formInfo.user,
              lastUser: formInfo.user,
              length: 96,
              complete: false,
              locked: false
            };

      Rambles.insert(ramble, function(error){
        errorHandler(error);
      });
    } else {
      alert('please sign in!');
    }
  }});
  
  function errorHandler (e) {
           if (e) {
            alert("Error: " + error.reason);
          } else {
            Rambles.update(this._id, {
              $set: {locked: false}
            });
            Router.go('home');
          }

  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


