const add_contact_btn = document.getElementById("add-new-data-btn");

add_contact_btn.addEventListener("click", async () => {
    const name = document.getElementById("add-business-name").value;
    const category = document.getElementById("add-category").value;
    const phone = document.getElementById("add-phone").value;

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
})
