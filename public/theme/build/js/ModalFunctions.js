
function showConfirm(){
    var temp= confirm("Changes to this screen will not be saved. Are you sure you want to close this screen? Y/N");
    if(temp)
    {
        //$('.modal').modal('hide');//remove by mangesh 21/7/2021
        $('#modal').modal('hide'); //added by mangesh 21/7/2021
        $('#modal').find('.modal-body').html('');
    }
}

function showKeyPressConfirm(){
    var keyPress= $('#keyPress').val();
    if(keyPress == 'on')
    {

        // alertify.confirm('<font style="color:red;font-size:20px;">Confirm</font>', 'Changes to this screen will not be saved. Are you sure you want to close', function(){$("#modal-large-user").modal('hide')}
        //                 , function(){}).set({labels:{ok:'OK', cancel: 'CANCEL'}});
    var temp= confirm("Changes to this screen will not be saved. Are you sure you want to close this screen? Y/N");
    if(temp)
    {
        $('#keyPress').val("");
        //$('.modal-body').html('');
        $('#modal').find('.modal-body').html('');
        $('.modal').modal('hide');
     }
    }
    else{
        $('#keyPress').val("");
        // $('.modal-body').html('');
        $('#modal').find('.modal-body').html('');
        $('.modal').modal('hide');
    }
 
}

        



