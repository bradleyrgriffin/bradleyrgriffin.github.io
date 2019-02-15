events = {custom :{
    baseURL : location.protocol + "//" + location.host,
    renderTemplate : function(name){
                      // If the named remote template is not yet loaded and compiled
                      // as a named template, fetch it. In either case, return a promise
                      // (already resolved, if the template has already been loaded)
                      var deferred = $.Deferred();
                      if ($.templates[name]) {
                        deferred.resolve();
                      } else {
                        $.getScript(
                          events.custom.baseURL + "templates/" + name + ".js")
                          .then(function() {
                            if ($.templates[name]) {
                              deferred.resolve();
                            } else {
                              alert("Script: \"" + name + ".js\" failed to load");
                              deferred.reject();
                            }
                          });
                      }
                      return deferred.promise();
                    },
    renderMenu : function(data){
                  $.when(
                    events.custom.renderTemplate("menu")
                  )
                  .done(function() {
                    // Render once all templates for template composition are loaded
                    var html = $.templates.menu.render(data);
                    $("#sidebar-menu-wrapper").html(html);
                  });
    },
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
  }
}

//OnLoad
$(function(){
  var data = {menuItem:[{modId:1, modName:"Module 1"},
                        {modId:2, modName:"Module 2"},
                        {modId:3, modName:"Module 3"}]}
  events.custom.loadTemplate("menu", "#sidebar-menu-wrapper", data, function(){
    window.alert("Haha!");
  });
});
