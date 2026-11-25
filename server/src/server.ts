import app from './app.js';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[Alfred SIC] Servidor backend escuchando en el puerto ${PORT}`);
});
