console.log('this is codeforces Under development projects')



// fef2e19ac4ccef536bea9486339ded092efffcc7 

//https://codeforces.com/fef2e19ac4ccef536bea9486339ded092efffcc7/user.info?handles=MAXXER_17 

let list=document.getElementById('unsolved-list-body');
 
function getdata(handle)
{

    console.log(handle)
    console.log('started the get data');
    url=`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=5000`
    fetch(url).then(function(response){
        console.log('now we are in first then');
        console.log(response);

        let val=response.text();
        return val;



    }).then(function(data){
        console.log('now we are in second then');
        
        let temp=JSON.parse(data); 
        console.log(temp.result.length)
        console.log(temp.result[0]) 
        
        console.log(temp.result[0].problem.name)     
        let htmlstring=``;
        let accepted=[];
        let ind=0;

            temp.result.forEach(function(element){
                let val=`${element.problem.contestId}+${element.problem.index}`;
                if(element.verdict==="OK" && accepted.includes(val)===false)
                {
                    accepted.push(val);
                }

            });

        temp.result.forEach(function(element) {
            console.log()
            let val=`${element.problem.contestId}+${element.problem.index}`;

           if(element.verdict!=="OK" &&element.verdict!=="SKIPPED" )
           {
               if(accepted.includes(val)===false)
               {
                   ind++;
                accepted.push(val)
               htmlstring+=`<tr>
               <th scope="row">${ind}</th>
               <td>${element.problem.name}</td>
               <td>${element.verdict}</td>
               <td>${element.problem.index}</td>
               <td>  <a href="https://codeforces.com/problemset/problem/${element.problem.contestId}/${element.problem.index}"> Link</a> </td>
               
               </tr>`
               }
           }
        });

        list.innerHTML+=htmlstring;





        
    // running loop for getting  the verdict of the problem
         console.log('now checking the verdict');
    const verdict=new Map(); 

    temp.result.forEach(function(element){
        let val=element.verdict;
        if(verdict.has(`${val}`)==true)
        {
            verdict.set(`${val}`,verdict.get(`${val}`)+1);
        }
        else
        {
            verdict.set(`${val}`,1);
        }

      
    });
    let verres=[]
    let verrescount=[]
    verdict.forEach(function(value,key){
        verres.push(key);
        verrescount.push(value);
    })

     


    // now running loop for the accepted question with there rating 

    let accsol=[];
    console.log('checking for ok problem rating');
    const pro=new Map();
    for (let index = 800; index < 3600; index+=100) { 
        pro.set(`${index}`,0);
    }
    temp.result.forEach(function(element){
        let val=`${element.problem.contestId}+${element.problem.index}`;

        if(element.verdict==="OK")
        {
            if(accsol.includes(val)===false)
            {
                let rat=element.problem.rating;
                if(rat!=undefined)
                { 
                        accsol.push(val); 
                        pro.set(`${rat}`,pro.get(`${rat}`)+1);
                     
                }
            }
        }

    })
    let prorating=[];
    let procount=[]
    pro.forEach(function(value,key){
            if(value>0)
            {
        procount.push(value);
        prorating.push(key);
            }
    })
    console.log("show ratring is going to call");
    console.log(prorating);
    console.log(procount);




    // now we will run the loop for programming loop
     //programmingLanguage
     console.log('now checking the language');
     const lan=new Map(); 
 
     temp.result.forEach(function(element){
         let val=element.programmingLanguage;
         if(lan.has(`${val}`)==true)
         {
             lan.set(`${val}`,lan.get(`${val}`)+1);
         }
         else
         {
             lan.set(`${val}`,1);
         }
 
       
     });
     let lanred=[]
     let lanrescount=[]
     lan.forEach(function(value,key){
         lanred.push(key);
         lanrescount.push(value);
         console.log(value,key);
     })
 
     showvertict(verres,verrescount);
     showlanguage(lanred,lanrescount); 
    showproblemlevel(prorating,procount);

    })



   



}
function showvertict(verres,verrescount)
{   
    
    var xValues =verres;
var yValues =verrescount;
var barColors = [ 
  "#990000",
  "#FF5B00",
  "#D4D925",
  "#F77E21",
   "#FAC213",
  "#FFEE63",
   "#FEF9A7", 
   "#990000",
   "#FF5B00",
   "#D4D925",
   "#F77E21",
    "#FAC213",
   "#FFEE63",
    "#FEF9A7",
    "#990000",
  "#FF5B00",
  "#D4D925",
  "#F77E21",
   "#FAC213",
  "#FFEE63",
   "#FEF9A7",  
];
 
new Chart("myverdict", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors, 
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Verdict of user"
    }
  }
});

document.getElementById('myverdict').style.visibility='visible';
}
function showlanguage(verres,verrescount)
{   
    
    var xValues =verres;
var yValues =verrescount;
var barColors = [
  "#990000",
  "#FF5B00",
  "#D4D925",
  "#F77E21",
   "#FAC213",
  "#FFEE63",
   "#FEF9A7", 
   "#990000",
   "#FF5B00",
   "#D4D925",
   "#F77E21",
    "#FAC213",
   "#FFEE63",
    "#FEF9A7",
    "#990000",
  "#FF5B00",
  "#D4D925",
  "#F77E21",
   "#FAC213",
  "#FFEE63",
   "#FEF9A7", 
];
 
new Chart("mylanguage", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors, 
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Verdict of user"
    }
  }
});

document.getElementById('mylanguage').style.visibility='visible';
}
function showproblemlevel(rating,count)
{
    console.log('show problem is called');
    console.log(rating);
    console.log(count);
    var xValues =rating;
var yValues =count;
var barColors = [
  "#990000",
  "#FF5B00",
  "#D4D925",
  "#F77E21",
   "#FAC213",
  "#FFEE63",
   "#FEF9A7", 
   "#990000",
   "#FF5B00",
   "#D4D925",
   "#F77E21",
    "#FAC213",
   "#FFEE63",
    "#FEF9A7",
    "#990000",
  "#FF5B00",
  "#D4D925",
  "#F77E21",
   "#FAC213",
  "#FFEE63",
   "#FEF9A7", 
];

new Chart("myproblemlevel", {  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "Problem rating of questions"
    }
  }
});


document.getElementById('myproblemlevel').style.visibility='visible';
}
console.log('this is statemenet before calling the get data function')
let handlebtn=document.getElementById('handle-btn');
// from here i am calling the function 
handlebtn.addEventListener('click',function(e){
    e.preventDefault();
    list.innerHTML=""
    let handleinput=document.getElementById('userhandle');
    console.log('button is clicked');
  let handle=handleinput.value; 
  document.getElementById('userunsolved').style.visibility='visible';

  getdata(handle); 
  handleinput.value="";
  showvertict();
  showproblemlevel();
});

console.log('this is the statemenet which is supposed to run after the get data');


