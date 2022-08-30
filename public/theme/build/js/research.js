$(document).ready(function(){

    $('#submit-new').on('click', function(){
        event.preventDefault();
        let rearchName = $.trim($('#job-research-name').val());
        $('#entry_type').val('new');
        if(rearchName != ""){
            $.ajax({
                url : BASE_URL + "/new-research/check-name",
                type: "POST",
                data: {name : rearchName, _token : $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                success: function(response){
                    if(response.status){
                        $('#mange-job-research').submit();
                    }else{
                        alert(response.message)
                    }
                }
            });
        }else{
            alert("Please enter a research job name");
        }
    });
    
    $('#jurisdictions_select_all').on('click', function(){
        $('.jurisdictions_check').each(function(index, ele){
            $(ele).prop('checked', true);
        })    
    });

    $('#jurisdictions_unselect_all').on('click', function(){
        $('.jurisdictions_check').each(function(index, ele){
            $(ele).prop('checked', false);
        })    
    });

    $('#save_juricdis').on('click', function(){
        $('#mange-job-research').submit();
    });
    
    $('#clear_all_questionnaire').on('click', function(){
        $('.questionnaire_input').each(function(index, ele){
            $(ele).prop('checked', false);
        })
    });

    $('.questionnaire_input').on('change', function(){
        let val = $(this).val();
        if($(this).attr('type') == "radio" && val === "N"){
            $(this).closest('.question-container').addClass('question-container-no');
            $(this).closest('.question-container').find('ul .questionnaire_input').each(function(index, ele){
                $(ele).prop('disabled', true);
            });
        }

        if($(this).attr('type') == "radio" && val === "Y"){
            $(this).closest('.question-container').removeClass('question-container-no');
            $(this).closest('.question-container').find('ul .questionnaire_input').each(function(index, ele){
                $(ele).prop('disabled', false);
            });
        }
    });

    $('#save_questionnaires').on('click', function(){
        $('#mange-job-research').submit();
    });

    $('#incomplete_research_job').on('click', function(){
        event.preventDefault();
        $('#entry_type').val('process_incomplete');
        let researchJobId = $('input[name="incomplete_job_id"]:checked').val();
        if(typeof researchJobId == "undefined"){
            alert("Please select a incomplete job.");
            return ;
        }
        let rearchName = $.trim($('#job-research-name').val());
        if(rearchName != ""){
            $.ajax({
                url : BASE_URL + "/new-research/check-name",
                type: "POST",
                data: {name : rearchName, _token : $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                success: function(response){
                    if(response.status){
                        $('#mange-job-research').submit();
                    }else{
                        alert(response.message)
                    }
                }
            });
        }else{
            $('#mange-job-research').submit();
        }
    });

    $('#copyfrom_research_job').on('click', function(){
        event.preventDefault();
        let rearchName = $.trim($('#job-research-name').val());
        $('#entry_type').val('copy_from');
        if(rearchName != ""){
            $.ajax({
                url : BASE_URL + "/new-research/check-name",
                type: "POST",
                data: {name : rearchName, _token : $('meta[name="csrf-token"]').attr('content')},
                dataType: "json",
                success: function(response){
                    if(response.status){
                        $('#mange-job-research').submit();
                    }else{
                        alert(response.message)
                    }
                }
            });
        }else{
            alert("Please enter a research job name");
        }
    });

    $('#save_research_job').on('click', function(){
        $('#submit_type').val('save');
        $('#mange-job-research').submit();
    })

    $('#save_submit_job').on('click', function(){
        $('#submit_type').val('submit');
        $('#mange-job-research').submit();
    })
});