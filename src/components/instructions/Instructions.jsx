import React from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const Instructions = () => {
  return (
    <Box sx={{ p: 3, lineHeight: 1.6 }}>
      <Typography variant="h4" gutterBottom>
        Proyecto Parte 1: Contraseñas Usando Permutaciones y Combinaciones
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Objetivo:</strong> Este proyecto tiene como objetivo explorar el
        uso de permutaciones y combinaciones en un ejemplo aplicado (y que la
        pasen bien un rato).
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        Contexto
      </Typography>
      <Typography variant="body1">
        Usted fue contratado para arreglar el desastre del departamento
        informático de la empresa familiar. Para comenzar a optimizar los
        procesos ha observado que:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="El costo de la licencia del ERP por usuario es elevado." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Los usuarios no utilizan el sistema adecuadamente debido a la falta de capacitación." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Varios usuarios han olvidado sus contraseñas, y el sistema no permite restablecerlas fácilmente." />
        </ListItem>
      </List>
      <Typography variant="body1">
        Para realizar la transición a un nuevo sistema (que usted va a crear
        porque no es complicado y es más barato), es crucial que todos los
        usuarios accedan al ERP para extraer la información necesaria
        (inventarios, registros, etc.).
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        Plan de Acción
      </Typography>
      <Typography variant="body1">
        Usted ha creado un perfil de cada empleado, incluyendo los requisitos
        originales de sus contraseñas (longitud, caracteres específicos, etc.).
        A continuación, implementará un ataque de fuerza bruta con un límite de
        100,000 intentos para recuperar cada contraseña.
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Pasos a Seguir
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Determinación de Combinaciones Posibles: Calcule el número de posibles contraseñas que cumplen con los requisitos iniciales de longitud y tipo de caracteres." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Optimización Mediante Expresiones Regulares: A través de investigación y análisis del perfil de cada empleado, proponga expresiones regulares que reduzcan el espacio de búsqueda de contraseñas, priorizando combinaciones probables." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Ejemplo: Considere el siguiente perfil de empleado: Asdilberto Perzolampa, 45 años, Auxiliar de Recursos Humanos, fanático de Star Wars, cumpleaños 23/10." />
        </ListItem>
      </List>

      <Typography variant="body1" gutterBottom>
        Dado que la contraseña debe tener una longitud de 8 caracteres con al
        menos 1 mayúscula, 1 minúscula, y 1 carácter especial, si consideramos
        un conjunto de posibles caracteres que incluye 26 letras mayúsculas, 26
        letras minúsculas, 10 dígitos y 10 caracteres especiales, el total de
        combinaciones posibles sería:
      </Typography>

      <Typography variant="body1" gutterBottom>
        <code>62^8 = 218,340,105,584,896</code>
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Ejemplo de Expresiones Regulares
      </Typography>
      <Typography variant="body1" gutterBottom>
        Para construir expresiones regulares válidas se utilizan las siguientes
        expresiones:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="[a-z]: Cualquier letra minúscula de la a a la z." />
        </ListItem>
        <ListItem>
          <ListItemText primary="[A-Z]: Cualquier letra mayúscula de la A a la Z." />
        </ListItem>
        <ListItem>
          <ListItemText primary="[0-9]: Cualquier número del 0 al 9." />
        </ListItem>
        <ListItem>
          <ListItemText primary="\\d: Cualquier dígito (similar a [0-9])." />
        </ListItem>
        <ListItem>
          <ListItemText primary="\\w: Cualquier carácter alfanumérico (letras y números)." />
        </ListItem>
      </List>

      <Typography variant="body1" gutterBottom>
        Luego combine estas expresiones, como:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="[A-Z][0-9]{2}: Una letra mayúscula seguida de dos dígitos. Ejemplo: A12." />
        </ListItem>
        <ListItem>
          <ListItemText primary="[a-zA-Z]{5}: Cinco letras en mayúscula o minúscula. Ejemplo: abcDE." />
        </ListItem>
      </List>

      <Typography variant="body1">
        Podemos construir una expresión regular para reducir las combinaciones
        probables. Por ejemplo, si pensamos que podría usar algo como R2d2.2310,
        una expresión regular que capture esta idea sería:
      </Typography>

      <Typography variant="body1" gutterBottom>
        <code>
          [A-Za-z]{2}\\d{2}\\.[0-9]{4}
        </code>
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h5" gutterBottom>
        Entregables
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="1. Cómo se calcularon las permutaciones para cada tipo de contraseña." />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Explicación de las expresiones regulares propuestas y cuántas combinaciones resultan." />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Intento de descifrar las contraseñas asignadas en el sitio." />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. Investigación sobre cómo estos conceptos pueden ayudar en la toma de decisiones estructuradas." />
        </ListItem>
      </List>
    </Box>
  );
};

export default Instructions;
