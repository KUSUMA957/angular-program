const heading = document.getElementById("title");
const button = document.getElementById("button");
button.addEventListener("click", () => {
    heading.innerText = "Text Changed!";
});
function changeColor() {
    document.getElementById("msg").style.color = "red";
}
function hide() {
    document.getElementById("text").style.display = "none";
}
function show() {
    document.getElementById("text").style.display = "block";
}
function addItem() {
    const li = document.createElement("li");
    li.innerText = "apple";
    document.getElementById("list").appendChild(li);
}
function removePara() {
    document.getElementById("remove").remove();
}
