const add_contact_btn = document.getElementById("add-new-data-btn");
const business_error_span = document.getElementById("business-name-error");
const category_error_span = document.getElementById("category-error");
const phone_error_span = document.getElementById("phone-error");
const phone_validation_error_span = document.getElementById("phone-error-validation");


function phone_validation(phone_number){
    var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    var result = regex.test(phone_number);
    return result;
}


add_contact_btn.addEventListener("click", async () => {
    const name = document.getElementById("add-business-name").value;
    const category = document.getElementById("add-category").value;
    const phone = document.getElementById("add-phone").value;
    let have_error = false

    if(!name){
        business_error_span.classList.add("show");
        have_error = true;
    }else{
        business_error_span.classList.remove("show");
    }

    if(!category){
        category_error_span.classList.add("show");
        have_error = true;
    }else{
        category_error_span.classList.remove("show");
    }

    if(!phone){
        phone_error_span.classList.add("show");
        have_error = true;
    }else{
        phone_error_span.classList.remove("show");
    }
    
    if(have_error){
        return
    }else{

        const response = await fetch("/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                category,
                phone
            })
        });
    }
    
})
