console.log("clinet side javascript is loaded")
//Browser HTTP Requests with fetch



//Selet the html element
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const para = document.querySelector('#m1')
const para1 = document.querySelector('#m2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    para.textContent = 'Loading.....'
    para1.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
    response.json().then((data)=>{
        if(data.error)
        {
            para.textContent = data.error
        }
        else{
            para.textContent = data.location
            para1.textContent = data.forecast

        }
    })

})



 
})