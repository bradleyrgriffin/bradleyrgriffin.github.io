events = {custom :{
    baseURL : location.protocol + "//" + location.host,
    loadTemplate: function(tmpl, container, data, callback){
      var file = events.custom.baseURL + "/templates/" + tmpl + ".html";
      $.when($.get(file))
       .done(function(tmplData) {
           $.templates({ tmpl: tmplData });
           $(container).html($.render.tmpl((data?data:{})));
           if(callback){
             callback();
           }
       });
    }
  },
  data: {
    globals :{loggedUserName: null},
    menuItems : {menuItem:[{modId:1, modName:"About"},
                           {modId:2, modName:"Education"},
                           {modId:3, modName:"Experience"},
                           {modId:4, modName:"Contact"},
                           {modId:5, modName:"Website Design"}
                         ]},
    tables : { contact: {data: []}},
    pages : {'about' : {firstName : "Bradley",
                        lastName : "Griffin",
                        emailAddress : "brad.raymond.griffin@gmail.com"},
            'education' : {firstName : "Bradley",
                           lastName : "Griffin",
                           emailAddress : "brad.raymond.griffin@gmail.com"},
            'experience' : {firstName : "Bradley",
                            lastName : "Griffin",
                            emailAddress : "brad.raymond.griffin@gmail.com"},
            'contact' : {firstName : "Bradley",
                        lastName : "Griffin",
                        emailAddress : "brad.raymond.griffin@gmail.com"},
            'website-design' : {firstName : "Bradley",
                                lastName : "Griffin",
                                emailAddress : "brad.raymond.griffin@gmail.com"},
            'logged-in' : {loggedInUser: events.data.globals.loggedUserName}
            }
  }
}

//OnLoad
$(function(){
  //Load Menu
  events.custom.loadTemplate("menu", "#sidebar-menu-wrapper", events.data.menuItems, function(){
    console.log("Menu Loaded");
  });

  //Click First Item
  $('#sidebar-menu-wrapper > li > a').first().click();

  //Set Website name
  $('.navbar-brand').html(props.websiteName);

});
