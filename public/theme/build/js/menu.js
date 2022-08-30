
$("#menu-toggle-left").click(function(e) {

   setMenuState(1);
   e.preventDefault();
   $("#wrapper").toggleClass("toggled");
   $("#wrapper").addClass("toggled-right");
    $('#sidebar-wrapper').toggleClass('toggled');
    $('#menu .active-ul ul').css('display','none');
   $('#menu .active-ul').addClass('active');
   $('#menu  ul').css('display','none'); 
   setTimeout(function () {
   
      $("#menu-toggle-left").addClass('display-none');
      $("#menu-toggle-right").removeClass('display-none');
        }, 200); // <-- your time (10 sec atm)

   
});
$("#menu-toggle-right").click(function(e) {
   setMenuState(0);
   $('#menu .active-ul ul').css('display','block');
   $('#menu .active-ul').addClass('active');
   e.preventDefault();
   $("#wrapper").toggleClass("toggled");
   $('#sidebar-wrapper').toggleClass('toggled');
   setTimeout(function () {
    $("#menu-toggle-left").removeClass('display-none');
   $("#menu-toggle-right").addClass('display-none');
        }, 200); // <-- your time (10 sec atm)
   
});

$("#sidebar-wrapper").mouseover(function(){
   if($('#sidebar-wrapper').hasClass('toggled'))
   {   
      $('#menu .active-ul ul').css('display','block');
      $('#menu .active-ul').addClass('active');
   }
  });

  $("#sidebar-wrapper").mouseout(function(){
   if($('#sidebar-wrapper').hasClass('toggled'))
   {   
      $('#menu .active-ul ul').css('display','none');
      $('#menu .active-ul').addClass('active');
   }
  });

function setMenuState(state)
{
   $.ajax({
        url: app_url + "/PSHUpdateMenuSessionState",
        type:"POST",
        datatype:"json",
        data:{
          "_token": token,
          "state":state
        },
        success:function(response){
            if(response.return_code == 700)
            {
                $('#modal-danger').modal('show');
                $('#modal-danger #text_error').html(response.return_message);
            }else{
               /* alert(response.return_obj); */
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            ajaxErrorMessage(xhr, ajaxOptions, thrownError);
        }
    });
}

function initMenu() {

   if($('#sidebar-wrapper').hasClass('toggled'))
   {
      $('#menu ul').css('display','none');
   }else{
      $('#menu ul').css('display','none');
      $('#menu .active-ul ul').css('display','block');
      $('#menu .active-ul').addClass('active');
   }
   
   $('#menu ul').children('.current').parent().show();
   //$('#menu ul:first').show();
      $('#menu li a').click(
         function() {
            
            
            var checkElement = $(this).next();
            
            if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
               $('#menu ul:visible').slideUp('normal');
               $('li i').addClass(' fa-angle-right');
               $('li i').removeClass(' fa-angle-down');
               return false;
               
            }

            if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
               $('#menu ul:visible').slideUp('normal');
               checkElement.slideDown('normal');
               $('li i').addClass(' fa-angle-right');
               $('li i').removeClass(' fa-angle-down');
               $(this).children('i').addClass(' fa-angle-down');
               $(this).children('i').removeClass(' fa-angle-right');
               return false;
            }
         }
      );
}

$(document).ready(function() {
   initMenu();
   $('.active-ul i').addClass(' fa-angle-down');
   $('.active-ul i').removeClass(' fa-angle-right');
   $('.active-ul li i').removeClass(' fa-angle-down');
   $('.active-ul li i').addClass(' fa-angle-right');
});
