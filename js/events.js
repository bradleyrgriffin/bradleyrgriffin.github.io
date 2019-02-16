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
  "sections": [
    {
      "rows": [
        {
          "questions": [
            {
              "type": "text",
              "name": "First Name"
            },{
              "type": "text",
              "name": "Last Name"
            }
          ],
          "id": 0
        }
      ],
      "id": 0,
      "name":"Demographic Information"
    },
    {
      "rows": [
        {
          "questions": [
            {
              "type": "email",
              "name": "Email"
            }
          ],
          "id": 1
        }
      ],
      "id": 1,
      "name":"Contact Information"
    },
{
      "rows": [
        {
          "questions": [
            {
              "type": "text",
              "name": "Address"
            }
          ],
          "id": 2
        }
      ],
      "id": 2,
      "name":"Address Information"
    }
  ],
  "id": 9999,
  "name":"Subscriber Information"
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
