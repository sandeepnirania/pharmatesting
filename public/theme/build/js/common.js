$(function () {
  function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };
  includeHTML();
});

$(document).ready(function () {


  $(document).on('click', '#PauseStatus', function (e) {
    e.stopPropagation();// stop the menu from hiding;
  });

  

  /*
  Function Description: if errors display in alert modals
  Author: Satish K
  Last Edited:
  */
  var error = $('#error').val();
  if (error != '' && error != undefined) {
    $('#modal-danger').modal('show');
    $('#modal-danger #text_error').html(error);
  }

  /*
  Function Description: code to make modal draggable
  Author: Satish K
  Last Edited:
  */
  $(".modal-dialog").draggable({
    cursor: "move",
    handle: ".modal-header",
    // containment: "window"
  });

  $('.menu-item').click(function () {
    // $('#modal-spinner').modal({
    //   keyboard: false,
    //   backdrop: 'static'
    // });
    // $('#modal-spinner').modal('show');

    $('.menu-item').addClass('disabled');
    setTimeout(function () {
      $('.menu-item').removeClass('disabled');
    }, 5000); // <-- your time (10 sec atm)
  });

});


/*
Function Description: reload the page if user presses forward or backward
Author: Satish K
Last Edited:
*/
var navigationType = (window.performance.getEntriesByType("navigation")[0]).type;
//back_forward value is duplicate tab
if (navigationType == 'back_forward') {
  window.location.reload();
}


function closeAlertModal(){
    setTimeout(function () {
      $('#modal-spinner').modal('hide');
    }, 900); // <-- your time (10 sec atm)

}
/*
Function Description: dynamic modal pop-up display
Author: Satish K
Last Edited:
*/
function showAjaxModal(path) {
  $(document).find('#modal > #modal-content').html("");
  $.ajax({
    type: 'get',
    url: app_url + "/" + path,
    success: function (data) {

      if (data.return_code == 9) {
        $('#modal-danger').modal('show');
        $('#modal-danger #text_error').html(data.return_message);
        $('#modal').modal('hide');
      } else {
        $('#modal').modal({
          keyboard: false,
          backdrop: 'static'
        });
        $('#modal').modal('show');
        $("#modal-save").prop('disabled', false);
        $('#modal #modal-content').html(data);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      ajaxErrorMessage(xhr, ajaxOptions, thrownError);
    }
  });
}

function showAjaxModalOther(path) {
  $(document).find('#modal-other > #modal-content').html("");
  $('#modal-other').modal({
    keyboard: false,
    backdrop: 'static'
  });
  $('#modal-other').modal('show');
  $("#modal-save").prop('disabled', false);

  $.ajax({
    type: 'get',
    url: app_url + "/" + path,
    success: function (data) {
      if (data.return_code == 700) {
        $('#modal-danger').modal('show');
        $('#modal-danger #text_error').html(data.return_message);
        $('#modal-other').modal('hide');
      } else {
        $('#modal-other #modal-content').html(data);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      ajaxErrorMessage(xhr, ajaxOptions, thrownError);
    }
  });
}
/*
Function Description: common function to count the chars in the field passed.   
Key Output: true if the count is valid,else false
Key Input: id of the input field ti be validated
Author: Akshatha 
Last Edited: <06/04/2022>
*/
function countChars(cntid, allowedval) {
  val = $('#' + cntid + '').val();
  if (val.length > allowedval)
    return true;
  else
    return false;
}

/*
Function Description: set key-press on for all the modal if any key pressed in-side modal area
Author: Satish K
Last Edited:
*/
$(document).on('keypress', '.form-control', function () {
  $('#keyPress').val('on');
}).on('mousedown', '.oneselect', function () {
  $('#keyPress').val('on');
}).on('mousedown', '.form-control', function () {
  $('#keyPress').val('on');
}).on('click', '.buttons', function () {
  $('#keyPress').val('on');
});

function onlyNumberKey(evt) {

  // Only ASCII character in that range allowed
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    return false;
  return true;
}


/*
Function Description: code to allow one modal on another
Author: Satish K
Last Edited:
*/
(function ($, window) {
  'use strict';

  var MultiModal = function (element) {
    this.$element = $(element);
    this.modalCount = 0;
  };

  MultiModal.BASE_ZINDEX = 1040;

  MultiModal.prototype.show = function (target) {
    var that = this;
    var $target = $(target);
    var modalIndex = that.modalCount++;

    $target.css('z-index', MultiModal.BASE_ZINDEX + (modalIndex * 20) + 10);

    // Bootstrap triggers the show event at the beginning of the show function and before
    // the modal backdrop element has been created. The timeout here allows the modal
    // show function to complete, after which the modal backdrop will have been created
    // and appended to the DOM.
    window.setTimeout(function () {
      // we only want one backdrop; hide any extras
      if (modalIndex > 0)
        $('.modal-backdrop').not(':first').addClass('hidden');

      that.adjustBackdrop();
    });
  };

  MultiModal.prototype.hidden = function (target) {
    this.modalCount--;

    if (this.modalCount) {
      this.adjustBackdrop();

      // bootstrap removes the modal-open class when a modal is closed; add it back
      $('body').addClass('modal-open');
    }
  };

  MultiModal.prototype.adjustBackdrop = function () {
    var modalIndex = this.modalCount - 1;
    $('.modal-backdrop:first').css('z-index', MultiModal.BASE_ZINDEX + (modalIndex * 20));
  };

  function Plugin(method, target) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('multi-modal-plugin');

      if (!data)
        $this.data('multi-modal-plugin', (data = new MultiModal(this)));

      if (method)
        data[method](target);
    });
  }

  $.fn.multiModal = Plugin;
  $.fn.multiModal.Constructor = MultiModal;

  $(document).on('show.bs.modal', function (e) {
    $(document).multiModal('show', e.target);
  });

  $(document).on('hidden.bs.modal', function (e) {
    $(document).multiModal('hidden', e.target);
  });
}(jQuery, window));


function highlightelement(elementID) {
  $("#" + elementID + "").css({ "background-color": "#FFCECE" });
  $("#" + elementID + "").css({ "border": "1px solid red" });
  $("#" + elementID + "").focus();
}
function removehighlight() {
  $(":text").css({ "background-color": "#FFFFFF" })
  $(":text").css({ "border": "1px solid #707070" })
  $("textarea").css({ "background-color": "#FFFFFF" })
  $("textarea").css({ "border": "1px solid #707070" })
}

/*
           Function Description: function that confirms for the set and unset (Pause State of the application). 
           Key Output: Sucess/Failure
           Key Input: Pause key set/unset
           Author: Akshatha
           Last Edited: <03-05-2022>
 */

function PauseActivity() {
  if ($('#PauseStatus').prop('checked')) {
    PauseActivityStatus = 1;
    msg = "This will bring down the Atlas Application for ALL Users. Are you sure you want to proceed? Y/N";

  } else {
    PauseActivityStatus = 0;
    msg = "This will enable the Atlas Application for ALL Users. Are you sure you want to proceed? Y/N";
  }
  var temp = confirm(msg);
  if (temp) {
    callajaxfunction(PauseActivityStatus);
  } else {
    if (PauseActivityStatus = 1) {
      $('#PauseStatus').prop('checked', false);
    } else {
      $('#PauseStatus').prop('checked', true);
    }
    return false;
  }

}
/*
Function Description: Ajax call to set or unset the pause state according to the users input. 
Key Output: Success/Failure
Key Input: Pause key set/unset
Author: Akshatha
Last Edited: <03-05-2022>
*/

function callajaxfunction(parameters) {
  $('#modal-spinner').modal('show');
  $.ajax({
    url: app_url + '/PSHPostPauseActivity',
    type: "POST",
    datatype: "json",
    data: {
      "_token": token,
      "pauseactivitystatus": parameters
    },
    success: function (data) {
      if (data.return_status == 1) {
        isLoading_save = false;
        $('#modal-spinner').modal('hide');
        setTimeout(function () {
          $('#modal-spinner').modal('hide');
        }, 300); // <-- your time (10 sec atm)
        $('#modal-success .text-muted').html(data.return_message);
        $('#modal-success').modal('show');
        $('#modal').modal('hide');



      } else {
        isLoading_save = false;
        setTimeout(function () {
          $('#modal-spinner').modal('hide');
        }, 300); // <-- your time (10 sec atm)

        $('#modal-danger').modal('show');
        $('#modal-danger .text-muted').html(data.return_message);
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
      ajaxErrorMessage(xhr, ajaxOptions, thrownError);
    }
  });
}


function ajaxErrorMessage(xhr, ajaxOptions, thrownError) {
  if (xhr.status === 0) {
    setTimeout(function () {
      $("#overlay").hide(300);
    }, 1);
    $('#modal-spinner').modal('hide');

    // msg = ' Please check your internet connection.';
    // $('#modal-danger').modal('show');
    // $('#modal-danger #text_error').html(msg);
  } else if (typeof xhr.responseJSON['return_message'] == "undefined") {

    setTimeout(function () {
      $("#overlay").hide(300);
    }, 1);
    $('#modal-spinner').modal('hide');

    msg = 'Internal Server Error. Please contact Administrator.';
    $('#modal-danger').modal('show');
    $('#modal-danger #text_error').html(msg);

  } else if (xhr.responseJSON['return_code'] == '9') {
    // $('#modal-danger').modal('show');
    // $('#modal-danger #text_error').html();
    // window.location.href = app_url + '/logout';
  } else {
    $('#modal-danger').modal('show');
    $('#modal-danger #text_error').html(xhr.responseJSON['return_message']);
    window.location.href = app_url + '/logout';
  }
}

function showCallLogModal() {
  var ClientKey = $('#GlobalClientKey').val();
  if (ClientKey != 'all' && ClientKey != 0 && ClientKey != '') {
    showAjaxModal('PSHCallLogeDetailsUI?method=Add&action=CallLog&ClientKey=' + ClientKey);
  } else {
    alert('A Client must be selected in the Global Filter to view a Call Log.')
  }

}

function  restore(){
  $.ajax({
  url: app_url + '/restoresession',
  type: "POST",
  datatype: "json",                                                      
  success: function (response) {                                                           

  },
  error: function (xhr, ajaxOptions, thrownError) {
      ajaxErrorMessage(xhr, ajaxOptions, thrownError);
  }
});

}

function HighlightMandatoryElement(elementID) {
  $("#" + elementID).css({
      "background-color": "#FFCECE"
  });
  $("#" + elementID).css({
      "border": "1px solid red"
  });
  $("#" + elementID).focus();

  return false;
}

function RemoveHighlightMandatoryElement(elementID) {
  $("#" + elementID).css({
      "background-color": ""
  });
  $("#" + elementID).css({
      "border": ""
  });
}