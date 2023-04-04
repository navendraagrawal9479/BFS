import express from 'express'
import { addElement, getAllTreeElements, performBFS } from '../controllers/tree.js';

const router = express.Router();

router.post('/add-element', addElement);
router.get('/perform-bfs/:startId', performBFS);
router.get('/', getAllTreeElements)

export default router;