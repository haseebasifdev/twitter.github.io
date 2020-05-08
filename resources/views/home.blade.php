@extends('layouts.app')

@section('content')
<div class="" style="margin-left:6%">
   <div class="row">
      <div class="col-md-3 col-sm- m-0 p-0 ">
         <navbar :user="{{$user}}">
            <button class=" btn btn-light btn-block btn-lg font-weight-bolder text-danger" style="border-radius: 30px;"
               onclick="event.preventDefault();
            document.getElementById('logout-form').submit();">
               Logout
            </button>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
               @csrf
            </form>
         </navbar>
         <!-- Default dropup button -->

      </div>
      <div class="col-md-9 col-sm-12 m-0 p-0 ">
         <router-view ></router-view>
      </div>
   </div>

</div>
@endsection