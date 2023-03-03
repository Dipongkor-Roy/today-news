const loadServer=()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res=>res.json())
    .then(data=>displayServer(data.data.news_category));
}
const displayServer=datas=>{
    // console.log(datas)
    const newsTopic=document.getElementById('news');
    
    newsTopic.innerHTML=`
       <p onclick="loadDetails('${datas[0].category_id}')" class="p-3">${datas[0].category_name}</p>
       <p onclick="loadDetails('${datas[1].category_id}')" class="p-3">${datas[1].category_name}</p>
       <p onclick="loadDetails('${datas[2].category_id}')" class="p-3">${datas[3].category_name}</p>
       <p onclick="loadDetails('${datas[3].category_id}')" class="p-3">${datas[4].category_name}</p>
       <p onclick="loadDetails('${datas[4].category_id}')" class="p-3">${datas[5].category_name}</p>
       <p onclick="loadDetails('${datas[5].category_id}')" class="p-3">${datas[6].category_name}</p>
       <p onclick="loadDetails('${datas[6].category_id}')" class="p-3">${datas[7].category_name}</p>
     
    `
   
     
}
const loadDetails=(category_id)=>{
    toggleLoader(true);
    const url=`https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>cardLoad(data.data))
}
const cardLoad=details=>{
    console.log(details)
    const iteams=document.getElementById('iteams')
    
    iteams.innerText=details.length;
 const cardBody=document.getElementById('card')

 cardBody.textContent='';
 
 details.forEach(detail=>{
  toggleLoader(true);
    const divCreate=document.createElement('div')
    
    divCreate.classList.add('row')
    divCreate.innerHTML=`
    <div class="my-2 col-md-4">
    <img src="${detail.thumbnail_url}" class="img-fluid rounded-top" alt="...">
  </div>
  <div  class="col-md-8">
    <div onclick="loadInternal('${detail._id}')" class="card-body">
      <h5 class="card-title">${detail.title}</h5>
      <p class="card-text text-muted">${detail.details.length<=500?detail.details:detail.details.substring(0, 401)+'...'}</p>
      <div class="d-flex justify-content-between">
      <div>
        <img src="${detail.author.img}" class="rounded-circle"style=max-width:10%; alt="">
        <p class="card-text">${detail.author.name?detail.author.name:'No data Available'}</p>
        </div>
        <div>
       <p> Total View: ${detail.total_view?detail.total_view:'No data Found'} </p>
        </div>
        <div><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#NewsModal">
        Show Details
      </button>
      </div>
     </div>
  </div>
 `
 cardBody.appendChild(divCreate);
   
    
 });
 toggleLoader(false);
}
const loadInternal=news_id=>{
  const url=`https://openapi.programming-hero.com/api/news/${news_id}`
  fetch(url)
  .then(res=>res.json())
  .then(data=>loadInternalDetails(data.data))
}

const loadInternalDetails=innerDetail=>{
   console.log(innerDetail)
   const modalTitle=document.getElementById('exampleModalLabel')
  const modalDetail=document.getElementById('modal-body')
   innerDetail.forEach(news=>{
    modalTitle.innerText=news.title;
    modalDetail.innerHTML=`
  <div>
  <p>Rating: ${news.rating.badge} ${news.rating.number}</p>
  <p>Author: ${news.author.name?news.author.name:'No data Available'} </p>
  <p>News Published Date: ${news.author.published_date} </p>
  <p> Total View: ${news.total_view?news.total_view:'No data Found'} </p>
  </div>
  
    `
  
   })

   
}

const toggleLoader=isLoading=>{
  const loader=document.getElementById('spinner')
  if(isLoading){
   loader.classList.remove('d-none');
  }
  else{
    loader.classList.add('d-none')
  }
}
const loadBlog=()=>{
 const getblog=document.getElementById('getBlog')
 const createDiv=document.createElement('div')
 
 createDiv.innerHTML=`
 <h3 class="my-1">Question: Var, Let, and Const  What's the Difference?</h3>
 <p class="my-2">Here if we will declare a var variable or let variable, then it can be updated, but if we declare a const variable, it will not be updated in any case and will work fine with our function.</p>
 <h3 class="my-1">Question: Difference between arrow and regular function?</h3>
 <p class="my-2">Unlike regular functions, arrow functions do not allow duplicate parameters, whether in strict or non-strict mode. Duplicate parameters will cause a Syntax Error to be thrown. In this article, I have discussed some significant differences between regular functions and arrow functions in JavaScript.</p>
 <h3 class="my-1">Question: Why we use template string ?</h3>
 <p class="my-2">Template literals are sometimes informally called template strings, because they are used most commonly for string interpolation (to create strings by doing substitution of placeholders).</p>
 
 `
 getblog.appendChild(createDiv);
 
}

loadServer();