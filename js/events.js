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
                          baseURL + "templates/" + name + ".js")
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
                    renderTemplate("people")
                  )
                  .done(function() {
                    // Render once all templates for template composition are loaded
                    var html = $.templates.menu.render(data);
                    $("#sidebar-menu-wrapper").html(html);
                  });
    }
  }
}
