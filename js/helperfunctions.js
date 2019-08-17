var appNavigation = {currentAppId : null};

function loadPage(pageId, data, callbackFunction){
  //Get File name For Template To Load:
  var templateName = props.modules[pageId];
  if(!data){
    data = events.data.pages[templateName];
  }

  appNavigation.currentAppId = pageId;
  if(!callbackFunction){
    callbackFunction = function(){
      if(props.modulesWithTables[pageId].display){
        generateDatatable('#' + props.modulesWithTables[pageId].tableName, events.data.tables[pageId].data);
      }
    };
  }
  events.custom.loadTemplate(templateName, '#page-content-wrapper', data?data:{}, callbackFunction);

  //Then Pre-pend the tab-list
  // $('#page-content-wrapper').prepend('<div id="moduleTabList"></div>');
  // events.custom.loadTemplate('tabList', '#moduleTabList', props.tabList[pageId]?data:{});
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
    createCookie({"username" : username});
    events.data.pages['logged-in'].loggedInUserName = username;
    $('.navbar-right').prepend('<li><span>Hi ' + username + '!</span></li>');
    loadPage(8);
    var loginButton = $('a:contains(Login)');
    loginButton.val('Logout');
    loginButton.attr('onclick', 'logout()');

    displayModal();

    updateRoleBasedMenu();
  }
}

function updateRoleBasedMenu(){
  var cookieData = getCookies();
  if(cookieData["username"] === props.adminLoginCredentials.username){
    if(props.adminLoginCredentials.role){
      $('#sidebar-menu-wrapper').append('<li><a onclick="loadPage(' + 10 + ')">Administrator</a></li>');
    }
  }
}

//Data should be {} with key/value pairs
function createCookie(data){
  var currentCookies = getCookies();
  if(!currentCookies){
    currentCookies={};
  }

  $.each(data, function(key, value){
    currentCookies[key] = value;
  });

  var cookieString = "";
  //Generate Cookie from K/V pairs
  $.each(currentCookies, function(key, value){
    cookieString += key + "+" + value + ";";
  });
  document.cookie = cookieString + "path=/;expires=" + new Date() + ";";
}

function getCookies(){
  var c = document.cookie;
  var cData = [];
  if(c){
    cData = c.split(";");
  }
  var individualCookies = {};
  $.each(cData, function(indx, str){
    var cookie = str.split("=");
    individualCookies[cookie[0]] = cookie[1];
  });
  return individualCookies;
}

function logout(){
  $('.navbar-right').find('li').first().detach();
  events.data.pages['logged-in'].loggedInUserName = null;
  loadPage(9);
  var logoutButton = $('a:contains(Logout)');
  logoutButton.val('Login');
  logoutButton.attr('onclick', 'login()');
  displayModal();
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

function generateDatatable(container, data, configuration){
  if(!container){
    container = '#page-content-wrapper';
  }
  if(!configuration){
    configuration = {columns : [{"column" : "id"},
                                {"column" : "name"},
                                {"column" : "createdDate"},
                                {"column" : "modifiedDate"}],
                    retrieve : true};
  }
  if(!data){
    data = [];
  }

  var renamedColumns = [];
  $.each(configuration.columns, function(indx, col){
    renamedColumns.push({"mDataProp" : col["column"]});
  });
  configuration.columns = renamedColumns;

  $(container).dataTable({
      retrieve: configuration.retrieve,
      "aaData": data,
      "aoColumns": configuration.columns
    });

}

function addMenuPage(){
  var maxId = 0;
  $.each(props.modules, function(indx, itm){
    itm.modId > maxId?maxId=itm.modId:console.log(itm.modName + ' Module skipped.');
  });
  maxId++;
  props.modules[maxId] = 'New Module' + maxId.toString();
  $('#sidebar-menu-wrapper').append('<li><a onclick="loadPage(' + maxId + ')">' + 'New Module' + maxId.toString() + '</a></li>');
}
