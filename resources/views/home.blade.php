@extends('layouts.app')

@section('content')
<div class="" style="margin-left:5%">
   <div class="row">
      <meta name="username" content="{{Auth::check()? Auth::user()->username : 'null'}}">
      <meta name="userid" content="{{Auth::check()? Auth::user()->id : 'null'}}">
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
         <routerset></routerset>
         {{-- <router-view></router-view> --}}
      </div>
   </div>

</div>
@endsection