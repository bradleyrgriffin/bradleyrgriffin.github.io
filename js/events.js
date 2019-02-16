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
    form_01 : {sections:[{rows:[{questions:[{}],
                                  id:111}]
                          id:111}],
              id:111}
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
