events = {custom :{
    baseURL : location.protocol + "//" + location.host,
    loadTemplate: function(tmpl, container, data, callback){
      var file = events.custom.baseURL + "/templates/" + tmpl + ".html";
      $.when($.get(file))
       .done(function(tmplData) {
           $.templates({ tmpl: tmplData });
           $(container).html($.render.tmpl(data));
           if(callback){
             callback();
           }
       });
    }
  },
  data: {
    menuItems : {menuItem:[{modId:1, modName:"About"},
                           {modId:2, modName:"Education"},
                           {modId:3, modName:"Experience"}
                         ]},
    form_01 : {
       data:{sections: [
                         {rows:[
                                 {questions:[{name:"Email", type:"email"}, {name:"First Name:", type:"text"}], id:111},
                                 {questions:[{name:"Email 2", type:"email"}, {name:"First Name 2:", type:"text"}], id:222}
                               ],
                         id: 111},
                         {rows:[
                                 {questions:[{name:"Email 3", type:"email"}, {name:"First Name 3:", type:"text"}], id:333},
                                 {questions:[{name:"Email 4", type:"email"}, {name:"First Name 4:", type:"text"}], id:444}
                               ],
                         id: 222}
                       ]},
        id: 99999
     }
  }
}

//OnLoad
$(function(){
  //Load Menu
  events.custom.loadTemplate("menu", "#sidebar-menu-wrapper", events.data.menuItems, function(){
    console.log("Menu Loaded");
  });

  events.custom.loadTemplate("form_01", "#page-content-wrapper", events.data.form_01, function(){
    console.log("form_01 Loaded");
  });
});
