
        @if(count($errors) > 0 )
            @foreach($errors->all() as $error);
            <input type="hidden" name="error" id="error" value="{{$error}}">
            @endforeach
        @else
        <input type="hidden" name="error" id="error" value="">
        @endif