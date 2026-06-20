const new_data_btn = document.getElementById("new-data-btn");
const modal = document.getElementById("modal-overlay");
const add_new_data_close_btn = document.getElementById("close-btn");
const add_new_data_box = document.getElementById("modal-add-new-data-box");
const update_modal_box = document.getElementById("modal-update-box");


function open_modal(){
    modal.classList.add("show");
}
function open_add_data_modal(){
    open_modal();
    add_new_data_box.classList.add("show");
}


function open_edit_data_modal(){
    open_modal();
    update_modal_box.classList.add("show");
}


function close_modal(){
    modal.classList.remove("show");
}
function close_add_data_modal(){
    add_new_data_box.classList.remove("show");
    close_modal();
}


new_data_btn.addEventListener("click", open_add_data_modal);
add_new_data_close_btn.addEventListener("click", close_add_data_modal);

modal.addEventListener("click", function(event){
    if(event.target === modal){
        close_modal();
        close_add_box();
    }
})