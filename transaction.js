// Function to add a transaction
function addTransaction() {
    // Get values from input fields
    var date = document.getElementById('transDate').value;
    var item = document.getElementById('transItem').value;
    var amount = document.getElementById('transAmount').value;

    // Check if all fields are filled
    if (date && item && amount) {
        // Get the transaction list container
        var list = document.querySelector('.transaction-list');
        
        // Create a new transaction item element
        var itemElement = document.createElement('div');
        itemElement.classList.add('transaction-item');
        
        // Set the content of the new transaction item
        itemElement.textContent = `${date} - ${item}: $${parseFloat(amount).toFixed(2)}`;
        
        // Append the new item to the transaction list
        list.appendChild(itemElement);

        // Clear input fields after adding a transaction
        document.getElementById('transDate').value = '';
        document.getElementById('transItem').value = '';
        document.getElementById('transAmount').value = '';
    } else {
        alert('Please fill out all fields.');
    }
}

// Event listener for the "Add Transaction" button
document.getElementById('addTransaction').addEventListener('click', addTransaction);

// Function to validate the input as a number
function validateAmountInput() {
    // Get the value of the amount input
    var value = document.getElementById('transAmount').value;
    
    // Remove any characters that are not digits or a period
    value = value.replace(/[^0-9.]/g, '');
    
    // Set the sanitized value back to the input
    document.getElementById('transAmount').value = value;
}

// Event listener for the "Amount" input field
document.getElementById('transAmount').addEventListener('input', validateAmountInput);
