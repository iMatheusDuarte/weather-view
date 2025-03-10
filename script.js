async function buscarPrevisao() {
    const apiKey = "b5b9e329e2c54fb297643709250903"; 
    const cidade = document.getElementById("cidade").value;
    if (!cidade) {
        alert("Digite uma cidade!");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cidade}&lang=pt`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.location) {
            document.getElementById("resultado").innerHTML = `
                <h2>${dados.location.name}, ${dados.location.country}</h2>
                <img class="icone" src="${dados.current.condition.icon}" alt="Ícone do tempo">
                <p><strong>Temperatura:</strong> ${dados.current.temp_c}°C</p>
                <p><strong>Condição:</strong> ${dados.current.condition.text}</p>
                <p><strong>Umidade:</strong> ${dados.current.humidity}%</p>
                <p><strong>Vento:</strong> ${dados.current.wind_kph} km/h</p>
            `;
        } else {
            document.getElementById("resultado").innerHTML = `<p>Cidade não encontrada!</p>`;
        }
    } catch (error) {
        console.log("Erro ao buscar dados:", error);
        document.getElementById("resultado").innerHTML = `<p>Erro ao buscar dados.</p>`;
    }
}


document.getElementById("cidade").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        buscarPrevisao();
    }
});