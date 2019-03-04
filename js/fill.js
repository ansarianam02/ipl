$(function(){

      $('.btn-participate').hide();
      $('.btn-later').hide(); 
       var chance = true;
        var tokenVal = localStorage.getItem('tokenVal');
        var prizeMap = {
                            1:{
                              text:'Headphone',
                              imgUrl :'img/Headphone.png',
                            },
                            2:{
                              text:'Smart Backpack',
                              imgUrl :'img/SmartBackpack.png'
                            },
                            3:{
                              text:'Instant Camera',
                              imgUrl :'img/InstantCamera.png'
                            },
                            4:{
                              text:'DSLR Camera',
                              imgUrl :'img/DSLRCamera.png'
                            },
                            5:{
                              text:'Smartphone',
                              imgUrl :'img/Smartphone.png'
                            },
                            6:{
                              text:'Smartphone',
                              imgUrl :'img/Smartphone.png'
                            }
                          };

      var titleEmpty = "OOPS! Looks like we ran out of Maaza! Better luck next time!Drink more. Collect More. Win more with Maaza.Come back again and play to collect more letters.";
      var tileOther = "";
      var map ={ M : '0','MA':'2','MAA':'3','MAAZ':'4','MAAZA':'5'};
      var nameMap ={ 0 : '--' , 1 : 'M' , 2 :'MA', 3 : 'MAA', 4 : 'MAAZ', 5: 'MAAZA'};
      var animationImage ;
      var apiurl = "https://maazaqa.bigcitydays.com/v1/api/"

/*    var level = 'MAAZ';
      //pass Api letter Number here
      var levelNo = parseInt(map[level]) ;
      //set depending on the level 
      $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
      //set animation Img
      
      var animationImage = new Image();
      animationImage.src = 'img/Animations/'+levelNo+'.gif';
     
      // staticImg animationImg
        //set level on yop
      $('.level-stage').html(level);  
  
*/
   /*
    *  getgame($token) $result = [
    'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
    $result = [
    'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
    */
var stage ;
var getgame =function(){

    var form = new FormData();
    form.append("token", tokenVal);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": apiurl+"getgame",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "5dec963e-f441-9f3a-49a8-cca354f10bea"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
       var res =JSON.parse(response);
      if(res.status==1){ 
              stage = res.data.letter;
              //pass Api letter Number here 
              var levelNo = parseInt(stage);
              var level = nameMap[stage];
              newLevel = nameMap[stage+1];
              var imgName =prizeMap[stage+1].text;
              var imgPath = prizeMap[stage+1].imgUrl;


              if (levelNo < 5) {
              tileOther = "Drink more. Collect More. Win more with Maaza. Collect all the letters and stand a chance to win the Mega Prize!"
              
              //set depending on the level 
              $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
              //set animation Img
              

               //button text with leve 
              var txt ="Participate in lucky draw for level '" + newLevel + "'";
              $('.btn-participate').html(txt);
              
              //set participate modal image 
              $('#partiImg').css('background-image','url('+ imgPath +')');
              $('#partiImg2').css('background-image','url('+ imgPath +')');
              $('#partiImg3').css('background-image','url('+ imgPath +')');
              $('.rewardname').html(prizeMap[stage+1].text);
              $('#partrewardName').html(prizeMap[stage+1].text);

              animationImage = new Image();
              var gifNo = levelNo+1;
              if (res.data.haswon==true){
              animationImage.src = 'img/Animations/'+gifNo+'.gif';
              $('.level-txt').html(prizeMap[stage+1].text);
              $('.level-stage').html(level); 
              localStorage.setItem('level',level);
             }else {
              animationImage.src = 'img/Animations/'+'e'+gifNo+'.gif';
             }
              // staticImg animationImg
                //set level on yop
              
              
              localStorage.setItem('haswon',res.data.haswon);
              

              } else {
                //for the maaza mega draw 
              $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
                var txt ="Participate in the MAAZA MEGA DRAW"
                $('.confmodaltext').html("Please confirm your participation in the MAAZA MEGA DRAW.")
                $('#partiImg').css('background-image','url('+ imgPath +')');
                $('#partiImg2').css('background-image','url('+ imgPath +')');
                $('#partiImg3').css('background-image','url('+ imgPath +')');
                $('.rewardname').html(imgName);
              $('.btn-participate').html(txt);
                $('.btn-fill').hide();
                $('.btn-participate').show();
                $('.level-stage').html(level);
                $('.level-txt').html(imgName);

                var megaTitle = "Congratulations! You have reached the MAAZA level, you can now participate in the MAAZA MEGA DRAW";
                $('.status-title').html(megaTitle);
              } 
      }else{
        $('.fillSection').css('visibility','hidden');
        $('.err-msg').html('Invalid token, Something went wrong !!');
        $('.err-container').show();
      }
    });

    }

  //call game
  getgame();
  
  function closegame(iscomplete,userchoice){
    var form = new FormData();
    var isComplete = iscomplete;
    var userchoice = userchoice;
    form.append("token", tokenVal);
    form.append("iscomplete", iscomplete);
    form.append("userchoice", userchoice);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://maazaqa.bigcitydays.com/v1/api/closegame",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "6dd426e5-7e3b-852c-76a5-5ea41f8f8a09"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }

  $(document).on('click','.btn-fill',function(e){
    if(!chance) 
      return true;  
    //e.preventDefault();
    chance = false;

    //close game
    closegame("true","1");
    if(parseInt(newLevel.length) < 5) {
    var elem = $(this);
     elem.html('FILLING IN YOUR MAAZA…');
     // elem.addClass('btn-disabled');
     $('.status-title').html("Please wait while we fill the letter with yummy maaza...");
     setTimeout(function(){  
      // elem.html('SCAN ANOTHER QR CODE');
      elem.hide();
      elem.addClass('btn-static');
      elem.removeClass('btn-disabled');
       //set seatus 
       if(stage==0)
          $('.status-title').html(titleEmpty);
       else
          $('.status-title').html(tileOther);
        
       //$('.status-title').css('visibility','visible');
          //show reminder modal 
         
         }, 4700);

     
     var haswon = localStorage.getItem('haswon');
     
     if (haswon=="true"){
      $('.btn-participate').delay(4700).show(0);
     $('.btn-later').delay(4700).show(0);
     //show reminder popup
     setTimeout(function(){
       $('#reminderModal').modal('show'); 
    }, 5300);
     setTimeout(function(){
      $('.level-stage').html(newLevel);
    }, 4700); 
    } else {
      $('.btn-later').html("Close and come back later");
      $('.btn-later').delay(4700).show(0);
    }

     //set level dynamically
     //$('.fill-container').css('background-image','url("img/Animations/'+levelNo+'.gif")'); 
     $('.fill-container').removeClass('static');
     $('.fill-container').css('background-image','url("'+animationImage.src+'")');

     } else {
      var elem = $(this);
     elem.html('FILLING IN YOUR MAAZA…');
     elem.addClass('btn-disabled');
     $('.fill-container').removeClass('static');
     $('.fill-container').css('background-image','url("'+animationImage.src+'")');
                var txt ="Participate in the MAAZA MEGA DRAW"
              $('.btn-participate').html(txt);
                $('.btn-fill').delay(4700).hide(0);
                $('.btn-participate').delay(4700).show(0);
                
                $('.status-title').html("Please wait while we fill the letter with yummy maaza...");
                setTimeout(function(){
                var megaTitle = "Congratulations! You have reached the MAAZA level, you can now participate in the MAAZA MEGA DRAW";
                $('.level-stage').html(newLevel);
                $('.status-title').html(megaTitle);

                }, 4700);
     }


  });

  // $(document).on('click','.btn-static',function(e){
  //   $('#btnQR').click();

  //  });

$(document).on('click','.btn-confirm-participate',function(e){
    $('#partconfirmModal').modal('show');
    $('#reminderModal').modal('hide');  

   });

  var participateOnce = false;
   $(document).on('click','.btn-participate',function(){
      /*if(participateOnce){       
        return true;
      }*/
      participateOnce = true;
      // $(this).removeAttr('data-toggle').removeAttr('data-target');;
      $(this).html('Participate in MAAZA MEGA DRAW');
   });

$(document).on('click','#participateModal .btn-submit',function(){
    $('#participateModal').modal('hide');
    $('#participateModal .btn-submit').html('close');
    $('.btn-participate').hide();
    $('.btn-later').html("Close and come back later");

});

$(document).on('click','#reminderModal .btn-submit',function(){
    $('#participateModal').modal('hide');
    $('#participateModal .btn-submit').html('close');
    $('.btn-participate').hide();
    $('.btn-later').html("Close and come back later")

});
 
   $(document).on('click','.redirect-level-page',function(e){
        window.location ="winner-list.html";    
  });

  $(document).on('click','.redirect-home-page',function(e){
        window.location ="http://maaza.bigcityexperience.com";    
  });

   $(document).on('click','.btn-submit',function(e){
     //e.preventDefault();    
   });

   $(document).on('click','.btn-closegame',function(e){
      //close game
      closegame("true","1")   
   });
  

});
