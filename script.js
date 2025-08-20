const fromCurrencies= document.querySelector("#from");
const toCurrencies= document.querySelector("#to");
const fromFlag = document.getElementById("flag-from");
const toFlag = document.getElementById("flag-to");
for(const code in countryList){
    let option=document.createElement("option");
    option.value=code;
    option.text=code;
    fromCurrencies.append(option.cloneNode(true));
    toCurrencies.append(option);
    fromCurrencies.value="USD";
    toCurrencies.value="INR";
}
fromCurrencies.addEventListener("change" ,()=>{
    fromFlag.src = `https://flagsapi.com/${countryList[fromCurrencies.value]}/flat/64.png`
} )
toCurrencies.addEventListener("change" ,()=>{
    toFlag.src = `https://flagsapi.com/${countryList[toCurrencies.value]}/flat/64.png`
} )

async function fetchRates(){
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencies.value.toLowerCase()}.json`;
    console.log("Fetching URL:", url);
    let res=await fetch(url);
    let data= await res.json();
    let rate = data[fromCurrencies.value.toLowerCase()][toCurrencies.value.toLowerCase()];
    let amountInput = document.querySelector("#input-text");
    let amount = Number(amountInput.value);
    let value = amount*rate;
    document.getElementById("result").innerText = 
   `${amount} ${fromCurrencies.value} = ${value.toFixed(2)} ${toCurrencies.value}`;
}
async function init(){
    let btn = document.getElementById("convert");
    btn.addEventListener("click" , async()=>{
        await fetchRates();
    })
}
window.onload = init;