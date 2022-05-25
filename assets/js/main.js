function postInvestor(){

    var data = new FormData();
  data.append('name', document.getElementById('fullname').value);
  data.append('email', document.getElementById('email-1').value);
  data.append('email', document.getElementById('email-2').value);
  data.append('password', document.getElementById('password-1').value);
  data.append('password', document.getElementById('password-2').value);
  data.append('phoneNumber', document.getElementById('phonenumber').value);
  data.append('country', document.getElementById('country').value);
  data.append('state', document.getElementById('state').value);
  data.append('city', document.getElementById('city').value);

  $('.spinner').removeClass('disp-0');
  $('.submitbtn').addClass('disp-0');

 var config = {
    method: 'post',
    url: 'https://paysprint.ca/api/v1/investordetails',
    headers: { 
      'Authorization': 'Bearer base64:JFM+PJaWD/pBypX+NhXudDrAmianZdGYZ41qz4WhXL0='
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    $('.spinner').addClass('disp-0');
    $('.submitbtn').removeClass('disp-0');
    
    
    swal('Great!', response.data.message, 'success');
  
     $('.form-control').val('')
     setTimeout(() => {
      window.location.href = 'login.html';
      
      
    }, 2000);
   })
  .catch(function (error) {
    $('.spinner').addClass('disp-0');
    $('.submitbtn').removeClass('disp-0');
    swal('Oops!', error.message, 'error')
    console.log(error);
  });

}

document.getElementById("currentyear").innerHTML = new Date().getFullYear();


function loginInvestor() {

  var data = new FormData();

  data.append('email', document.getElementById('email').value);

  data.append('password', document.getElementById('password').value);



  $('.spinner').removeClass('disp-0');
  $('.submitbtn').addClass('disp-0');

  
  var config = {
    method: 'post',
    url: 'https://paysprint.ca/api/v1/investorlogin',
    headers: { 
      'Authorization': 'Bearer base64:JFM+PJaWD/pBypX+NhXudDrAmianZdGYZ41qz4WhXL0=', 
      
    },
    data : data,
    
   
    
  };

  console.log(config);
  
  axios(config)
  .then(function (response) {
  
   
    $('.spinner').addClass('disp-0');
    $('.submitbtn').removeClass('disp-0');
    localStorage.setItem("apiToken",response.data.apiToken)
    
    swal('Great!', response.data.message, 'success');
    setTimeout(() => {
    window.location.href =`/investorsopportunity.html`
    
    
  }, 2000);
    
  })
  .catch(function (error) {
    $('.spinner').addClass('disp-0');
    $('.submitbtn').removeClass('disp-0');
    localStorage.removeItem("apiToken")
    swal('Oops!', 'Invalid email address or password', 'error')
  });
}



const loadPage = (page) =>{
  //Remove all child nodes
  $(".newspost").empty()
  var config = {
    method: 'get',
    
     url: 'https://paysprint.ca/api/v1/investorsnews?page='+page,
    headers: { 
      'Authorization': 'Bearer base64:JFM+PJaWD/pBypX+NhXudDrAmianZdGYZ41qz4WhXL0=' },
   
  };
  axios(config)
  .then(function (response) {
  
   
  
    var data = response.data.data.data;
  
  //   console.log(data);
  
    if(data.length > 0){
  
      $.each(data, function(v, k){
      var file = '';
      var link = `/readmore.html?id=${k.id}`;
  
  
        if (k.file != '') {
          file = `<a href="/create.html?id=${k.id}" style="text-decoration:none"><img src="https://img.icons8.com/color/20/000000/pdf.png"/> Attachment</a>`;
          link = `/Signup.html?id=${k.id}`;
        }
  
        $('.newspost').append( `<div class="col-lg-4 col-md-6 col-sm-12 col-xs-12" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                           <div class="features-item">
                               <div class="features-icon">
                                   
                                   <img src="https://res.cloudinary.com/pilstech/image/upload/v1603726392/pay_sprint_black_horizotal_fwqo6q.png" alt="logo"/>
                                   <h4>${k.title}</h4>
                                   <p>${k.description}</p>
                                   <a href="${link}" class="main-button">Read More</a>
                               </div>
                           </div>
                       </div>`
            );
           
  
      });
    }
    else{
    
      $('.newspost').append( `<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" data-scroll-reveal="enter left move 30px over 0.6s after 0.4s">
                           <div class="features-item">
                               <div class="features-icon">
                                   <h2></h2>
                                   <img src="assets/images/void.png" alt="logo"  style="width:250px"/>
                                   <h4></h4>
                                   <h6>No News update, Kindly Check later.</h6>
                                  
                               </div>
                           </div>
                       </div>`
      )
      }
  
  })
  .catch(function (error) {
    console.log(error);
  });
  
}

function check() {
  if (document.getElementById('email-1').value ==
    document.getElementById('email-2').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'matching';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'not matching';
  }
}
function checkPw() {
  if (document.getElementById('password-1').value ==
    document.getElementById('password-2').value) {
    document.getElementById('message-2').style.color = 'green';
    document.getElementById('message-2').innerHTML = 'matching';
  } else {
    document.getElementById('message-2').style.color = 'red';
    document.getElementById('message-2').innerHTML = 'not matching';
  }
}


function readmore(id){
  
  window.location = `/readmore.html?id=${id}`;
}

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};

async function expressInterest(postId, apiToken){

  const config = {
    method: 'get',
    url: `https://paysprint.ca/api/v1/investor/express-interest?postId=${postId}&apiToken=${apiToken}`,
    headers: {
        'Authorization': 'Bearer base64:JFM+PJaWD/pBypX+NhXudDrAmianZdGYZ41qz4WhXL0=',

    }
}

const result = await axios(config)


return result;
 
}

function logOut(){
  localStorage.removeItem('email')
  localStorage.removeItem('password')
  window.location.href='index.html'
}
 
