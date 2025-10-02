const express = require("express");
const router = express.Router();
const dietasController = require("../controllers/dietas.controller");
const verifyToken = require("../middlewares/auth.middleware");

/**
 * @swagger
 * tags:
 *   name: Dietas
 *   description: Gerenciamento de dietas dos usuários
 */

/**
 * @swagger
 * /dietas:
 *   get:
 *     summary: Lista todas as dietas
 *     tags: [Dietas]
 *     responses:
 *       200:
 *         description: Lista de dietas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/", verifyToken, dietasController.getDietas);

/**
 * @swagger
 * /dietas/{usuario_id}:
 *   get:
 *     summary: Lista todas as dietas de um usuário
 *     tags: [Dietas]
 *     parameters:
 *       - in: path
 *         name: usuario_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de dietas do usuário
 *       404:
 *         description: Nenhuma dieta encontrada
 */
router.get("/:usuario_id", verifyToken, dietasController.getDietasByUser);

/**
 * @swagger
 * /dietas:
 *   post:
 *     summary: Cria uma nova dieta
 *     tags: [Dietas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_dieta
 *               - tipo_dieta
 *               - data
 *             properties:
 *               nome_dieta:
 *                 type: string
 *               tipo_dieta:
 *                 type: string
 *               calorias:
 *                 type: number
 *               proteinas:
 *                 type: number
 *               carboidratos:
 *                 type: number
 *               gorduras:
 *                 type: number
 *               data:
 *                 type: string
 *                 format: date
 *               refeicao:
 *                 type: string
 *               quantidade:
 *                 type: number
 *               alimentos:
 *                 type: string
 *               observacoes:
 *                 type: string
 *               fk_id_usuario_dieta:
 *                 type: integer
 *                 description: ID do usuário (opcional, default 40)
 *     responses:
 *       200:
 *         description: Dieta criada com sucesso
 *       500:
 *         description: Erro ao criar dieta
 */
router.post("/", verifyToken, dietasController.createDieta);

/**
 * @swagger
 * /dietas/excluir/{id}:
 *   delete:
 *     summary: Deleta uma dieta
 *     tags: [Dietas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da dieta
 *     responses:
 *       200:
 *         description: Dieta excluída com sucesso
 *       404:
 *         description: Dieta não encontrada
 */
router.delete("/excluir/:id", verifyToken, dietasController.deleteDieta);

module.exports = router;
