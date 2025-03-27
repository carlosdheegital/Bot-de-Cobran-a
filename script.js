document.getElementById("formMensagem").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const nome = document.getElementById("nome").value || "Cliente";
    const numero = document.getElementById("numero").value;
    const data = document.getElementById("data").value;
    const mensagem = `Olá, ${nome}! Seu boleto vence no dia ${data}. Qualquer dúvida, estou à disposição.`;
    
    if (!numero) {
        document.getElementById("status").textContent = "Erro: Número não informado.";
        return;
    }
    
    try {
        const response = await fetch("/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, numero, data })
        });

        const result = await response.json();
        document.getElementById("status").textContent = result.mensagem;
    } catch (error) {
        document.getElementById("status").textContent = "Erro ao enviar mensagem.";
    }
});

document.getElementById("formUpload").addEventListener("submit", async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById("file");
    if (!fileInput.files.length) {
        document.getElementById("status").textContent = "Nenhum arquivo selecionado.";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch("/upload", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        document.getElementById("status").textContent = result.mensagem;
    } catch (error) {
        document.getElementById("status").textContent = "Erro ao enviar planilha.";
    }
});
