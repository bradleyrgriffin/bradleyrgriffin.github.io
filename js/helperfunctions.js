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
