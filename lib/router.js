Router.configure({
  newRamble: 'new',
  home: 'home'
})

Router.map(function(){
  this.route('newRamble', { path: '/new' })
  this.route('home', { path: '/' })
  this.route('add', { path: '/add/:_id',
                      data: function() { 
                        return Rambles.findOne(this.params._id); 
                      } 
  })
})
