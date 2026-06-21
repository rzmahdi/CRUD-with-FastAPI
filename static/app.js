const add_contact_btn = document.getElementById("add-new-data-btn");
const business_error_span = document.getElementById("business-name-error");
const category_error_span = document.getElementById("category-error");
const phone_error_span = document.getElementById("phone-error");
const phone_validation_error_span = document.getElementById("phone-error-validation");

const update_business_error_span = document.getElementById("update-business-name-error");
const update_category_error_span = document.getElementById("update-category-error");
const update_phone_error_span = document.getElementById("update-phone-error");
const update_phone_validation_error_span = document.getElementById("update-phone-error-validation");

const notif_modal = document.getElementById("modal-overlay-error");
const close_notif_btn = document.getElementById("modal-error-close-btn");
const error_modal_span = document.getElementById("error-modal-text");
const update_data_btn = document.getElementById("update-btn");

const table_body = document.getElementById("contacts-table-body")
let selectedContactId = null;
let allContacts = [];


function close_notif_modal(){
    notif_modal.classList.remove("show");
}
close_notif_btn.addEventListener("click", close_notif_modal);

notif_modal.addEventListener("click", function(event){
    if(event.target === notif_modal){
        close_notif_modal();
    }
})


function phone_validation(phone_number){
    var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
    var result = regex.test(phone_number);
    return result;
}


function show_notif(notif_text){
    error_modal_span.innerHTML = notif_text;
    notif_modal.classList.add("show");
}

add_contact_btn.addEventListener("click", async () => {
    const name = document.getElementById("add-business-name").value;
    const category = document.getElementById("add-category").value;
    const phone = document.getElementById("add-phone").value;

    const name_element = document.getElementById("add-business-name");
    const category_element = document.getElementById("add-category");
    const phone_element = document.getElementById("add-phone");

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
                const error_text = "❌اطلاعات از قبل وجود دارد!";
                show_notif(error_text);
            }else if(response.ok){
                const error_text = "✅اطاعات با موفقیت ثبت شد!";
                show_notif(error_text);

                name_element.value = "";
                category_element.value = "";
                phone_element.value = "";
                load_contacts();
            }
        }
    }    
})


function render_contacts(contacts){
    table_body.innerHTML = ""

    contacts.forEach(contact => {
        table_body.innerHTML += `
            <tr id=${contact.id}>
                <td>${contact.name}</td>
                <td>${contact.category}</td>
                <td>${contact.phone}</td>
            </tr>
        `;
    });
}


async function load_contacts(){
    const contacts_response = await fetch("/contacts");
    allContacts = await contacts_response.json();

    render_contacts(allContacts);
}


load_contacts();

const action_menu = document.getElementById("action-menu");

table_body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const row = e.target.closest("tr");

    if(!row){
        return;
    }

    selectedContactId = row.id;
    action_menu.classList.remove("show");
    action_menu.offsetWidth;
    action_menu.style.left = `${e.clientX}px`;
    action_menu.style.top = `${e.clientY}px`;
    action_menu.classList.add("show");
});

document.addEventListener("click", (e) => {
    if (!action_menu.contains(e.target)) {
        action_menu.classList.remove("show");
    }
});

const delete_btn = action_menu.children[0];
delete_btn.addEventListener("click", async (e) =>{
    const response = await fetch(`/contacts/${selectedContactId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    if(response.ok){
        const error_text = "✅با موفقیت حذف شد";
        show_notif(error_text);
        load_contacts();
    }else{
        const error_text = "❌" + response.statusText;
        show_notif(error_text);
    }
})


const edit_btn = action_menu.children[1];
edit_btn.addEventListener("click", (e)=>{
    action_menu.classList.remove("show");
    open_edit_data_modal();

    const name_element = document.getElementById("update-business-name");
    const category_element = document.getElementById("update-category");
    const phone_element = document.getElementById("update-phone");

    name_element.value = document.getElementById(selectedContactId).children[0].textContent;
    category_element.value = document.getElementById(selectedContactId).children[1].textContent;
    phone_element.value = document.getElementById(selectedContactId).children[2].textContent;

    update_data_btn.addEventListener("click", async(e)=>{
        const name = document.getElementById("update-business-name").value;
        const category = document.getElementById("update-category").value;
        const phone = document.getElementById("update-phone").value;
       
        let have_error = false
        
        if(!name){
            update_business_error_span.classList.add("show");
            have_error = true;
        }else{
            update_business_error_span.classList.remove("show");
        }
        
        if(!category){
            update_category_error_span.classList.add("show");
            have_error = true;
        }else{
            update_category_error_span.classList.remove("show");
        }
        
        if(!phone){
            update_phone_error_span.classList.add("show");
            have_error = true;
        }else{
            update_phone_error_span.classList.remove("show");
        }
        
        if(!phone_validation(phone)){
            update_phone_validation_error_span.classList.add("show");
            have_error = true;
        }else{
            update_phone_validation_error_span.classList.remove("show");
        }
        
        if(have_error){
            return
        }else{
            const response = await fetch(`/contacts/${selectedContactId}`, {
                method: "PUT",
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
                if(response["status"] === 404){
                    const error_text = "❌اطلاعات وجود ندارد";
                    show_notif(error_text);
                }else if(response["status"] === 409){
                    const error_text = "❌این نام از قبل وجود دارد!";
                    show_notif(error_text);
                }else if(response.ok){
                    const error_text = "✅اطاعات با موفقیت ویرایش شد!";
                    show_notif(error_text);
                    
                    name_element.value = "";
                    category_element.value = "";
                    phone_element.value = "";
                    
                    load_contacts();
                }
            }
        }
    })
});


const search_bar = document.getElementById("search-bar");
search_bar.addEventListener("input", (e)=>{
    const search = e.target.value.trim().toLowerCase();

    const filtredContacts = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(search) ||
        contact.category.toLowerCase().includes(search)
    );

    render_contacts(filtredContacts);
})