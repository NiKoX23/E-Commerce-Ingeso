#!/bin/bash

# ============================================================================
# INSTALADOR DE BASE DE DATOS E-COMMERCE
# ============================================================================
# Script bash para automatizar la instalación de la BD
# Uso: bash instalar_bd.sh
# ============================================================================

set -e  # Salir si hay error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Información del proyecto
PROJECT_DIR="/home/diegomessi/Escritorio/E-Commerce-Ingeso"
DB_NAME="Ecommerce"
DB_USER="postgres"
SCRIPT_FILE="EcommerceBD_Completa.sql"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   INSTALADOR DE BASE DE DATOS E-COMMERCE                   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# VERIFICACIÓN DE REQUISITOS PREVIOS
# ============================================================================

echo -e "${YELLOW}[1/5]${NC} Verificando requisitos previos..."
echo ""

# Verificar que psql está instalado
if ! command -v psql &> /dev/null; then
    echo -e "${RED}✗ Error: PostgreSQL no está instalado${NC}"
    echo "  Instálalo con: sudo apt-get install postgresql"
    exit 1
fi
echo -e "${GREEN}✓${NC} PostgreSQL instalado"

# Verificar que PostgreSQL está corriendo
if ! pg_isready -h localhost -U $DB_USER &> /dev/null; then
    echo -e "${YELLOW}⚠ PostgreSQL no está corriendo${NC}"
    echo "  Intentando iniciar PostgreSQL..."
    sudo service postgresql start || sudo systemctl start postgresql
    sleep 2
fi

if pg_isready -h localhost -U $DB_USER &> /dev/null; then
    echo -e "${GREEN}✓${NC} PostgreSQL está corriendo"
else
    echo -e "${RED}✗ Error: No se pudo conectar a PostgreSQL${NC}"
    exit 1
fi

# Verificar que la BD existe
echo ""
echo -e "${YELLOW}[2/5]${NC} Verificando base de datos..."
echo ""

if psql -U $DB_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo -e "${GREEN}✓${NC} Base de datos '$DB_NAME' existe"
else
    echo -e "${YELLOW}⚠ Base de datos '$DB_NAME' no existe${NC}"
    echo "  Creando base de datos..."
    createdb -U $DB_USER $DB_NAME 2>/dev/null || echo -e "${RED}✗ No se pudo crear la BD${NC}"
    
    if createdb -U $DB_USER -O postgres $DB_NAME 2>/dev/null; then
        echo -e "${GREEN}✓${NC} Base de datos '$DB_NAME' creada correctamente"
    else
        echo -e "${RED}✗ Error: No se pudo crear la base de datos${NC}"
        exit 1
    fi
fi

# Verificar que el script SQL existe
echo ""
echo -e "${YELLOW}[3/5]${NC} Verificando archivo de script SQL..."
echo ""

if [ -f "$PROJECT_DIR/$SCRIPT_FILE" ]; then
    echo -e "${GREEN}✓${NC} Script SQL encontrado: $SCRIPT_FILE"
    echo "  Tamaño: $(ls -lh $PROJECT_DIR/$SCRIPT_FILE | awk '{print $5}')"
else
    echo -e "${RED}✗ Error: No se encontró $SCRIPT_FILE${NC}"
    echo "  Ubicación esperada: $PROJECT_DIR/$SCRIPT_FILE"
    exit 1
fi

# ============================================================================
# EJECUCIÓN DEL SCRIPT
# ============================================================================

echo ""
echo -e "${YELLOW}[4/5]${NC} Ejecutando script SQL..."
echo ""

if psql -U $DB_USER -d $DB_NAME -f "$PROJECT_DIR/$SCRIPT_FILE"; then
    echo ""
    echo -e "${GREEN}✓${NC} Script ejecutado correctamente"
else
    echo ""
    echo -e "${RED}✗ Error: Falló la ejecución del script${NC}"
    exit 1
fi

# ============================================================================
# VERIFICACIÓN DE RESULTADOS
# ============================================================================

echo ""
echo -e "${YELLOW}[5/5]${NC} Verificando instalación..."
echo ""

# Contar tablas
TABLE_COUNT=$(psql -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';" 2>/dev/null)
echo -e "${GREEN}✓${NC} Tablas creadas: $TABLE_COUNT"

# Contar productos
PRODUCT_COUNT=$(psql -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM producto;" 2>/dev/null)
echo -e "${GREEN}✓${NC} Productos cargados: $PRODUCT_COUNT"

# Ver resumen por tipo
echo ""
echo -e "${BLUE}📊 Resumen de productos por tipo:${NC}"
echo ""
psql -U $DB_USER -d $DB_NAME << EOF
    SELECT tipo, COUNT(*) as cantidad, AVG(precio) as precio_promedio, AVG(reseña) as reseña_promedio
    FROM producto 
    GROUP BY tipo
    ORDER BY tipo;
EOF

# ============================================================================
# FINALIZACIÓN
# ============================================================================

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}✓ INSTALACIÓN COMPLETADA EXITOSAMENTE${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Próximos pasos:${NC}"
echo "1. Reinicia el backend: cd EcommerceBackend && npm run dev"
echo "2. Reinicia el frontend para ver los productos recomendados"
echo "3. Verifica http://localhost:5173 (o tu puerto)"
echo ""
echo -e "${BLUE}Documentación:${NC}"
echo "- README_BD.md       → Guía completa de instalación"
echo "- RESUMEN_BD.md      → Resumen de archivos y estructura"
echo "- ConsultasUtiles_BD.sql → Consultas útiles para administración"
echo ""
echo -e "${GREEN}¡Base de datos lista para usar! 🎉${NC}"
echo ""
