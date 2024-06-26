import {usersDao} from '../dao/index.js';
import {appendJwtAsCookie} from './authentication.business.js';
import {UserDTO} from '../dto/user.dto.js';
import {authService}  from '../services/auth.service.js';
import {emailService}  from '../services/email.service.js';
import {adminsOnly} from'../middlewares/authorization.js'


export const registerUser = async (req, res, next) => {
  try {
    appendJwtAsCookie
    res['successfullPost'](req.user);
  } catch (error) {
    next(error);
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    
    // Crear un DTO del usuario con la información necesaria
    const userDTO = new UserDTO(req.user);
    res['successfullGet'](userDTO);
  } catch (error) {
    next(error);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    //authorizationMiddleware(['admin']);
    adminsOnly
    const usuarios = await usersDao.findAllUsers();
    res['successfullGet'](usuarios);
  } catch (error) {
    next(error);
  }
};

export const getfindUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user =await usersDao.readOne(email);
    return res.json(user);
  } catch (error) {
    next(error);
  }

}

  

export const passwordforgot= async (req, res, next)=>{
  try {
    const { email } = req.body;
    console.log(email);
    const resetToken = await authService.generateResetToken(email);

    // Construir el enlace de restablecimiento
    const resetLink = `http://localhost:8080/api/users/resetPassword/${resetToken}`;
    
    // Configurar el correo
    const asunto = 'Restablecimiento de Contraseña';
    const mensaje = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`;

    // Enviar el correo
    await emailService.send(email, asunto, mensaje);

    return res.json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}


export const passwordReset = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const result = await authService.resetPassword(token, newPassword);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const changeUserRole = async(req, res)=> {
    try {
      const userId = req.params.uid;
      const newRole = req.body.role; // El nuevo rol, puede ser 'premium' o 'user'
  
      // Utilizar usersDao para cambiar el rol del usuario en la base de datos
      const updatedUser = await usersDao.cambiarRolUsuario(userId, newRole);
  
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const uploadDocuments = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersDao.findByIdUser(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Procesar los archivos subidos
    req.files.forEach((file) => {
      user.documents.push({
        name: file.originalname,
        reference: file.path, // Aquí puedes guardar la ruta o cualquier identificador que necesites
      });
    });
    await user.save();

    return res.status(200).json({ message: 'Documentos subidos exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al subir documentos' });
  }
};


export const upgradeToPremium = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersDao.findByIdUser(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si todos los documentos requeridos están cargados
    const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
    const hasAllDocuments = requiredDocuments.every(doc => user.documents.some(d => d.name === doc));

    if (!hasAllDocuments) {
      return res.status(400).json({ error: 'Debe cargar todos los documentos requeridos para actualizar a premium' });
    }

    // Actualizar a premium
    user.isPremium = true; // Suponiendo que tienes una propiedad isPremium en tu modelo User
    await user.save();

    return res.status(200).json({ message: 'Usuario actualizado a premium exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar a premium' });
  }
};
