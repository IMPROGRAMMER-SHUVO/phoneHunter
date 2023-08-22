const newphone=async(searchtext,datalimit)=>{
    const url=(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`)
    const res=await fetch(url);
    const data=await res.json();
    displayphones(data.data,datalimit)

}
const displayphones=(phones,datalimit)=>{
    console.log(phones)
    const phonecontainer=document.getElementById('phone-Container')
    phonecontainer.textContent='';
    //display 10 phones only
    const showAll=document.getElementById('show-all');
    if(datalimit&&phones.length>10){
      phones=phones.slice(0,10);
     
showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none')
    }

    // display all phone found
    const nophone=document.getElementById('no-found-phone')
    if(phones.length===0){
    nophone.classList.remove('d-none')
    }
    else{
      nophone.classList.add('d-none')
    }
    //display no phone found
    phones.forEach(phone => {
        const phoneDiv=document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card h-100">
                <img src='${phone.image}' class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="loadphoneDetails('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">show Details</button>
                
                  </div>
              </div>
        
        `;
        phonecontainer.appendChild(phoneDiv)
    });
    //stop loader
    togglespiner(false)
}

const  processSearch=(datalimit)=>{
  
togglespiner(true)
const searchfild=document.getElementById('inputbutton')
  const searchtext=searchfild.value;
newphone(searchtext,datalimit)
}

document.getElementById('button-addon2').addEventListener('click',function(){

  
//start loader
processSearch(10)
// serch input filed 
})
document.getElementById('inputbutton').addEventListener("keypress", function(event) {


  if (event.key === "Enter") {
    processSearch(10)
    
  }
});
const togglespiner=isloading=>{
const loadersection=document.getElementById('loader');
if(isloading){
  loadersection.classList.remove('d-none')
}
else{
  loadersection.classList.add('d-none')
}
}


// this is not best way of show all item  when click button 
document.getElementById('btn-show-all').addEventListener('click',function(){
processSearch();
})


//load phone ditals

const loadphoneDetails=async id=>{
    const url=(` https://openapi.programming-hero.com/api/phone/${id}`)
    const res=await fetch(url);
    const data=await res.json();
    disokayphonedeteais(data.data)
}


const disokayphonedeteais=phone=>{

  console.log(phone)
  const modaltitle=document.getElementById("exampleModalLabel");
modaltitle.innerText=phone.name;
const phoneditals=document.getElementById('phonealldetais')
phoneditals.innerHTML=`
<p> Release Date: ${phone.releaseDate? phone.releaseDate:'release date not found'}</p>
<p><p id=redcolorfont>mainFeatures$<p><b>Display:</b> ${phone.mainFeatures.displaySize}</br><b>processor:</b> ${phone.mainFeatures.chipSet}</br><b>Memonry:</b> ${phone.mainFeatures.memory} </br> <b>sensors
:</b> ${phone.mainFeatures.sensors
}</p>
`

}

newphone('apple');
