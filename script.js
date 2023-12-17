document.addEventListener("DOMContentLoaded", () => {
    const key = "5ee45fa24bcc1092dd310df752e7fb3e2e21cd40";
    const api =  `https://api.getgeoapi.com/v2/currency/list?api_key=${key}&format=json`

    fetch(api)
      .then(response => response.json())
      .then(data => {
        const currencies = Object.keys(data.currencies).filter(currency => !["", "XAG", "XAU"].includes(currency));
        currencies.sort(); // Ordenar alfabéticamente la lista de monedas
        const fromDropDown = document.getElementById("selección-convertir-de");
        const toDropDown = document.getElementById("selección-convertir-a");

        // Agregar opciones por defecto a los menús desplegables
        const fromDefaultOption = document.createElement("option");
        fromDefaultOption.value = "";
        fromDefaultOption.text = "Convertir de";
        fromDropDown.add(fromDefaultOption);

        const toDefaultOption = document.createElement("option");
        toDefaultOption.value = "";
        toDefaultOption.text = "Convertir a";
        toDropDown.add(toDefaultOption);

        // Crear opciones en los menús desplegables
        currencies.forEach((currency) =>{
            const option = document.createElement("option");
            option.value = currency;
            option.text = data.currencies[currency]; // Utilizar el nombre de la moneda en lugar del código
            fromDropDown.add(option);
            toDropDown.add(option.cloneNode(true));
        });

        // Agregar evento "change" a los menús desplegables
        fromDropDown.addEventListener("change", () => {
            console.log("From currency changed");
            // Llamar a la API de GeoAPI para obtener la lista de monedas correspondiente
        });

        toDropDown.addEventListener("change", () => {
            console.log("To currency changed");
            // Llamar a la API de GeoAPI para obtener la lista de monedas correspondiente
        });

        // Agregar evento "click" al botón de convertir
        const convertButton = document.getElementById("boton-convertir");
        convertButton.addEventListener("click", () => {
            const fromCurrency = fromDropDown.value;
            const toCurrency = toDropDown.value;
            const amount = parseFloat(document.getElementById("montoo").value);
            if (isNaN(amount) || amount < 0) {
                alert("Ingrese un monto válido");
                return;
            }
            // Llamar a la API de GeoAPI para obtener la tasa de conversión correspondiente
            const conversionApi = `https://api.getgeoapi.com/v2/currency/convert?api_key=${key}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
            fetch(conversionApi)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const [rates] = Object.values(data.rates)
                    const result = rates.rate_for_amount;
                    const resultElement = document.getElementById("resultado");
                    resultElement.textContent = result;
                });
        });


        // Cambiar el color del botón de nuevo cuando se suelta
        convertButton.addEventListener("mouseup", () => {
            convertButton.style.backgroundColor = "";
        });
      });
});