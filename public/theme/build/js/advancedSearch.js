
    var category;
    if(category != 'External-WG' && category != 'External-SS')
    {
        var license_fields = {
            "":"",
            "Compliance Manager": "Team",
            "Client Code" : "ClientCode",
            "Company": "CompanyName",
            "Facility": "FacilityName",
            "State" : "StateShortName",
            "Requirement Name": "FormerLicenseName",
            "Requirement Details": "LicenseDetails",
            "Requirement Number" : "LicenseNumber",
            "Expiry Date" : "a.ExpirationDate",
            "Requirement Status" : "StatusName",
            "Verfied On" : "DateLastVerified"
            }; 
            
            var license_activity_fields = {
                "":"",
                "Compliance Manager": "Team",
                "Client Code" : "ClientCode",
                "Company": "CompanyName",
                "Facility": "FacilityName",
                "Requirement Name": "FormerLicenseName",
                "Requirement Number" : "LicenseNumber",
                "State" : "StateShortName",
                "Expiry Date" : "a.ExpirationDate",
                "Requirement Status" : "StatusName",
                "Activity Start" : "ActivityStartDate",
                "Activty" : "LicenseActivity",
                "Progress" : "i.LicenseActivityStandingKey",
                //"Verfied On" : "DateLastVerified"
                }; 
            var task_fields = {
                "":"",
                "Compliance Manager": "Team",
                "Client Code": "ClientCode",
                "Company": "CompanyName",
                "Facility": "FacilityName",
                "Requirement Name": "FormerLicenseName",
                "Requirement Number" : "LicenseNumber",
                "State" : "StateShortName",
                "Activity" : "LicenseActivity",
                "Task StartDate" : "CreationDate",
                "Created By" : "u.Firstname",
                "Task Type" : "TaskTypeName",
                "Task Standing" : "TaskStanding",
                "Task Due Date" : "ExpCompletionDate",
                "Assigned To" : "y.Firstname",
            };
            var doc_fields ={
                "":"",
                "Doc Status Date": "DocStatusDate",
                "Doc Category"   : "DocumentCategoryDesc",
                "Company"        : "CompanyName",
                "Facility"       : "FacilityName",
                "Owner/Person/Vendor": "Name",
                "Doc Name"       : "DocumentNameDesc",
                "Doc Details"    : "DocDetails",
                "Doc No"         : "DocNo",
                "State"          : "StateShortName",
                "Issue Date"     : "IssueDate",
                "Expiry Date"    : "ExpiryDate",
                "Doc Type"       : "DocumentTypeDesc",
                "Doc Status"     : "DocumentStatusDesc",
            }
    }else{
        var license_fields = {
            "":"",
            "Compliance Manager": "Team",
            "Company": "CompanyName",
            "Facility": "FacilityName",
            "State" : "StateShortName",
            "Requirement Name": "FormerLicenseName",
            "Requirement Details": "LicenseDetails",
            "Requirement Number" : "LicenseNumber",
            "Expiry Date" : "a.ExpirationDate",
            "Requirement Status" : "StatusName",
            "Verfied On" : "DateLastVerified"
            }; 
            
            var license_activity_fields = {
                "":"",
                "Compliance Manager": "Team",
                "Company": "CompanyName",
                "Facility": "FacilityName",
                "Requirement Name": "FormerLicenseName",
                "Requirement Number" : "LicenseNumber",
                "State" : "StateShortName",
                "Expiry Date" : "a.ExpirationDate",
                "License Status" : "StatusName",
                "Activity Start" : "ActivityStartDate",
                "Activty" : "LicenseActivity",
                "Progress" : "i.LicenseActivityStandingKey",
                //"Verfied On" : "DateLastVerified"
                }; 
            var task_fields = {
                "":"",
                "Compliance Manager": "Team",
                "Company": "CompanyName",
                "Facility": "FacilityName",
                "Requirement Name": "FormerLicenseName",
                "Requirement Number" : "LicenseNumber",
                "State" : "StateShortName",
                "Activity" : "LicenseActivity",
                "Task StartDate" : "CreationDate",
                "Created By" : "u.Firstname",
                "Task Type" : "TaskTypeName",
                "Task Standing" : "TaskStanding",
                "Task Due Date" : "ExpCompletionDate",
                "Assigned To" : "y.Firstname",
            };
            var doc_fields ={
                "":"",
                "Doc Status Date": "DocStatusDate",
                "Doc Category"   : "DocumentCategoryDesc",
                "Company"        : "CompanyName",
                "Facility"       : "FacilityName",
                "Owner/Person/Vendor": "Name",
                "Doc Name"       : "DocumentNameDesc",
                "Doc Details"    : "DocDetails",
                "Doc No"         : "DocNo",
                "State"          : "StateShortName",
                "Issue Date"     : "IssueDate",
                "Expiry Date"    : "ExpiryDate",
                "Doc Type"       : "DocumentTypeDesc",
                "Doc Status"     : "DocumentStatusDesc",
            }
    }

    var notes_fields = [];
    var document_fields = [];

function advancedSearchFunc(type){
    
        $('#modal_advance').modal({
            keyboard: false,
            backdrop: 'static'
        });
        $('#modal_advance').modal('show');
        assignFields(type,0);
        $('#search_type').val(type);
    }

 // code to add search entry - satish mk - 21-06-2021
var id = 1;
$('#button_add_search_entry').click(function(){
    var temp = ' <div class="form-row" id="re'+id+'" >\n\
    <div class="form-group col-3">\n\
    <select class=" form-control form-select oneselect" name="advance['+id+'][condition]" id="condition'+id+'" style="width:100%" required>\n\
    <option value="AND" > AND</option><option value="OR" >OR</option>\n\
    </select></div>\n\
    <div class="col-3"> <img class="img-license-2" onclick="removeDiv('+id+')" src="./theme/build/images/delete1.png" alt=""></div>\n\
    <div class="form-group col-4"></div><div class="form-group col-4">\n\
    <select class=" form-control  form-select oneselect" name="advance['+id+'][field]" id="field'+id+'" onchange="changeValueType('+id+')" required>\n\
    <option value="" class="option-default"></option>\n\
    </select></div>\n\
    <div class="form-group col-4">\n\
    <select class=" form-control form-select oneselect" name="advance['+id+'][operator]" id="operator'+id+'" required>\n\
    <option value="" class="option-default"></option><option value="equals" >equals</option><option value="contains" >contains</option><option value="lessthan" >is less than</option><option value="contains" >is greater than</option><option value="lessthanandequal" >is less than or equals</option><option value="greterthanequal" >is greater than or equals </option>\n\
    </select></div>\n\
    <div class="form-group col-4">\n\
    <input class="form-control form-select" name="advance['+id+'][search_value_one]" id="search_value_one'+id+'" required></div></div>\n\
    ';
    $('#count').val((id+1));
    $('#arrayLength').val(parseInt(id+1));
    $('#search_div').append(temp);
    var type= $('#search_type').val();
    assignFields(type,id);
    id++;
});
// 
// code to remove div - satish mk - 21-06-2021
function removeDiv(d)
{
var x = document.getElementById("re"+d);
x.remove(x.d);
var y = document.getElementById("hr"+d);
if(y!=null)
        y.remove(y.d);
$('#arrayLength').val(parseInt(id-1));
}

function assignFields(type,id)
{
    
    if($('#field'+id).val() == "")
    {
        $('#field'+id).find('option').remove();
        if(type == 'license'){
            $.each(license_fields, function(i, p) {
                   
                        $('#field'+id).append($('<option></option>')
                    .val(p).html(i));
                   
            });
        }else if(type == 'tasks'){
            $.each(task_fields, function(i, p) {
                
                    $('#field'+id).append($('<option></option>')
                    .val(p).html(i));
            });
        }else if(type == 'licenseActivity'){
            $.each(license_activity_fields, function(i, p) {
            
                    $('#field'+id).append($('<option></option>')
                    .val(p).html(i));
            });
        }else if(type == 'document'){
            $.each(doc_fields, function(i, p) {
            
                $('#field'+id).append($('<option></option>')
                .val(p).html(i));
        });
        }
    }
}

function changeValueType(typeId)
{
    var field = $('#field'+typeId).val();
    if(field == 'a.ExpirationDate' || field == 'DateLastVerified' || field == 'ActivityStartDate' || field == 'CreationDate' || field == 'ExpCompletionDate'
        || field == 'DocStatusDate' || field == 'IssueDate' || field == 'ExpiryDate' )
    {
        $("#search_value_one"+typeId).attr("type", "date");
    }else{
        $("#search_value_one"+typeId).attr("type", "text");
    }
}

function resetAdvancedFilters()
{
    var size = $('#arrayLength').val();
    for(i=1;i<(size);i++)
    {
        if($('#re'+i).length){
            var x = document.getElementById("re"+i);
            x.remove(x.i);
        }
    }
    $('#modal-search-form').trigger("reset");
}