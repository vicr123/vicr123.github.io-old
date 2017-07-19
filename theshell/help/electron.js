function setupElectron() {
    if (process) {
        for (element of document.getElementsByClassName("electronOnly")) {
            element.classList.add("electron");
        }
        
        for (element of document.getElementsByClassName("noElectron")) {
            element.classList.add("electron");
        }
    }
}

document.getElementById("body").classList.add("electron");
setupElectron();
