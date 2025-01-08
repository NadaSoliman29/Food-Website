let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
 
 $(document).ready(()=>{
  searchByName("").then(()=>{
    $(".loading-screen").fadeOut(500)
    $("body").css("overflow","visible")
 

  })
 
 })
 
 
 function openSideNav(){
    $('.side-nav-menu').animate({left:0},500)

    $('.open-close-icon').removeClass('fa-align-justify');
    $('.open-close-icon').addClass('fa-x');
  
    for(let i = 0 ; i<5;i++){
      $(".links li").eq(i).animate({top:0},(i+5)*100) 
    }
 }
 function closeSideNav(){
  let boxwidth= $('.side-nav-menu .nav-tab').outerWidth()

    $('.side-nav-menu').animate({left:-boxwidth},500)
  
    $('.open-close-icon').addClass('fa-align-justify');
    $('.open-close-icon').removeClass('fa-x');
    $(".links li").animate({top:300},500)
 }
 closeSideNav()
$(".side-nav-menu i.open-close-icon").click(()=>{

   if($('.side-nav-menu').css('left')=='0px'){   
closeSideNav();
}
else{ 
openSideNav();  

   }
    })

    
//     //////// search 

function displayMeals(arr){
  let allMeals = '';
  for (let i =0 ;i <arr.length ; i++ ){

  allMeals +=`
  <div class="col-md-3">
       <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointe ">
         <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
      <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
        <h3>${arr[i].strMeal}</h3>
      </div>
       </div>
      </div>
  `

  }
  rowData.innerHTML = allMeals
}


////////// category 
async function getCategory (){
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)
  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
response = await response.json()
displayCategories(response.categories)
$(".inner-loading-screen").fadeOut(300)

}
function displayCategories(arr){
  let allMeals= '';
  for(let i =0 ;i <arr.length ; i++ ){
    allMeals +=`
    <div class="col-md-3 ">
     <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointe">
         <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
     <div class="meal-layer position-absolute text-center text-black p-2 ">
       <h3>${arr[i].strCategory}</h3>
       <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
      
     </div>
     </div>
     </div> 
    `

  }
  rowData.innerHTML = allMeals
}

////// area
async function getArea(){
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)

  searchContainer.innerHTML = "";

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  response = await response.json();

displayArea(response.meals)
$(".inner-loading-screen").fadeOut(300)

}
function displayArea(arr){
  let allMeals ="";
  for(let i=0 ; i<arr.length; i++){
    allMeals+=`
    <div class="col-md-3 text-dark">
 <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointe">

   <i class=' fa-solid fa-house-laptop fa-3x'></i>
   <h3>${arr[i].strArea}</h3>
 </div>
 </div>
    `
  }
  rowData.innerHTML = allMeals

}

/////// ingredients

async function getIngredients(){
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)

  searchContainer.innerHTML = "";
  let response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  response = await response.json()
  displayIngredients(response.meals.slice(0,20))
  $(".inner-loading-screen").fadeOut(300)

}

function displayIngredients(arr){
 

  let allMeals ='';

  for(let i =0 ; i<arr.length ; i++){

    allMeals += `
    <div class="col-md-3 text-dark">
    <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointe">
   
      <i class=' fa-solid  fa-drumstick-bite fa-3x'></i>
      <h3>${arr[i].strIngredient}</h3>
      <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
     
     
   
    </div>
    </div>
    `
  }
  rowData.innerHTML = allMeals
}
//////////CategoryMeals
 async function getCategoryMeals(category){
  $(".inner-loading-screen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  response = await response.json()
  displayMeals(response.meals)
  $(".inner-loading-screen").fadeOut(300)

}

//////////AreaMeals
async function getAreaMeals(area){
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json()
  displayMeals(response.meals)
  $(".inner-loading-screen").fadeOut(300)

}
//////////IngredientsMeals
  $(".inner-loading-screen").fadeIn(300)
  async function getIngredientsMeals(ingredients){

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()
  displayMeals(response.meals)
  $(".inner-loading-screen").fadeOut(300)

}

///////////////displayMealsDetails
async function getMealDetails(mealID){
  closeSideNav()
  rowData.innerHTML = ""
  $(".inner-loading-screen").fadeIn(300)

  searchContainer.innerHTML = "";
  let response = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  response = await response.json();
displayMealsDetails(response.meals[0])
$(".inner-loading-screen").fadeOut(300)

}

function displayMealsDetails(meal){
  searchContainer.innerHTML = "";
  let ingredients = ''
  for(let i =1 ; i < 20 ; i++ ){
     if( meal[`strIngredient${i}`]){
      ingredients += `<li class=" alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li> `
     }
  }

  let tags =  meal.strTags?.split(",")
  if (!tags) tags = []
  let tagsStr = ''
  for( let i = 0 ; i< tags.length ; i++){
  tagsStr += ` <li class=" alert alert-danger m-2 p-1">${tags[i]}</li> `

  }
  let detailsMeal = `  <div class="col-md-4 text-dark">
  <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
  <h2> ${meal.strMeal}</h2>
</div>
<div class="col-md-8 text-dark">
<h2>Instructions</h2>
<p>${meal.strInstructions}</p>
<h3><span class="fw-bolder">Area : </span>${meal.strArea} </h3>
<h3><span class="fw-bolder">Category : </span>${meal.strCategory} </h3>
<h3>Recipes :</h3>
<ul class="list-unstyled d-flex flex-wrap g-3">

${ingredients}

</ul>

<h3> Tags : </h3>
<ul class="list-unstyled d-flex flex-wrap g-3">

${tagsStr}

</ul>
<a  href ="${meal.strSource}"class="btn btn-success"> Source</a>
<a  href ="${meal.strYoutube}"class="btn btn-danger"> YouTube</a>

</div>`
rowData.innerHTML = detailsMeal
}

function showSearchInput() {

  searchContainer.innerHTML=`
<div class="row py-5 ">
 <div class="col-md-6">
    <input onkeyup="searchByName(this.value)" class="form-control  text-center borderstyle" type="text" placeholder="Search By Name">
 </div>
 <div class="col-md-6">
    <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control  text-center borderstyle" type="text" placeholder="Search By First Letter... ">
 </div>
</div>
`
rowData.innerHTML=" " ;
}
async function searchByName(term){
  $(".inner-loading-screen").fadeIn(300)

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([])
  $(".inner-loading-screen").fadeOut(300)

}
async function searchByFirstLetter(term){
  $(".inner-loading-screen").fadeIn(300)

  term =="" ? term="a" : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
  response = await response.json();
  response.meals ? displayMeals(response.meals) : displayMeals([])
  $(".inner-loading-screen").fadeOut(300)

}

//////// contactUs////////
function showContactus(){
  rowData.innerHTML =`
  <div class="Contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-50 text-center "> 
      <div class="row g-4">
          <div class="col-md-6 ">
              <input id="nameInput" onkeyup="inputsValidation()" class="form-control  text-center is-invalid " type="text" placeholder="Enter Your Name ">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 alertsize d-none">
              Special characters and numbers not allowed
          </div>
              </div>
          <div class="col-md-6">
              <input  id="emailInput" onkeyup="inputsValidation()" type="email"  class="form-control  text-center is-invalid"  placeholder="Enter Your Email ">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 alertsize d-none">
              Email not valid *exemple@yyy.zzz
          </div>
              </div>
          <div class="col-md-6">
              <input  id="phoneInput" onkeyup="inputsValidation()" class="form-control  text-center is-invalid " type="number" placeholder="Enter Your Phone ">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 alertsize d-none">
              Enter valid Phone Number
               </div>
              </div>
          <div class="col-md-6 ">
              <input  id="ageInput" onkeyup="inputsValidation()" class="form-control  text-center is-invalid " type="number" placeholder="Enter Your Age ">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 alertsize d-none">
              Enter valid age
              </div>
              </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" class="form-control  text-center is-invalid" type="password" placeholder="Enter Your Password ">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 alertsize d-none">
              Enter valid password *Minimum eight characters, at least one letter and one number:*
                 </div>
              </div>
          <div class="col-md-6">
              <input id="repasswordInput" onkeyup="inputsValidation()" type="password"  class="form-control  text-center is-invalid "  placeholder="Enter Your RePassword ">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 alertsize d-none">
              Enter valid repassword 
          </div>
              </div>
         
      </div>
  <div class="pt-1">
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3 " type="button"> Submit</button>
  
  </div>
  </div>
  `
  document.body.style.background = "black";
   submitBtn = document.getElementById("submitBtn")

   document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true
})

document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true
})

document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true
})

document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true
})

document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true
})

document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true
})


}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;



function inputsValidation() {
 if(nameInputTouched){
  if(nameValidation()){
    document.getElementById("nameAlert").classList.replace("d-block","d-none")
    document.getElementById("nameInput").classList.replace("is-invalid","is-valid")

      }
      else{
        document.getElementById("nameAlert").classList.replace("d-none","d-block")
    document.getElementById("nameInput").classList.replace("is-valid","is-invalid")

    
      }
    }
 if(emailInputTouched){
  if(emailValidtion()){
    document.getElementById("emailAlert").classList.replace("d-block","d-none")
    document.getElementById("emailInput").classList.replace("is-invalid","is-valid")
      }
   else{
        document.getElementById("emailAlert").classList.replace("d-none","d-block")
    document.getElementById("emailInput").classList.replace("is-valid","is-invalid")

    
      }
    }
  if(phoneInputTouched){
  if(phoneValidation()){
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
    document.getElementById("phoneInput").classList.replace("is-invalid","is-valid")

          }
   else{
            document.getElementById("phoneAlert").classList.replace("d-none","d-block")
    document.getElementById("phoneInput").classList.replace("is-valid","is-invalid")

        
          }
    }
if(ageInputTouched){
 if(ageValidation()){
            document.getElementById("ageAlert").classList.replace("d-block","d-none")
    document.getElementById("ageInput").classList.replace("is-invalid","is-valid")

              }
              else{
                document.getElementById("ageAlert").classList.replace("d-none","d-block")
    document.getElementById("ageInput").classList.replace("is-valid","is-invalid")

            
              }
     }
 if(passwordInputTouched){
 if(passwordValidation()){
                document.getElementById("passwordAlert").classList.replace("d-block","d-none")
    document.getElementById("passwordInput").classList.replace("is-invalid","is-valid")

                  }
                  else{
                    document.getElementById("passwordAlert").classList.replace("d-none","d-block")
    document.getElementById("passwordInput").classList.replace("is-valid","is-invalid")

                
                  }
      }
  if(repasswordInputTouched){
  if(repasswordValidation()){
                    document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
    document.getElementById("repasswordInput").classList.replace("is-invalid","is-valid")

                      }
                      else{
                        document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
    document.getElementById("repasswordInput").classList.replace("is-valid","is-invalid")

                    
                      }
                    }
  


  if (nameValidation() &&
  emailValidtion() &&
  phoneValidation() &&
  ageValidation() &&
  passwordValidation() &&
  repasswordValidation()) {
    submitBtn.removeAttribute("disabled")
  }else{
  submitBtn.setAttribute("disabled",true)
  }

}


function nameValidation(){
return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}
function emailValidtion(){
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value)
}
function phoneValidation() {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
  return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
  return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation(){
  return document.getElementById("repasswordInput").value == (document.getElementById("passwordInput").value)
}












