import * as fs from 'fs';
import * as path from 'path';

interface Usuario {
  id: number;
  username: string;
  password: string;
  email: string;
}

const usuariosPath = path.join(__dirname, 'usuarios.json');

export function obtenerUsuarios(): Usuario[] {
  try {
    if (!fs.existsSync(usuariosPath)) {
      fs.writeFileSync(usuariosPath, JSON.stringify([], null, 2));
      return [];
    }
    
    const data = fs.readFileSync(usuariosPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer usuarios:', error);
    return [];
  }
}

function guardarUsuarios(usuarios: Usuario[]): void {
  try {
    fs.writeFileSync(usuariosPath, JSON.stringify(usuarios, null, 2));
  } catch (error) {
    console.error('Error al guardar usuarios:', error);
  }
}

export function validarUsuario(username: string, password: string): Usuario | null {
  const usuarios = obtenerUsuarios();
  return usuarios.find(user => user.username === username && user.password === password) || null;
}

export function usuarioExiste(username: string): boolean {
  const usuarios = obtenerUsuarios();
  return usuarios.some(user => user.username === username);
}

export function agregarUsuario(username: string, password: string, email: string): Usuario | null {
  try {
    if (usuarioExiste(username)) {
      return null;
    }

    const usuarios = obtenerUsuarios();
    const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
    
    const nuevoUsuario: Usuario = {
      id: nuevoId,
      username,
      password,
      email
    };
    
    usuarios.push(nuevoUsuario);
    guardarUsuarios(usuarios);
    
    console.log('Usuario agregado exitosamente:', nuevoUsuario);
    return nuevoUsuario;
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    return null;
  }
}

export function obtenerUsuarioPorId(id: number): Usuario | null {
  const usuarios = obtenerUsuarios();
  return usuarios.find(user => user.id === id) || null;
}