<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" id="modal-content">


    </div>
</div>
<div class="modal fade" id="modal-other" tabindex="-2" style="z-index: 2070; display: block;" role="dialog" aria-labelledby="exampleModalLabelOther" aria-hidden="true">
    <div class="modal-dialog" role="document" id="modal-content">


    </div>
</div>


<div class="modal-preview fade" id="modal-preview" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" id="modal-content">


    </div>
</div>
<div class="modal-preview fade" id="modal-other" tabindex="-2" style="z-index: 2070; display: block;" role="dialog" aria-labelledby="exampleModalLabelOther" aria-hidden="true">
    <div class="modal-dialog" role="document" id="modal-content">


    </div>
</div>


<script src="{{url('theme/build/js/jquery.min.js')}}"></script>
<script>
    $(document).ready(function() {
        $('.modal').draggable({
            handle: "#modal",
            // containment: "window"
        });
    });
    $('.alpha-3').click(function() {
        $(this).toggleClass('full');
    });


    $(document).on('keypress', '.form-control', function() {
        $('#keyPress').val('on');
    }).on('mousedown', '.oneselect', function() {
        $('#keyPress').val('on');
    }).on('mousedown', '.form-control', function() {
        $('#keyPress').val('on');
    }).on('click', '.buttons', function() {
        $('#keyPress').val('on');
    });

    function onlyNumberKey(evt) {

        // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode
        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
            return false;
        return true;
    }

    function reloadDatatable(table) {
        table.DataTable().ajax.reload();
    }


    $(document).ready(function() {
        $('.modal-preview').draggable({
            handle: "#modal-preview",
            // containment: "window"
        });
    });

</script>