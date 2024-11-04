// Exchange rates
const exchangeRates = {
    USD: 1,
    INR: 84.07,
    JPY: 149.34
};

// Currency symbols and names
const currencyInfo = {
    USD: { symbol: '$', name: 'USD' },
    INR: { symbol: '₹', name: 'INR' },
    JPY: { symbol: '¥', name: 'JPY' }
};

// Get DOM elements
const form = document.getElementById('tipCalculator');
const billTotal = document.getElementById('billTotal');
const tipSlider = document.getElementById('tipSlider');
const tipPercentage = document.getElementById('tipPercentage');
const tipAmount = document.getElementById('tipAmount');
const totalBill = document.getElementById('totalBill');
const billError = document.getElementById('billError');
const currencySelect = document.getElementById('currencySelect');
const tipAmountLabel = document.getElementById('tipAmountLabel');
const totalBillLabel = document.getElementById('totalBillLabel');

// Update labels based on selected currency
function updateLabels(currency) {
    if (currency === 'USD') {
        tipAmountLabel.textContent = 'Tip Amount in USD:';
        totalBillLabel.textContent = 'Total Bill with Tip in USD:';
    } else {
        tipAmountLabel.textContent = `Converted Tip Amount in ${currency}:`;
        totalBillLabel.textContent = `Converted Total Bill with Tip in ${currency}:`;
    }
}

// Format currency based on selected currency
function formatCurrency(amount, currency) {
    const rate = exchangeRates[currency];
    const convertedAmount = amount * rate;
    
    switch(currency) {
        case 'USD':
            return `$${convertedAmount.toFixed(2)}`;
        case 'INR':
            return `₹${convertedAmount.toFixed(2)}`;
        case 'JPY':
            return `¥${convertedAmount.toFixed(2)}`;
        default:
            return `$${convertedAmount.toFixed(2)}`;
    }
}

// Validate bill input
function validateBill(value) {
    if (value === '') {
        billError.textContent = 'Please enter a bill amount';
        return false;
    }
    
    const number = parseFloat(value);
    if (isNaN(number)) {
        billError.textContent = 'Please enter a valid number';
        return false;
    }
    
    if (number < 0) {
        billError.textContent = 'Bill amount cannot be negative';
        return false;
    }
    
    billError.textContent = '';
    return true;
}

// Calculate tip and update fields
function calculateTip() {
    const billValue = parseFloat(billTotal.value) || 0;
    const tipValue = parseInt(tipSlider.value);
    const selectedCurrency = currencySelect.value;
    
    if (validateBill(billTotal.value)) {
        const tipCalculated = (billValue * tipValue) / 100;
        const totalAmount = billValue + tipCalculated;
        
        // Update fields
        tipPercentage.value = `${tipValue}%`;
        tipAmount.value = formatCurrency(tipCalculated, selectedCurrency);
        totalBill.value = formatCurrency(totalAmount, selectedCurrency);
        
        // Update labels
        updateLabels(selectedCurrency);
    }
}

// Event listeners
form.addEventListener('input', calculateTip);
currencySelect.addEventListener('change', calculateTip);

// Initialize tip percentage display and labels
tipPercentage.value = `${tipSlider.value}%`;
updateLabels('USD'); // Set initial labels