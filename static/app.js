const new_data_btn = document.getElementById("new-data-btn");
const modal = document.getElementById("modal-overlay");
const close_btn = document.getElementById("close-btn");

function open_modal(){
    modal.classList.add("show");
}

function close_modal(){
    modal.classList.remove("show");
}

new_data_btn.addEventListener("click", open_modal);
close_btn.addEventListener("click", close_modal);
