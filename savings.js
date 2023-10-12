function addToSavings() {
    // Get the input value
    var addAmount = parseFloat(document.getElementById("addAmount").value);

    // Get the current total savings
    var currentTotal = parseFloat(document.getElementById("totalSavings").textContent);

    // Calculate the new total
    var newTotal = currentTotal + addAmount;

    // Update the total savings display
    document.getElementById("totalSavings").textContent = newTotal.toFixed(2);

    // Clear the input field
    document.getElementById("addAmount").value = "";

    // Create a "YAY!" element
    var yayElement = document.createElement("div");
    yayElement.textContent = "YAY!";
    yayElement.className = "yay-text";

    // Append the "YAY!" element to the main section
    var mainSection = document.querySelector("main");
    mainSection.appendChild(yayElement);

    // Remove the "YAY!" element after a few seconds
    setTimeout(function () {
        mainSection.removeChild(yayElement);
    }, 2000); // Adjust the duration (in milliseconds) as needed
}

