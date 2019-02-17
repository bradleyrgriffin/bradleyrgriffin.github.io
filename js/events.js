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
              "name": "First Name",
              "id" : 0
            },{
              "type": "text",
              "name": "Last Name",
              "id" : 1
            }
          ],
          "id": 0
        }
      ],
      "id": 0,
      "name":"Demographic Information",
      "showHeader": true
    },
    {
      "rows": [
        {
          "questions": [
            {
              "type": "email",
              "name": "Email",
              "id":2
            }
          ],
          "id": 1
        }
      ],
      "id": 1,
      "name":"Contact Information",
      "showHeader": false
    },
{
      "rows": [
        {
          "questions": [
            {
              "type": "text",
              "name": "Address",
              "id" : 3
            }
          ],
          "id": 2
        }
      ],
      "id": 2,
      "name":"Address Information",
      "showHeader": true
    }
  ],
  "id": 9999,
  "name":"Subscriber Information",
  "module":"Forms"
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
    $("#form_01_tbl").DataTable({
      "aoColumns":[
        {"data" : "firstName"},
        {"data" : "lastName"},
        {"data" : "email"},
        {"data" : "address"}
      ]
    });
    console.log("Datatable generated");
  });

});

function addData() {
  $("#form_01_tbl").DataTable().destroy().empty();
  var aData = [];

  var vData = {
    firstName : $("input[id='0']").val(),
    lastName : $("input[id='1']").val(),
    email : $("input[id='2']").val(),
    address : $("input[id='3']").val()
  }


  aData.push(vData);

  $("#form_01_tbl").DataTable({
    "aoColumns":[
      {"data" : "firstName"},
      {"data" : "lastName"},
      {"data" : "email"},
      {"data" : "address"}
    ]
  }).rows().add(aData).draw();
}
