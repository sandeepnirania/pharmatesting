
<div class="modal fade" id="modal_advance" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document" id="modal-content">
<div class="modal-content">
            <div class="modal-header head-back pb-0 " >

                <div class="task-6">
                    <div class="col-12 px-0 pt-1">
                        <span class="company-1 mb-1">
                        Advanced Filters
                        </span>
                        <span class="label-reset pull-right">
                            <a href="#" id="reset-href" onclick="resetAdvancedFilters()">Reset Filters</a>
                        </span>
                    </div>
                <button type="button" class="close" data-dismiss="modal"  >
                    <span class="cross" aria-hidden="true" ><img src="{{url('theme/build/images/close.png')}}" data-dismiss="modal" alt=""></span>
                </button>
            </div>
            </div>
            <div class="modal-body ">
            <form action="" method="" id="modal-search-form" role="form">
                @csrf
                <div id="search_div">

                    <div class="form-row" id="re0">
                    <input type="hidden" name="keyPress" id="keyPress" value="">
                    <input type="hidden" name="count" id="count" value="1">
                    <input type="hidden" name="arrayLength form-contrl" id="arrayLength" value="1">
                    <input type="hidden" name="search_type" id="search_type" value="license">
                        <div class="form-group col-4">
                            <label for="Date" class="company">Field<span class="red"> *</span></label>
                            <select class=" form-control form-select oneselect" name="advance[0][field]" id="field0"  onchange="changeValueType(0)" required>
                                <option value="" class="option-default"></option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="Date" class="company">Operator<span class="red"> *</span></label>
                            <select  class=" form-control form-select oneselect" name="advance[0][operator]" id="operator0" required>
                                <option value="" class="option-default"></option>
                                <option value="equals">equals</option>
                                <option value="contains">contains</option>
                                <option value="lessthan">is less than</option>
                                <option value="greterthan">is greater than</option>
                                <option value="lessthanandequal">is less than or equals</option>
                                <option value="greterthanequal">is greater than or equals </option>
                            </select>
                        </div>
                        <div class="form-group col-4">
                            <label for="Date" class="company">Value<span class="red"> *</span></label>
                            <input type="text" class="form-control form-select" name="advance[0][search_value_one]" id="search_value_one0" required>
                        </div>
                        <div class="form-group col-4 display-none" >
                            <label for="Date" class="company">Operator<span class="red"> *</span></label>
                            <select  class=" form-control form-select oneselect"  name="advance[0][condition]" id="condition0">
                                    <option value="" class="option-default"></option>
                                    <option value="AND">AND</option>
                                    <option value="OR">OR</option>
                            </select>
                        </div>
                    </div>
                    </div>

                    <div class="form-row">
                    <!-- <button type="button" class="btn btn-sm btn-primary col-2" >Add Entry</button> -->
                    <label for="Date" class="company"> <a class="anchor company" id="button_add_search_entry">Add Condition</a></label>
                </div>

                    <div class="row pb-3">
                        <div class="col-12 pt-3 end">
                            <button type="button" class=" btn-6 pad-r mr-4"  data-dismiss="modal" >Close</button>
                            <button type="submit" class="btn-6 pad-r ml-3">Save</button>
                        </div>
                    </div>
                    </form>
            </div>
            <!-- <a href="mailto:sathish.k@cyquent.com?subject=You can specify subject too">click</a> -->
            
        </div>
        </div>
</div>