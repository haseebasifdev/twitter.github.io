@extends('layouts.app')

@section('content')
<div class="" style="margin-left:3%">
   <div class="row">
      <meta name="username" content="{{Auth::check()? Auth::user()->username : 'null'}}">
      <meta name="userid" content="{{Auth::check()? Auth::user()->id : 'null'}}">
      <div class="col-md-3 col-sm-2 col-2 col-xl-3 m-0 p-0 ">
         <navbar :user="{{$user}}">
            <button
               class=" d-none d-sm-none d-md-inline btn btn-light btn-block btn-lg font-weight-bolder text-danger d-none d-sm-none d-md-inline"
               style="border-radius: 30px;" onclick="event.preventDefault();
            document.getElementById('logout-form').submit();">
               Logout
            </button>
            <i class=" fas fa-power-off fa-lg  d-sm-inline d-inline d-md-none logouticon" onclick="event.preventDefault();
            document.getElementById('logout-form').submit();"></i>

            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
               @csrf
            </form>
         </navbar>
         <!-- Default dropup button -->

      </div>
      <div class="col-md-9 col-sm-10 col-10 col-xl-9  m-0 p-0 ">
         <routerset></routerset>
         {{-- <router-view></router-view> --}}
      </div>
   </div>

</div>
@endsection