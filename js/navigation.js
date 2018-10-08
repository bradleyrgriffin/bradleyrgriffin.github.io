"use strict";

$(function(){


//Loads header libraries
      if ($("#linkContent").length){
            var linkContent = "<meta charset=\"utf-8\"><title>Brad Griffin, Professional</title><meta content=\"IE=edge\" http-equiv=\"X-UA-Compatible\"><meta content=\"width=device-width, initial-scale=1\" name=\"viewport\"><meta content=\"Brad Griffin, Technology Professional Portfolio\" name=\"description\"><meta content=\"Brad Griffin\" name=\"author\"><meta name=\"keywords\" content = \"technology, professional, student, college, intern, professionals, thomas, thomas college\"><link href=\"images/logo.png\" rel=\"shortcut icon\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\"><link href=\"https://fonts.googleapis.com/css?family=Roboto+Slab:400,700\" rel=\"stylesheet\" type=\"text/css\"><link href=\"https://fonts.googleapis.com/css?family=Roboto:400,300,500,700\" rel=\"stylesheet\" type=\"text/css\"><link href=\"css/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"css/owl.carousel.css\" rel=\"stylesheet\"><link href=\"css/bootstrap.min.css\" rel=\"stylesheet\"><link href=\"css/owl.carousel.css\" rel=\"stylesheet\"><link href=\"css/owl.theme.css\" rel=\"stylesheet\"><link href=\"css/magnific-popup.css\" rel=\"stylesheet\"><link href=\"css/style.css\" rel=\"stylesheet\"><link href=\"css/responsive.css\" rel=\"stylesheet\"><script type=\"text/javascript\" src=\"https://www.gstatic.com/charts/loader.js\"></script><script type=\"text/javascript\" src=\"js/navigation.js\"></script>";

            $("#linkContent").html(linkContent);
      }

//Loads footer libraries
      if($("#innerJavascript").length){
            var innerJavascript = "<script src=\"js/jquery-1.9.1.min.js\" type=\"text/javascript\"></script><script src=\"js/jquery.appear.js\" type=\"text/javascript\"></script><script src=\"js/bootstrap.min.js\" type=\"text/javascript\"></script><script src=\"js/classie.js\" type=\"text/javascript\"></script><script src=\"js/owl.carousel.min.js\" type=\"text/javascript\"></script><script src=\"js/jquery.magnific-popup.min.js\" type=\"text/javascript\"></script><script src=\"js/masonry.pkgd.min.js\" type=\"text/javascript\"></script><script src=\"js/masonry.js\" type=\"text/javascript\"></script><script src=\"js/smooth-scroll.min.js\" type=\"text/javascript\"></script><script src=\"js/typed.js\" type=\"text/javascript\"></script><script src=\"js/main.js\" type=\"text/javascript\"></script>";
            $("#innerJavascript").html(innerJavascript);
      }

//Loads navigation
      if($("#navigationContent").length){
            var navigationContainer = "<!--PRELOADER--><div class=\"header\"><div class=\"for-sticky\"><!--LOGO--><div class=\"col-md-2 col-xs-6 logo\"><a href=\"http://bradleyrgriffin.me\" style = \"font-size: 30px;\"><img class=\"logo-nav\"><b style = \"font-size:35px;\">B</b>rad</a></div><!--/.LOGO END--></div><div class=\"menu-wrap\"><nav class=\"menu\"><div class=\"menu-list\"><a href=\"http://bradleyrgriffin.me/index.html\"><span>Home</span><a id=\"home-page\" data-scroll=\"\" onclick=\"loadTemplate(1)\" class=\"active\"><span>Projects</span></a></a><a data-scroll=\"\" onclick=\"loadTemplate(2)\"><span>Genetic Algorithm</span></a><a data-scroll=\"\" onclick=\"loadTemplate()\" ><span>3D Graphics</span></a><a data-scroll=\"\" onclick=\"loadTemplate()\"><span>2D Graphics</span></a></div></nav><button class=\"close-button\" id=\"close-button\" onclick=\"hideMenu()\">Close Menu</button></div><button class=\"menu-button\" id=\"open-button\" onclick=\"showMenu()\"><span></span><span></span><span></span></button><!--/.for-sticky--></div>";
            $("#navigationContent").html(navigationContainer);
      }

      $("#home-page").trigger('click');


});

function loadTemplate(tmpl){

      switch(tmpl){
            case 1:
                  $('#container-content').load("pages/projectshome.html");
                  break;
            case 2:
                  $('#container-content').load("pages/geneticAlgorithm.html");
                  break;
            default:
                  $('#container-content').load("blog/createawebsite.html");
      }

}

function showMenu(){
      $("#body").attr("class", "show-menu");
}

function hideMenu(){
      $("#body").attr("class", "");
}
