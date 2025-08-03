import express from 'express';
import { DashboardController } from '../controllers/DashboardController';
import { authenticate, authorize } from '../../../../shared/middleware/dist/index.js';

const router = express.Router();

router.use(authenticate);

router.get('/overview', DashboardController.getOverview);
router.get('/kpis', DashboardController.getKPIs);
router.get('/charts', DashboardController.getChartData);
router.get('/widgets', DashboardController.getWidgets);
router.post('/widgets', authorize(['admin']), DashboardController.createWidget);
router.put('/widgets/:id', authorize(['admin']), DashboardController.updateWidget);
router.delete('/widgets/:id', authorize(['admin']), DashboardController.deleteWidget);

export default router;
