

function getDataInElements() {
    const modal = document.querySelector('.p-dialog-content');

    if (!modal) {
        alert("O modal não está aberto.");
        return null;
    }

    let date = {};

    const titleModal = document.querySelector('.p-dialog-title').innerHTML;
    const id_csc = titleModal.split(":")[1].trim();

    date["id_csc"] = id_csc;

    const fields = document.querySelectorAll('.p-field');

    fields.forEach((field) => {
        const label = field.querySelector("label b");
        const value = field.querySelector('.textValueField');

        if (label && value) {
            let key = label.innerHTML.trim();
            let val = value.innerHTML.trim();

            if (key && key != "Dados de contato") {
                date[key] = val;
            }
        }
    });

    const statsMap = {
        "Em atendimento": "EM_ANDAMENTO"
    }

    console.log(date);

    const [data, hora] = date["Data de cadastro"].split(" ");
    const [dia, mes, ano] = data.split("/");
    const dataFormat = new Date(ano, mes - 1, dia).toISOString();
    const statusPrisma = statsMap[date["Situação"]]
    const nomeSolicitante = date["Solicitante"].split('(')[0].trim();

    const payloadAPI = {
        id_csc: date["id_csc"],
        category: date["Categorização"] || date["Título"],
        description: date["Descrição"],
        openAt: dataFormat,
        status: statusPrisma,
        authorName: nomeSolicitante
    }

    console.log(payloadAPI);

    const response = fetch('https://facilit.vercel.app/api/extension/newTicket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payloadAPI)
    }
    ).then(async (response) => {
        if (!response.ok) {
            const errorText = await response.json();
            alert(errorText.message);
            throw new Error(errorText.message);
        }
        return response.json();
    })
        .then(data => {
            console.log("Sucesso:", data);
            alert("Chamado criado com sucesso!");
        })
        .catch(error => {
            console.error("Erro ao criar chamado:", error);
            alert("Algo deu errado... Tente novamente.");
        });
}

function Main() {
    const dados = getDataInElements();

    console.log(prepararDadosParaOBanco(dados));
}

document.getElementById('form').addEventListener('click', async (e) => {
    e.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getDataInElements
    });

});

