import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      'react-icons/fi',
      'react-icons', // Exclui todo o pacote react-icons para garantir
      'lucide-react' // Se estiver usando, também pode causar conflitos
    ],
    include: [
      'react',
      'react-dom'
    ]
  },
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      external: [] // Pode adicionar dependências específicas aqui se necessário
    }
  },
  server: {
    watch: {
      usePolling: true
    }
  }
});