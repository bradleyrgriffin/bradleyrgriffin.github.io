function loadPage(pageId, data, callbackFunction){
  //Get File name For Template To Load:
  var templateName = props.modules[pageId];
  if(!data){
    data = events.data.pages[templateName];
  }

  events.custom.loadTemplate(templateName, '#page-content-wrapper', data?data:{}, callbackFunction);
}

function refreshContactTable() {
              $("#form_01_tbl").dataTable({
                  retrieve: true,
                  "aaData": events.data.form_01_tbl.data,
                  "aoColumns":[
                    {"mDataProp" : "firstName"},
                    {"mDataProp" : "lastName"},
                    {"mDataProp" : "email"},
                    {"mDataProp" : "address"}
                  ]
                });
}

function login(){
  var form = $('.form-signin');
  var username = form.find('input[type="text"]').val();
  var password = form.find('input[type="password"]').val();

  if(username === props.adminLoginCredentials.username && password === props.adminLoginCredentials.password){
    displayModal();
  }
}

function displayModal(properties){
  var defaultProperties = {
    buttons : '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>',
    header : props.text.TXT_SUCCESS_HEAD,
    body : props.text.TXT_SUCCESS_MSG

  };

  if(properties){
    if(!properties.header){
      properties.header = defaultProperties.header;
    }

    if(!properties.body){
      properties.body = defaultProperties.body;
    }

    if(!properties.buttons){
      properties.buttons = defaultProperties.buttons;
    }
  }else{
    properties = defaultProperties;
  }


  var modal = '<div class="modal fade" id="modal" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">' + properties.header + '</h4></div><div class="modal-body"><p>' + properties.body + '</p></div><div class="modal-footer">' + properties.buttons + '</div></div></div></div>';
  var jqModal = $(modal);

  $('body').append(jqModal);
  $('#modal').modal('show');
}
