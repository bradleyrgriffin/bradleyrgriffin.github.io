$.templates("menu", '<div class="list-group list-group-flush"><ul>{{for menuItem}}<li class="list-group-item list-group-item-action bg-light" onClick="loadPage({{:modId}})">{{:modName}}</li>{{/for}}</ul></div>');