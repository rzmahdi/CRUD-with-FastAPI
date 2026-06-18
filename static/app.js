const add_contact_btn = document.getElementById("add-new-data-btn");
const business_error_span = document.getElementById("business-name-error");
const category_error_span = document.getElementById("category-error");
const phone_error_span = document.getElementById("phone-error");
const phone_validation_error_span = document.getElementById("phone-error-validation");

const notif_modal = document.getElementById("modal-overlay-error");
const close_notif_btn = document.getElementById("modal-error-close-btn");
const error_modal_span = document.getElementById("error-modal-text");

const table_body = document.getElementById("contacts-table-body")


function close_modal(){
    notif_modal.classList.remove("show");
}
close_notif_btn.addEventListener("click", close_modal);

notif_modal.addEventListener("click", function(event){
    if(event.target === notif_modal){
        close_modal();
    }
})


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

    if(!phone_validation(phone)){
        phone_validation_error_span.classList.add("show");
        have_error = true;
    }else{
        phone_validation_error_span.classList.remove("show");
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

        if (response){
            if(response["status"] === 409){
                error_modal_span.innerHTML = "❌اطلاعات از قبل وجود دارد!";
                notif_modal.classList.add("show");
            }else if(response.ok){
                error_modal_span.innerHTML = "✅اطاعات با موفقیت ثبت شد!";
                notif_modal.classList.add("show");
                load_contacts();
            }
        }
    }    
})


async function load_contacts(){
    const contacts_response = await fetch("/contacts");
    const contacts = await contacts_response.json();

    table_body.innerHTML = ""


    contacts.forEach(contact => {
        table_body.innerHTML += `
            <tr>
                <td>${contact.name}</td>
                <td>${contact.category}</td>
                <td>${contact.phone}</td>
            </tr>
        `;
    });
}

load_contacts();