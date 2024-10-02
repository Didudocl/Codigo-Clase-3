import express, { json } from 'express'; // Module
import indexRoutes from './routes/index.routes.js';
import { PORT, HOST } from './config/configEnv.js';
import { connectDB } from './config/configDB.js';

async function setupServer() {
    try {
        const app = express(); // Instancia express y almacenar sus metodos en app
        
        app.use(json());

        app.use('/api', indexRoutes);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://${HOST}:${PORT}/api`);
        });
    } catch (error) {
        console.error("Error en index.js -> setupServer(), el error es: ", error);
    }
}

async function setupAPI() {
    try {
        await connectDB();
        await setupServer();
    } catch (error) {
        console.log("Error en index.js -> setupApi(), el error es: ", error);
    }
}

setupAPI()
    .then(() => console.log("=> API iniciada exitosamente"))
    .catch((error) => {
        console.log("Error en index.js -> setupAPI(), el error es:", error);
    });