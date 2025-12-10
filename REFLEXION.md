# Reflexión sobre el CRUD de Posts

## 1. ¿Cómo mejorar useFetch?

El hook useFetch actual funciona bien para peticiones simples, pero podría mejorarse de varias formas:

**Mejoras propuestas:**
- Agregar caché para evitar peticiones repetidas
- Implementar cancelación de peticiones con AbortController
- Añadir soporte para POST, PUT, DELETE (no solo GET)
- Implementar reintentos automáticos en caso de error

**¿Por qué estas mejoras?**
Porque en aplicaciones reales necesitamos optimizar el rendimiento y manejar mejor los errores. El caché reduce peticiones innecesarias al servidor, y la cancelación evita problemas cuando el usuario navega rápido entre páginas.

## 2. ¿Cómo manejar datos de formulario sin gestionar cada campo?

**Solución: Usar un objeto de estado único**

En lugar de:
```javascript
const [title, setTitle] = useState('');
const [body, setBody] = useState('');
const [userId, setUserId] = useState('');
```

Usamos:
```javascript
const [formData, setFormData] = useState({
  title: '',
  body: '',
  userId: 1
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

**Ventajas:**
- Un solo handler para todos los campos
- Escalable: si agregamos 10 campos más, no cambia nada
- Más fácil de validar y resetear
- Menos código y más mantenible

**En los inputs:**
```jsx
<input
  name="title"
  value={formData.title}
  onChange={handleChange}
/>
```

El truco está en usar `[e.target.name]` que toma el atributo `name` del input y actualiza esa propiedad específica en el objeto.

## 3. Reflexión personal

Este proyecto me enseñó la importancia de:
- Planificar la estructura antes de codificar
- Manejar estados asíncronos correctamente
- Pensar en la experiencia del usuario (filtros, carga, errores)
- Escribir código reutilizable y mantenible

Lo más desafiante fue coordinar el filtrado con la paginación y asegurarme de que la información del usuario se cargue correctamente en el detalle.