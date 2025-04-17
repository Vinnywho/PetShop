import express from 'express'
import db from './db.js'
import upload from './uploadconfig.js'
import fs from 'fs'
// import path from 'path'
// import bcrypt from 'bcryptjs';
import authRouts from './routes/authroutes.js'
import jwt from 'jsonwebtoken';


const router = express.Router()
router.use(authRouts)

/*************************
      crud de imagens
*************************/
router.post('/images', upload.single('image'), async (req, res) => {
    try {
        const { filename, path: filepath } = req.file

        await db.execute(
            "INSERT INTO images (filename, filepath) VALUES (?, ?)",
            [filename, filepath]
        )

        res.status(201).json({ message: "Imagem enviada com sucesso!", filename })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/images', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM images")
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.put('/images/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params
        const { filename, path: newPath } = req.file


        const [old] = await db.execute("SELECT * FROM images WHERE id = ?", [id])
        if (old.length === 0) return res.status(404).json({ error: "Imagem não encontrada" })

        const oldPath = old[0].filepath


        await db.execute(
            "UPDATE images SET filename = ?, filepath = ? WHERE id = ?",
            [filename, newPath, id]
        )

        fs.unlink(oldPath, (err) => {
            if (err) console.warn("Erro ao remover imagem antiga:", err)
        })

        res.json({ message: "Imagem atualizada com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete('/images/:id', async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await db.execute("SELECT * FROM images WHERE id = ?", [id])
        if (rows.length === 0) return res.status(404).json({ error: "Imagem não encontrada" })

        const filePath = rows[0].filepath

        await db.execute("DELETE FROM images WHERE id = ?", [id])

        fs.unlink(filePath, (err) => {
            if (err) console.warn("Erro ao remover imagem do disco:", err)
        })

        res.json({ message: "Imagem excluída com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/*************************
   crud de Agendamentos
*************************/
//Middleware
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).send('Token ausente.');
    
    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Erro na verificação do token:', error);
        return res.status(403).send('Token inválido ou expirado');
    }
}

router.post('/agendamentos', async (req, res) => {
    try {
        const { servico, nome, raca, data, horario, observacoes } = req.body;
        
        const [conflitos] = await db.execute(
            "SELECT * FROM pet WHERE data = ? AND horario = ?",
            [data, horario]
        );
        
        if (conflitos.length > 0) {
            return res.status(400).json({ 
                error: "Este horário já está reservado! Escolha outro." 
            });
        }

        const [result] = await db.execute(
            "INSERT INTO pet (servico, nome, raca, data, horario, observacoes) VALUES (?, ?, ?, ?, ?, ?)",
            [servico, nome, raca, data, horario, observacoes || null]
        );

        res.status(201).json({
            success: true,
            message: "Agendamento realizado com sucesso!",
            id: result.insertId
        });
    } catch (error) {
        console.error('Erro no agendamento:', error);
        res.status(500).json({ 
            error: "Erro interno. Tente novamente mais tarde." 
        });
    }
});

router.get('/agendamentos', authMiddleware, async (req, res) => {
    try {
        const [agendamentos] = await db.execute("SELECT * FROM pet");
        console.log(agendamentos);
        res.status(200).json(agendamentos);
    } catch (error) {
        console.error('Erro:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/agendamentos/:id', async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await db.execute("SELECT * FROM pet WHERE id = ?", [id])
        if (rows.length === 0) return res.status(404).json({ error: "Pet não encontrado" })

        await db.execute("DELETE FROM pet WHERE id = ?", [id])

        res.json({ message: "Agendamento excluído com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})



export default router;