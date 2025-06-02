const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/validar-cpf', async (req, res) => {
    const cpf = req.query.cpf;
    if (!cpf) {
        return res.status(400).json({ error: 'CPF não informado' });
    }

    try {
        const response = await fetch(`https://apela-api.tech/?user=f56ef2c4-c145-4a59-b31b-afe081a88c27&cpf={{cpf}}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                'Accept': 'application/json',
                'Referer': 'https://inscricoesonline.site',
                'Origin': 'https://inscricoesonline.site',
                'Connection': 'keep-alive'
            }
        });

        const data = await response.json();

        if (data.error) {
            return res.status(404).json({ error: 'CPF não encontrado' });
        }

        return res.json(data);
    } catch (error) {
        console.error('Erro na API:', error);
        return res.status(500).json({ error: 'Erro na API' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`🔥 Servidor rodando na porta ${port}, DESGRAÇA!`);
});
