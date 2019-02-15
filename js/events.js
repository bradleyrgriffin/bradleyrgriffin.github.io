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
      $.when(events.custom.renderTmpl(tmpl, data, container)).done(function(){
        if(callback){
          callback();
        }
      });
    },
    renderTmpl : function(tmpl, data, container){
      $.get(events.custom.baseURL + "/templates/" + tmpl + ".html", function(value){
        var template = $.templates(value);
        var htmlOutput = template.render((data? data:{}));
        $(container).html(htmlOutput);
      });

    }
  }
}
